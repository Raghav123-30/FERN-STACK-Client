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
import OtpModalFragment from "../OtpActivity/OtpModal";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
export default function LocationEditModal() {
  const [confirmFunction, setConfirmFunction] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [otpText, setOtpText] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [otp, setotp] = useState("");
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    setAddress,
    newPhone,

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

    setverified,
    serverState,
    setServerState,
    openConfirmation,
    setOpenConfirmation,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useModal();
  const closeotpModal = () => {
    setOtpModal(false);
  };
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

      setverified(true);
      closeotpModal();
      setOpenConfirmation(true);

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
        setOtpModal(true);
        renderOtpVerification();
      } else {
        setOpenConfirmation(true);
      }
    }
  };
  return (
    <Modal
      open={isEditModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "400px",
        }}
      >
        <Card
          style={{
            width: "65vw",
            maxWidth: "400px",

            padding: "0.5rem",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vh",
          }}
        >
          <TextField
            label="Fullname"
            style={{ width: "80%" }}
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
            style={{ width: "80%" }}
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
            style={{ width: "80%" }}
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
            style={{ width: "80%" }}
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {" "}
            <Button variant="contained" color="success" onClick={submitHandler}>
              submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOtpModal(false);
              }}
            >
              Cancel
            </Button>
          </div>

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
        {openConfirmation && <Confirmation role="owner" action="edit" />}
      </Box>
    </Modal>
  );
}
