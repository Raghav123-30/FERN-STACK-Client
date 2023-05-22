import { useModal } from "../../Contexts/ModalContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Confirmation from "../Actors/confirmationHandlers/Confirmation";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Crop from "../../OOP/Crop";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
export default function AddNewCropModal({
  open,
  setOpen,
  locationId,
  success,
  setSuccess,
  message,
  setMessage,
}) {
  const modes = [
    {
      key: 1,
      mode: "Drying",
    },
    {
      key: 2,
      mode: "Growing",
    },
  ];
  const [cropError, setCropError] = useState();
  const [modeError, setModeError] = useState();
  const [serviceChargeError, setServiceChargeError] = useState();
  const [trayCapacityError, setTrayCapacityError] = useState();
  const [durationError, setDurationError] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [crop, setCrop] = useState();
  const [mode, setMode] = useState();
  const [trayCapacity, setTrayCapacity] = useState();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [duration, setDuration] = useState();
  async function submitHandler() {
    const currentCrop = new Crop(crop, mode, trayCapacity, 0, duration);
    setCropError(!currentCrop.validatecrop());

    setTrayCapacityError(!currentCrop.validatetrayCapacity());
    setModeError(!currentCrop.validatemode());
    setDurationError(!currentCrop.validateDuration());
    if (!cropError && !modeError && !serviceChargeError && !durationError) {
      console.log(crop, mode, trayCapacity, duration);
      await fetch("http://localhost:3000/api/addNewCropSetup", {
        method: "POST",
        body: JSON.stringify({
          locationId: locationId,
          cropname: crop,
          period: duration,
          mode: mode,
          pertraycapacity: trayCapacity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("New crops added succesfully");
          setSuccess(true);
        }
      });
    } else {
      setFormIsValid(false);
    }
  }
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
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
          ></TextField>
          <FormControl style={{ width: "80%" }}>
            <InputLabel id="demo-simple-select-label">Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Mode"
              onChange={(event) => {
                setMode(event.target.value);
              }}
            >
              <MenuItem value={"Growing"}>Growing</MenuItem>
              <MenuItem value={"Drying"}>Drying</MenuItem>
            </Select>
          </FormControl>

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
            label="Period  (in days)"
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
            helperText={durationError ? "Please enter valid period" : ""}
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
                submitHandler();
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
        {/* {openConfirmation && <Confirmation></Confirmation>} */}
      </Box>
    </Modal>
  );
}
