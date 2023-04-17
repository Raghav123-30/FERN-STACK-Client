import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LocationPicker from "../UI/LocationPicker";
import Actor from "../../OOP/Actor";
import OtpModalFragment from "../OtpActivity/OtpModal";
import { useState } from "react";
import { useModal } from "../../Contexts/ModalContext";
import { auth } from "../../firebase";
import Confirmation from "./confirmationHandlers/Confirmation";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OperatorEditFragment(props) {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    newPhone,
    setnNewPhone,
    setAddress,
    location,
    setLocation,
    adhar,
    setAdhar,
    fullNameError,
    setFullNameError,
    phoneError,
    setPhoneError,
    addressError,
    setAddressError,
    locationError,
    setLocationError,
    adharError,
    setAdharError,
    otpModal,
    setOtpModal,
    verified,
    setverified,
    serverState,
    setServerState,
    openConfirmation,
    setOpenConfirmation,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useModal();
  const [formIsValid, setFormIsValid] = useState(false);
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
      // let submitObject = new submitToFirestore({
      //   fullName: fullName,
      //   phone: phone,
      //   address: address,
      //   adhar: adhar,
      //   location: location,
      // });

      //call function that makes http request to update the data here

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
  const [otp, setotp] = useState("");
  const [otpText, setOtpText] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [confirmFunction, setConfirmFunction] = useState(null);
  const currentActor = new Actor(fullName, phone, address, adhar);
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
      if (newPhone != phone) {
        setFormIsValid(true);
        setOtpModal(true);
        renderOtpVerification();
        setOpenConfirmation(true);
      }
    }
  };

  return (
    <>
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card
            style={{
              width: "35vw",

              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
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
              closeotpModal={props.closeotpModal}
              otp={otp}
              setotp={setotp}
              handleVerification={props.handleVerification}
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
          {openConfirmation && <Confirmation role="operator" action="edit" />}
        </Box>
      </Modal>
    </>
  );
}
