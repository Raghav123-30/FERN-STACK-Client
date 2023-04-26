import AgricultureIcon from "@mui/icons-material/Agriculture";
import Card from "@mui/material/Card";
import Crop from "../../OOP/Crop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useModal } from "../../Contexts/ModalContext";
import SuccessMessage from "../Settings/successOperation";
export default function AddCropPage() {
  const {
    crop,
    setCrop,
    serviceCharge,
    setServiceCharge,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    duration,
    setDuration,
    successfulOperation,
    setSuccessfulOperation,
    message,
    setMessage,
  } = useModal();
  const [cropError, setCropError] = useState();
  const [modeError, setModeError] = useState();
  const [serviceChargeError, setServiceChargeError] = useState();
  const [trayCapacityError, setTrayCapacityError] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [durationError, setDurationError] = useState();

  const submitToDatabase = () => {
    fetch("http://localhost:3000/api/addcrop", {
      method: "POST",
      body: JSON.stringify({
        crop: crop,
        mode: mode,
        trayCapacity: parseInt(trayCapacity),
        serviceCharge: parseInt(serviceCharge),
        duration: parseInt(duration),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Data submitted successfully!");

        setMessage("Crop added successfully");
        setSuccessfulOperation(true);
        return true;
      })
      .catch((error) => {
        console.error("There was a problem submitting the data:", error);
        return false;
      });
  };
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

    console.log(
      currentCrop.crop,
      currentCrop.mode,
      currentCrop.trayCapacity,
      currentCrop.serviceCharge,
      currentCrop.duration
    );

    if (
      !cropError &&
      !modeError &&
      !serviceChargeError &&
      !trayCapacityError &&
      !durationError
    ) {
      setFormIsValid(true);
      submitToDatabase();
    } else {
      setFormIsValid(false);
    }
  };
  if (!successfulOperation) {
    return (
      <Card
        style={{
          width: "90vw",
          maxWidth: "500px",
          margin: "0 auto",
          marginTop: "10rem",
          padding: "3.5rem",
          textAlign: "center",
        }}
      >
        <TextField
          label="Crop"
          type="text"
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
        >
          {" "}
        </TextField>
        <TextField
          label="Mode"
          type="text"
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
          label="Tray Capacity (in Kg)"
          type="number"
          inputProps={{ min: 0 }}
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
          type="number"
          inputProps={{ min: 0 }}
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
        <TextField
          label="Duration (in days)"
          type="number"
          inputProps={{ min: 0 }}
          style={{ marginBottom: "1.5rem", width: "80%" }}
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

        <Button
          variant="contained"
          color="success"
          style={{ display: "block", margin: "0 auto", width: "50%" }}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Card>
    );
  } else if (successfulOperation) {
    return <SuccessMessage message={message}></SuccessMessage>;
  }
}
