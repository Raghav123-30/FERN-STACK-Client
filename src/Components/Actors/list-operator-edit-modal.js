import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LocationPicker from "../UI/LocationPicker";
import Actor from "../../OOP/Actor";
import OtpModalFragment from "../OtpActivity/OtpModal";
import { useState } from "react";
export default function OperatorEditFragment(props) {
    const currentActor = new Actor(props.fullName, props.phone, props.address, props.adhar);
    
    const [otpModal, setOtpModal] = useState(false);
  const [otp, setotp] = useState("");
  const [otpText, setOtpText] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [confirmFunction, setConfirmFunction] = useState(null);
  const [verified, setverified] = useState(false);
    const submitHandler = () => {
        if(props.newPhone != props.phone){
            
        }
    }
    
  return (
    <>
      <Modal
        open={props.editModal}
        onClose={props.editModalCloser}
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
              value={props.fullName}
              onChange={(event) => {
                props.setFullName(event.target.value);
                currentActor.fullName = event.target.value;
                if (props.fullNameError) {
                  props.setfullNameError(false);
                }
              }}
              error={props.fullNameError}
              helperText={props.fullNameError ? "Please enter valid name" : ""}
            ></TextField>
            <TextField
              label="Phonenumber"
              style={{ marginBottom: "1.5rem", width: "80%" }}
              variant="standard"
              value={props.phone}
              onChange={(event) => {
                props.setPhone(event.target.value);
                currentActor.phone = event.target.value;
                if (props.phoneError) {
                  props.setphoneError(false);
                }
              }}
              error={props.phoneError}
              helperText={props.phoneError ? "Please enter valid phone number" : ""}
            ></TextField>
            <TextField
              label="Address"
              multiline
              rows={5}
              style={{ marginBottom: "1.5rem", width: "80%" }}
              variant="standard"
              value={props.address}
              onChange={(event) => {
                props.setAddress(event.target.value);
                currentActor.address = event.target.value;
                if (props.addressError) {
                  props.setAddressError(false);
                }
              }}
              error={props.addressError}
              helperText={props.addressError ? "Please enter valid address" : ""}
            ></TextField>
           
            <LocationPicker />
            <TextField
              label="Adharnumber"
              style={{ marginBottom: "1.5rem", width: "80%" }}
              variant="standard"
              value={props.adhar}
              onChange={(event) => {
                props.setAdhar(event.target.value);
                currentActor.adhar = event.target.value;
                if (props.adharError) {
                  props.setAdharError(false);
                }
              }}
              error={props.adharError}
              helperText={props.adharError ? "Please enter valid Adhar number" : ""}
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
              otpModal={props.otpModal}
              closeotpModal={props.closeotpModal}
              otp={props.otp}
              setotp={props.setotp}
              handleVerification={props.handleVerification}
              otpText={props.otpText}
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
              {props.requestMessage}
            </p>
          </Card>
        </Box>
      </Modal>
      
    </>
  );
}
