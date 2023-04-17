import { useModal } from "../../Contexts/ModalContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Confirmation from "./confirmationHandlers/Confirmation";
import { useState } from "react";
import { auth } from "../../firebase";
import Actor from "../../OOP/Actor";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
export default function LocationEditModal() {
  const [confirmFunction, setConfirmFunction] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [otpText, setOtpText] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    setAddress,
    newPhone,
    setnNewPhone,
    otp,
    setOtp,
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
  } = useModal();
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

  const submitHandler = () => {
    const currentActor = new Actor(fullName, phone, address, adhar, "");
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

      //make http request to update the data here
      if (phone != newPhone) {
        renderOtpVerification();
      }
    }
  };
  return (
    <Modal
      open={otpModal}
      onClose={() => {
        setOtpModal(false);
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

              if (fullNameError) {
                setFullNameError(false);
              }
            }}
            error={fullNameError}
            helperText={fullNameError ? "Please enter valid fullName" : ""}
          ></TextField>
          <TextField
            label="phone"
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);

              if (phoneError) {
                setPhoneError(false);
              }
            }}
            error={phoneError}
            helperText={phoneError ? "Please enter valid phone" : ""}
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

              if (addressError) {
                setAddressError(false);
              }
            }}
            error={addressError}
            helperText={addressError ? "Please enter valid capacity" : ""}
          ></TextField>
          <TextField
            label="Adharnumber"
            multiline
            rows={5}
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={adhar}
            onChange={(event) => {
              setAdhar(event.target.value);

              if (adharError) {
                setAdharError(false);
              }
            }}
            error={adharError}
            helperText={adharError ? "Please enter valid service charge" : ""}
          ></TextField>

          <Button
            variant="contained"
            color="success"
            style={{ display: "block", margin: "0 auto", width: "50%" }}
            onClick={submitHandler}
          >
            submit
          </Button>
        </Card>
        {openConfirmation && <Confirmation role="location" action="edit" />}
      </Box>
    </Modal>
  );
}
