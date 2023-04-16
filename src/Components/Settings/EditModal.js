import { useModal } from "../../Contexts/ModalContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Crop from "../../OOP/Crop";
import { useState } from "react";

export default function EditModal() {
  const [cropError, setCropError] = useState();
  const [modeError, setModeError] = useState();
  const [serviceChargeError, setServiceChargeError] = useState();
  const [trayCapacityError, setTrayCapacityError] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const submitHandler = () => {
    const currentCrop = new Crop(crop, mode, trayCapacity, serviceCharge);

    setCropError(!currentCrop.validatecrop());
    setServiceChargeError(!currentCrop.validateserviceCharge());
    setTrayCapacityError(!currentCrop.validatetrayCapacity());
    setModeError(!currentCrop.validatemode());

    console.log(
      currentCrop.crop,
      currentCrop.mode,
      currentCrop.trayCapacity,
      currentCrop.serviceCharge
    );

    if (!cropError && !modeError && !serviceChargeError && !trayCapacityError) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };
  const {
    somethingIsRequested,
    setsomethingisRequested,
    crop,
    setCrop,
    serviceCharge,
    setServiceCharge,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    locationId,
    setLocationId,
    isEditModalOpen,
    setIsEditModalOpen,

    editModalOpener,
    editModalCloser,
  } = useModal();
  return (
    <Modal
      open={isEditModalOpen}
      onClose={editModalCloser}
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
            label="Crop"
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={crop}
            onChange={(event) => {
              setCrop(event.target.value);

              if (cropError) {
                setCropError(false);
              }
            }}
            error={cropError}
            helperText={cropError ? "Please enter valid crop" : ""}
          ></TextField>
          <TextField
            label="Mode"
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);

              if (modeError) {
                setModeError(false);
              }
            }}
            error={modeError}
            helperText={modeError ? "Please enter valid mode" : ""}
          ></TextField>
          <TextField
            label="Tray Capacity"
            multiline
            rows={5}
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={trayCapacity}
            onChange={(event) => {
              setTrayCapacity(event.target.value);

              if (trayCapacityError) {
                setTrayCapacityError(false);
              }
            }}
            error={trayCapacityError}
            helperText={trayCapacityError ? "Please enter valid capacity" : ""}
          ></TextField>
          <TextField
            label="Service Charge"
            multiline
            rows={5}
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={serviceCharge}
            onChange={(event) => {
              setServiceCharge(event.target.value);

              if (serviceChargeError) {
                setServiceChargeError(false);
              }
            }}
            error={serviceChargeError}
            helperText={
              serviceChargeError ? "Please enter valid service charge" : ""
            }
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
      </Box>
    </Modal>
  );
}
