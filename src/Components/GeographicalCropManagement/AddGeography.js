import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import APIAddGeography from "./API/APIAddGeography";
import { useState } from "react";
export default function AddGeography() {
  const [enabled, setEnabled] = useState(false);
  const [region, setRegion] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const enableHandler = () => {
    setEnabled(true);
  };
  async function submitHandler() {
    console.log("Submitting form...");
    console.log("Region:", region);

    if (region.trim().length < 3) {
      alert("Please enter a valid region");
      return;
    }

    try {
      const result = await APIAddGeography({ region: region });
      console.log("API result:", result);

      if (result) {
        console.log("API call successful");
        setSuccess(true);
      } else {
        console.log("API call unsuccessful");
        setError(true);
        setEnabled(false);
      }
    } catch (error) {
      console.error("API call failed:", error);
      setError(true);
      setEnabled(false);
    }
  }

  if (!enabled) {
    return (
      <Button onClick={enableHandler} variant="contained" color="info">
        Add new geography
      </Button>
    );
  }
  if (!enabled && error) {
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "0.5vw",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "3.5vh", color: "red" }}>
        Please refresh the page! something went wrong
      </p>
    </div>;
  }
  if (enabled && !success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ width: "80%" }}
          placeholder="District/Division"
          label="Geography"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        ></TextField>
        <Button onClick={submitHandler} variant="contained">
          Submit
        </Button>
      </div>
    );
  }
  if (enabled && success) {
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
