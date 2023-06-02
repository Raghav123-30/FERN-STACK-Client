import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Product from "../../OOP/Product";
import { useState } from "react";
import { useModal } from "../../Contexts/ModalContext";
import Confirmation from "./confirmationHandlers/Confirmation";

export default function ProductEditFragment(props) {
  const {
    productName,
    setProductName,
    rack,
    setRack,
    section,
    setSection,
    tray,
    setTray,
    productNameError,
    setProductNameError,
    rackError,
    setRackError,
    sectionError,
    setSectionError,
    trayError,
    setTrayError,
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
 
  const [otp, setotp] = useState("");
  const [otpText, setOtpText] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [confirmFunction, setConfirmFunction] = useState(null);
  const currentActor = new Product(productName, rack, section, tray);
  const submitHandler = () => {
    const isProductNameValid = currentActor.validateProductName();
    const isRackValid = currentActor.validateRack();
    const isSectionValid = currentActor.validateSection();
    const isTrayValid = currentActor.validateTray();

    setProductNameError(!isProductNameValid);
    setRackError(!isRackValid);
    setSectionError(!isSectionValid);
    setTrayError(!isTrayValid);

    if (isProductNameValid && isRackValid && isSectionValid && isTrayValid) {
      
        setFormIsValid(true);
        setOpenConfirmation(true);
        
    }
  };

  return (
    <>
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
            overflowY: "auto",
          }}
        >
          <Card
            style={{
              width: "80vw",

              maxWidth: "500px",

              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transformOrigin: "center",
              height: "100%",
              maxHeight: "100vh",
              overflow: "auto",
            }}
          >
           <TextField
              label="Product Name"
              style={{ marginBottom: "1.5rem", width: "90%" }}
              variant="standard"
              value={productName}
              onChange={(event) => {
                setProductName(event.target.value);
                currentActor.productName = event.target.value;
                if (productNameError) {
                  setProductNameError(false);
                }
              }}
              error={productNameError}
              helperText={productNameError ? "Please enter valid product name" : ""}
            ></TextField>
            <TextField
              label="No of Racks"
              style={{ marginBottom: "1.5rem", width: "90%" }}
              variant="standard"
              type="number"
              value={rack}
              onChange={(event) => {
                setRack(event.target.value);
                currentActor.rack = event.target.value;
                if (rackError) {
                  setRackError(false);
                }
              }}
              error={rackError}
              helperText={rackError ? "Please enter valid number of racks" : ""}
            ></TextField>
            <TextField
              label="No of sections"
              style={{ marginBottom: "1.5rem", width: "90%" }}
              variant="standard"
              type="number"
              value={section}
              onChange={(event) => {
                setSection(event.target.value);
                currentActor.section = event.target.value;
                if (sectionError) {
                  setSectionError(false);
                }
              }}
              error={sectionError}
              helperText={sectionError ? "Please enter valid no of sections" : ""}
            ></TextField>
            <TextField
              label="No of Trays"
              style={{ marginBottom: "1.5rem", width: "90%" }}
              variant="standard"
              type="number"
              value={tray}
              onChange={(event) => {
                setTray(event.target.value);
                currentActor.tray = event.target.value;
                if (trayError) {
                  setTrayError(false);
                }
              }}
              error={trayError}
              helperText={trayError ? "Please enter valid no of trays" : ""}
            ></TextField>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={submitHandler}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setIsEditModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
          {openConfirmation && <Confirmation role="A3S Product" action="edit" />}
        </Box>
      </Modal>
    </>
  );
}
