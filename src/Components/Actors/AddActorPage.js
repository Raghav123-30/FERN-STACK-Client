import Card from "@mui/material/Card";
import classes from "./add-location.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Actor from "../../OOP/Actor";
import submitToFirestore from "../FirestoreActivity/submitToFirestore";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpModalFragment from "../OtpActivity/OtpModal";
import LocationPicker from "../UI/LocationPicker";
import DoneIcon from "@mui/icons-material/Done";
import ServerIsBusy from "../UI/ServerBusy";

export default function AddActorPage(props) {
  const role = props.actor;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [adhar, setAdhar] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [adharError, setAdharError] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setotp] = useState("");
  const [otpText, setOtpText] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [confirmFunction, setConfirmFunction] = useState(null);
  const [location, setLocation] = useState("");
  const [verified, setverified] = useState(false);
  const [serverState, setServerState] = useState(true);
  const currentActor = new Actor(fullName, phone, address, adhar,location);


  async function renderOtpVerification() {
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Verifying");
        },
      },
      auth
    );

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        try {
          setConfirmFunction(confirmationResult);
        } catch {
          console.log("Something went wrong");
        }
      })
      .catch(() => {
        setRequestMessage(
          "Too many OTP requested for the same phone number! please try again after some time"
        );
        setOtpModal(false);
        console.log("You are fucked up");
      });
  }

  async function validateOtp() {
    try {
      await confirmFunction.confirm(otp);
      console.log("OTP verified successfully");
      let submitObject = new submitToFirestore({
        fullName: fullName,
        phone: phone,
        address: address,
        adhar: adhar,
        location:location,
      });
      console.log(submitObject)
      if(role == 'owner'){
        let submitObject = new submitToFirestore({
          fullName: fullName,
          phone: phone,
          address: address,
          adhar: adhar,
        });
      }
      console.log(submitObject)
      
        
      
          submitObject.submit();
     
        setverified(true);

      
      return true;
    } catch (error) {
      if (error.code === "auth/invalid-verification-code") {
        console.log(
          `Entered OTP ${otp} did not match with the one sent from the server! Please try again`
        );
        setOtpText("OTP is invalid");
      } else {
        console.log("An error occurred while verifying the OTP:", error);
        setOtpText("An error occurred while verifying the OTP");
      }
      return false;
    }
  }
  const closeotpModal = () => {
    setOtpModal(false);
  };

  async function handleVerification() {
    validateOtp();
  }

  const submitHandler = () => {
    const isFullNameValid = currentActor.validateFullName();
    const isPhoneValid = currentActor.validatePhone();
    const isAddressValid = currentActor.validateAddress();
    const isAdharValid = currentActor.validateAdhar();

    setFullNameError(!isFullNameValid);
    setPhoneError(!isPhoneValid);
    setAddressError(!isAddressValid);
    setAdharError(!isAdharValid);
    if (isFullNameValid && isPhoneValid && isAddressValid && isAdharValid) {
      setFormIsValid(true);
      
      // setOtpModal(true);
      // renderOtpVerification();
      let submitObject = new submitToFirestore({
        fullName: fullName,
        phone: phone,
        address: address,
        adhar: adhar,
        location:location,
      });
      console.log(submitObject)
      if(role == 'owner'){
        let submitObject = new submitToFirestore({
          fullName: fullName,
          phone: phone,
          address: address,
          adhar: adhar,
        });
      }
      console.log(submitObject)
      
        
      
          submitObject.submit();
    }
  };

  if (!verified && serverState) {
    return (
      <Card className={`${classes.card}`}>
        <TextField
          label="Fullname"
          style={{ marginBottom: "1.5rem", width: "80%" }}
          variant="standard"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
            currentActor.fullName = event.target.value;
            if (fullNameError) {
              setFullNameError(false);
            }
          }}
          error={fullNameError}
          helperText={fullNameError ? "Please enter valid name" : ""}
        ></TextField>
        <TextField
          label="Phonenumber"
          style={{ marginBottom: "1.5rem", width: "80%" }}
          variant="standard"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            currentActor.phone = event.target.value;
            if (phoneError) {
              setPhoneError(false);
            }
          }}
          error={phoneError}
          helperText={phoneError ? "Please enter valid phone number" : ""}
        ></TextField>
        <TextField
          label="Address"
          multiline
          rows={5}
          style={{ marginBottom: "1.5rem", width: "80%" }}
          variant="standard"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            currentActor.address = event.target.value;
            if (addressError) {
              setAddressError(false);
            }
          }}
          error={addressError}
          helperText={addressError ? "Please enter valid address" : ""}
        ></TextField>
        {role == "operator" && <LocationPicker location={location} setLocation={setLocation} serverState={serverState} setServerState={setServerState}/>}
        <TextField
          label="Adharnumber"
          style={{ marginBottom: "1.5rem", width: "80%" }}
          variant="standard"
          value={adhar}
          onChange={(event) => {
            setAdhar(event.target.value);
            currentActor.adhar = event.target.value;
            if (adharError) {
              setAdharError(false);
            }
          }}
          error={adharError}
          helperText={adharError ? "Please enter valid Adhar number" : ""}
        ></TextField>
        <Button
          variant="contained"
          color="success"
          style={{ display: "block", margin: "0 auto", width: "50%" }}
          onClick={submitHandler}
        >
          submit
        </Button>
        <div id="recaptcha-container"></div>

        <OtpModalFragment
          otpModal={otpModal}
          closeotpModal={closeotpModal}
          otp={otp}
          setotp={setotp}
          handleVerification={handleVerification}
          otpText={otpText}
        ></OtpModalFragment>
        <p
          style={{
            marginTop: "1rem",
            color: "red",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {requestMessage}
        </p>
      </Card>
    );
  } else if(verified) {
    return (
      <Card
        style={{
          width:'50vw',
         
          margin:'0 auto',
          display:'flex',
          flexDirection:'row',
          marginTop: "5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
          <DoneIcon style={{margin:'2rem',width:'2.5rem',height:'2.5rem',backgroundColor:'green'}}></DoneIcon>
          <p style={{fontSize:'1.5rem'}}>{role} added successfully</p>
        
      </Card>
    );
  }
  else if(!serverState){
       <ServerIsBusy></ServerIsBusy>
  }
  
}
