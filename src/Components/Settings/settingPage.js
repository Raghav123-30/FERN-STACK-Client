import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import EditModal from "./EditModal";
import Button from "@mui/material/Button";
import AddModal from "./AddModal";
import { useModal } from "../../Contexts/ModalContext";
import ConfirmOperation from "./ConfirmOperation";

export default function Settingspage() {
  const { openConfirmation, setOpenConfirmation } = useModal();
  const [data, setData] = useState(null);
  const [available, setAvailable] = useState(false);
  const [crops, setCrops] = useState(null);
  const [numTrays, setnumTrays] = useState(null);
  const [layoutExists, setLayoutExists] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [locationId, setLocationId] = useState(null);
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
  const handleChange = (event, value) => {
    setInitialLoad(false);
    if (value && value.numTrays > 0) {
      setLayoutExists(true);
      setnumTrays(value.numTrays);
      setLocationId(value.id);
    } else {
      setLayoutExists(false);
      setnumTrays(null);
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

  if (available) {
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
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "5vh",
              }}
            >
              <Autocomplete
                style={{ width: "80%" }}
                options={crops}
                getOptionLabel={(item) => item.crop}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose crop"
                    variant="outlined"
                  />
                )}
                renderOption={(props, item) => (
                  <li {...props} key={item.id}>
                    {`Crop :- ${item.crop} , Mode :- ${item.mode} , Servicecharge :-${item.serviceCharge} , Traycapacity:- ${item.trayCapacity}`}
                  </li>
                )}
              />
              <Button variant="contained" color="error">
                submit
              </Button>
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
                {layoutExists && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpenConfirmation(true);
                    }}
                  >
                    Delete Layout
                  </Button>
                )}
              </div>
              {layoutExists && (
                <Grid container spacing={0.5}>
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
        ></AddModal>
        {openConfirmation && <ConfirmOperation></ConfirmOperation>}
      </Box>
    );
  }
}
