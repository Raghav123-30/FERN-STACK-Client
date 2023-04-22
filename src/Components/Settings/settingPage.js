import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FailedMessage from "./FailureOperation";
import Button from "@mui/material/Button";
import AddModal from "./AddModal";
import { useModal } from "../../Contexts/ModalContext";

import SuccessMessage from "./successOperation";
import Typography from "@mui/material/Typography";

export default function Settingspage() {
  const {
    crop,
    setCrop,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    duration,
    setDuration,
    serviceCharge,
    setServiceCharge,
  } = useModal();
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [available, setAvailable] = useState(false);
  const [crops, setCrops] = useState(null);
  const [numTrays, setnumTrays] = useState(null);
  const [layoutExists, setLayoutExists] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [operationFailed, setOperationFailed] = useState(false);
  useEffect(() => {
    async function getData() {
      await fetch("http://localhost:3000/api/getAllAddress", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
          console.log(data);
          console.log(data.message);
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
        });
    }
    async function getAllCrops() {
      await fetch("http://localhost:3000/api/getAllCrops", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCrops(data.data);
          console.log(data);
          console.log(data.message);
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
        });
    }

    getData();
    getAllCrops();
  }, []);
  const cropLocationHandler = () => {
    if (
      locationId &&
      crop &&
      duration &&
      trayCapacity &&
      serviceCharge &&
      mode
    ) {
      const cropLocationData = {
        id: locationId,
        crop: crop,
        duration: duration,
        trayCapacity: trayCapacity,
        serviceCharge: serviceCharge,
        mode: mode,
      };
      fetch("http://localhost:3000/api/setCropToLoc", {
        method: "POST",
        body: JSON.stringify(cropLocationData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          console.log("SUCCESS");
          setMessage(`${crop} is set to location successfully`);

          setOperationSuccess(true);
        } else {
          setMessage("Failed to add new layout!Try again later");

          setOperationFailed(true);
        }
      });
    } else {
      setError(
        "Please pick both location and crop from the pickers provided and then click submit button"
      );
    }
  };
  const handleChange = (event, value) => {
    setInitialLoad(false);
    setError("");
    setLocationId(value.id);
    if (value && value.numTrays > 0) {
      setLayoutExists(true);
      setnumTrays(value.numTrays);
      setCrop(value.crop !== "" ? value.crop : "Not set");
      setDuration(value.duration || "Not set");
      setServiceCharge(value.serviceCharge || "Not set");
      setMode(value.mode !== "" ? value.mode : "Not set");
      setTrayCapacity(
        value.trayCapacity !== "" ? value.trayCapacity : "Not set"
      );
    } else {
      setLayoutExists(false);
      setnumTrays(null);
    }
  };
  const handleCropPickerChange = (event, value) => {
    setError("");
    if (value) {
      setCrop(value.crop);
      setDuration(value.duration);
      setTrayCapacity(value.trayCapacity);
      setServiceCharge(value.serviceCharge);
      setMode(value.mode);
    }
  };

  if (!available) {
    return (
      <Card
        style={{
          width: "50vw",
          height: "50vh",
          margin: "0 auto",
          marginTop: "5rem",
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

  if (available && !operationFailed && !operationSuccess) {
    return (
      <Box style={{ width: "80%", margin: "0 auto", marginTop: "10rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              style={{
                height: "30vh",
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5vh",
              }}
            >
              <Autocomplete
                style={{ width: "80%" }}
                options={data}
                getOptionLabel={(item) => item.location}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose location"
                    variant="outlined"
                  />
                )}
                renderOption={(props, item) => (
                  <li {...props} key={item.id}>
                    {item.location}
                  </li>
                )}
                onChange={handleChange}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              style={{
                height: "30vh",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5vh",
                gap: "2vh",
              }}
            >
              <Autocomplete
                style={{ width: "80%" }}
                options={crops}
                getOptionLabel={(item) => item.crop}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add/Edit crop"
                    variant="outlined"
                  />
                )}
                renderOption={(props, item) => (
                  <li {...props} key={item.id}>
                    {`Crop :- ${item.crop} , Mode :- ${item.mode} , Servicecharge :-${item.serviceCharge} , Traycapacity:- ${item.trayCapacity}`}
                  </li>
                )}
                onChange={handleCropPickerChange}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  cropLocationHandler();
                }}
              >
                submit
              </Button>
              {error && (
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                  }}
                >
                  {error}
                </p>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
              >
                {!layoutExists && !initialLoad && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpenAddModal(true);
                    }}
                  >
                    Add Layout
                  </Button>
                )}
                {layoutExists && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpenAddModal(true);
                    }}
                  >
                    Edit Layout
                  </Button>
                )}
              </div>
              {layoutExists && (
                <Grid container spacing={0.5}>
                  <Grid item xs={12} md={12} sm={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#f2f2f2",
                        borderRadius: "10px",
                        padding: "1rem",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                      >
                        Crop: {crop}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Mode: {mode}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Tray Capacity: {trayCapacity}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Duration: {duration}
                      </Typography>
                      <Typography variant="h6" style={{ marginBottom: 0 }}>
                        Service Charge: {serviceCharge}
                      </Typography>
                    </div>
                  </Grid>

                  {Array.from(Array(numTrays), (e, i) => (
                    <Grid item xs={3} sm={2} md={1} key={i}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          color: "white",
                          backgroundColor: "#0077B6", // set your background color here
                          margin: "0 0.25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "0.1rem",
                        }}
                      >
                        {i + 1}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
              {!layoutExists && !initialLoad && (
                <div
                  style={{
                    width: "40vw",
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Layout doesn't exist for this location
                  </p>
                </div>
              )}
              {initialLoad && (
                <div
                  style={{
                    width: "40vw",
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Pick a location to view layout
                  </p>
                </div>
              )}
            </Card>
          </Grid>
        </Grid>
        <AddModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          numTrays={numTrays}
          setnumTrays={setnumTrays}
          locationId={locationId}
          operationSuccess={operationSuccess}
          setOperationSuccess={setOperationSuccess}
          operationFailed={operationFailed}
          setOperationFailed={setOperationFailed}
          setMessage={setMessage}
          message={message}
        ></AddModal>
      </Box>
    );
  } else if (available && operationSuccess) {
    return (
      <>
        <SuccessMessage message={message}></SuccessMessage>
      </>
    );
  } else if (available && operationFailed) {
    return (
      <>
        <FailedMessage message={message}></FailedMessage>;
      </>
    );
  }
}
