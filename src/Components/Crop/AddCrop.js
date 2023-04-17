import AgricultureIcon from "@mui/icons-material/Agriculture";
import Card from "@mui/material/Card";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Crop from "../../OOP/Crop";

import OtpModalFragment from "../OtpActivity/OtpModal";
import LocationPicker from "../UI/LocationPicker";
import DoneIcon from "@mui/icons-material/Done";
import { useModal } from "../../Contexts/ModalContext";

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
  } = useModal();
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
  return (
    <Card
      style={{
        width: "70vw",
        margin: "0 auto",
        marginTop: "5rem",
        padding: "3.5rem",
        textAlign: "center",
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
  );
}
