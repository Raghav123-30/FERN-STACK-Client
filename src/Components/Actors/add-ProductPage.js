import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ServerIsBusy from "../UI/ServerBusy";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./add-location.module.css";
import Product from "../../OOP/Product";
import submitToFirestore from "../FirestoreActivity/submitToFirestore";

export default function AddProductPage() {
  const [verified, setverified] = useState(false);
  const [serverState, setServerState] = useState(true);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [rack, setRack] = useState("");
  const [section, setSection] = useState("");
  const [tray, setTray] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [rackError, setRackError] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [trayError, setTrayError] = useState(false);

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
      let submitObject = new submitToFirestore({
        productName: productName,
        rack: parseInt(rack),
        section: parseInt(section),
        tray: parseInt(tray),
      });
      console.log(submitObject);
      submitObject.submit();
      setverified(true);
    }
  };
  if (!verified && serverState) {
    return (
      <Card className={`${classes.card}`}>
        <TextField
          label="Product name"
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
          label="No of racks"
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
          label="No of layers"
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
          label="No of trays"
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
  } else if (verified) {
    return (
      <Card
        style={{
          width: "50vw",

          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          marginTop: "5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DoneIcon
          style={{
            margin: "2rem",
            width: "2.5rem",
            height: "2.5rem",
            backgroundColor: "green",
          }}
        ></DoneIcon>
        <p style={{ fontSize: "1.5rem" }}>A3S Product Added successfully</p>
      </Card>
    );
  } else if (!serverState) {
    <ServerIsBusy></ServerIsBusy>;
  }
}
