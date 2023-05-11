import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useModal } from "../../Contexts/ModalContext";
import APIAddDryingCrop from "./API/APIAddDryingCrop";

import { useState, useEffect } from "react";
export default function AddDryingCrops() {
  const [enabled, setEnabled] = useState(false);

  const [village, setVillage] = useState("");
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [villageID, setVilageID] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const {
    crop,
    setCrop,

    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    duration,
    setDuration,
  } = useModal();
  async function getAllVillages() {
    try {
      await fetch("http://localhost:3000/api/getAllVillages", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setVillages(data.data);
          setLoading(false);
        });
    } catch {
      console.log("Failed");
    }
  }
  useEffect(() => {
    getAllVillages();
  }, []);
  async function enableHandler() {
    await getAllVillages();
    setEnabled(true);
  }
  const submitHandler = () => {
    if (
      village.trim().length < 3 ||
      crop.trim().length < 2 ||
      parseInt(trayCapacity.trim()) < 1 ||
      parseInt(duration.trim()) < 1
    ) {
      alert("Please enter valid inputs");
      return;
    } else {
      const result = APIAddDryingCrop({
        cropname: crop,
        period: duration,
        villageid: villageID,
        mode: "Drying",
        pertraycapacity: trayCapacity,
      });
      if (result) {
        setSuccess(true);
        setEnabled(false);
        setVillage("");
        setCrop("");
        setDuration("");
        setTrayCapacity("");
      } else {
        setError(true);
      }
    }
  };
  if (!enabled && loading) {
    return (
      <Card
        style={{
          width: "80%",

          margin: "0 auto",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress></CircularProgress>
        <p>Fetching data from the server</p>
      </Card>
    );
  }
  if (!enabled && !success) {
    return (
      <Button onClick={enableHandler} variant="contained" color="info">
        Add Drying crops
      </Button>
    );
  }
  if (enabled && !success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <Autocomplete
          style={{ width: "150%", marginBottom: "1.5rem", marginTop: "1.5rem" }}
          options={villages}
          getOptionLabel={(item) => item.village}
          renderInput={(params) => (
            <TextField {...params} label="pick village" variant="outlined" />
          )}
          renderOption={(props, item) => (
            <li {...props} key={item.id}>
              {item.village}
            </li>
          )}
          onChange={(event, value) => {
            if (value) {
              setVillage(value.village);
              setVilageID(value.id);
            } else {
              setVillage("");
            }
          }}
        />
        {village && (
          <TextField
            label="Crop"
            type="text"
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={crop}
            onChange={(event) => {
              setCrop(event.target.value);
            }}
          ></TextField>
        )}
        {village && (
          <TextField
            label="Duration to dry (in days)"
            type="number"
            inputProps={{ min: 1 }}
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
            error={duration != "" && duration < 1}
            helperText={
              duration !== "" && duration < 1
                ? "Please enter a valid capacity"
                : ""
            }
          />
        )}

        {village && (
          <TextField
            label="Tray Capacity (in Kg)"
            type="number"
            inputProps={{ min: 0 }}
            style={{ marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            value={trayCapacity}
            onChange={(event) => {
              setTrayCapacity(event.target.value);
            }}
            error={trayCapacity !== "" && trayCapacity < 1}
            helperText={
              trayCapacity !== "" && trayCapacity < 1
                ? "Please enter a valid capacity"
                : ""
            }
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "2vw",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          {village && (
            <Button
              onClick={submitHandler}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          )}
          {village && (
            <Button
              onClick={() => {
                setEnabled(false);
                setCrop("");
                setDuration("");
                setTrayCapacity("");
              }}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    );
  }
  if (!enabled && success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "green",
            fontSize: "3.5vh",
          }}
        >
          Added successfully
        </p>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setSuccess(false);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
