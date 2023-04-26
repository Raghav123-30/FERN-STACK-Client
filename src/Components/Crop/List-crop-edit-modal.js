import { useModal } from "../../Contexts/ModalContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Confirmation from "../Actors/confirmationHandlers/Confirmation";
import { useState } from "react";
import Crop from "../../OOP/Crop";
export default function CropEditModal(props) {
  const {
    crop,
    setCrop,
    serviceCharge,
    setServiceCharge,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    openConfirmation,
    setOpenConfirmation,
    duration,
    setDuration,
  } = useModal();

  const [cropError, setCropError] = useState();
  const [modeError, setModeError] = useState();
  const [serviceChargeError, setServiceChargeError] = useState();
  const [trayCapacityError, setTrayCapacityError] = useState();
  const [durationError, setDurationError] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const submitHandler = () => {
    const currentCrop = new Crop(
      crop,
      mode,
      trayCapacity,
      serviceCharge,
      duration
    );
    setCropError(!currentCrop.validatecrop());
    setServiceChargeError(!currentCrop.validateserviceCharge());
    setTrayCapacityError(!currentCrop.validatetrayCapacity());
    setModeError(!currentCrop.validatemode());
    setDurationError(!currentCrop.validateDuration());
    if (
      !cropError &&
      !modeError &&
      !serviceChargeError &&
      !trayCapacityError &&
      !durationError
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };
  const closeHandler = () => {
    props.setEditModal(false);
  };
  const openConfirmModal = () => {
    setOpenConfirmation(true);
  };
  return (
    <Modal
      open={props.editModal}
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
            width: "90vw",
            maxWidth: "500px",
            padding: "0.7rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "5vh",
          }}
        >
          <TextField
            label="Crop"
            type="text"
            style={{ width: "80%" }}
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
          >
            {" "}
          </TextField>
          <TextField
            label="Mode"
            type="text"
            style={{ width: "80%" }}
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
            label="Tray Capacity (in Kg)"
            type="number"
            inputProps={{ min: 0 }}
            style={{ width: "80%" }}
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
            type="number"
            inputProps={{ min: 0 }}
            style={{ width: "80%" }}
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
          <TextField
            label="Duration (in days)"
            type="number"
            inputProps={{ min: 0 }}
            style={{ width: "80%" }}
            variant="standard"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);

              if (durationError) {
                setDurationError(false);
              }
            }}
            error={durationError}
            helperText={durationError ? "Please enter valid duration" : ""}
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
              onClick={() => {
                openConfirmModal();
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                closeHandler();
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
        {openConfirmation && <Confirmation></Confirmation>}
      </Box>
    </Modal>
  );
}
