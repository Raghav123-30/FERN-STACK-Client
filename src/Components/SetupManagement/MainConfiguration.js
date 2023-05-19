import Card from "@mui/material/Card";

import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import NewConfiguration from "./NewConfiguration";
import EditConfiguration from "./EditConfiguration";
import Button from "@mui/material/Button";
export default function MainConfiguration() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(null);
  const [locationId, setLocationId] = useState("");
  const [villageId, setVillageId] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [crops, setCrops] = useState([]);

  const [startProcessing, setStartProcessing] = useState(false);
  async function addNewConfiguration() {
    await fetch("http://localhost:3000/api/addNewConfiguration", {
      method: "POST",
      body: JSON.stringify({
        crops: crops,
        locationId: locationId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async function getVillageId(id) {
    setGlobalLoading(true);
    await fetch("http://localhost:3000/api/getVillageId", {
      method: "POST",
      body: JSON.stringify({
        locationId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVillageId(data.data);
        console.log("villageId which we got is", villageId, data.data);
      });
  }
  useEffect(() => {
    setGlobalLoading(true);
    async function setUp() {
      await fetch("http://localhost:3000/api/getVillageCrops")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCrops(data.data);
        });
    }
    console.log(villageId);
    setUp();
    const filteredCrops = crops.filter((item) => {
      return item.villageId === villageId;
    });
    setCrops(filteredCrops);

    console.log(crops);
    setGlobalLoading(false);
  }, [villageId]);
  async function getLocations() {
    await fetch("http://localhost:3000/api/getAllAddress")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocations(data.data);
        setLoading(false);
      });
  }
  useEffect(() => {
    getLocations();
  }, []);
  if (loading && !startProcessing) {
    return (
      <Card
        style={{
          width: "80%",

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
  if (!loading && !startProcessing) {
    return (
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <Autocomplete
          style={{ width: "80vw", maxWidth: "700px", marginBottom: "1.5vh" }}
          options={locations}
          getOptionLabel={(item) => item.location}
          renderInput={(params) => (
            <TextField {...params} label="pick setup" variant="outlined" />
          )}
          renderOption={(props, item) => (
            <li {...props} key={item.id}>
              {item.location}
            </li>
          )}
          onChange={async (event, value) => {
            if (value) {
              setStartProcessing(false);
              console.log(value);

              setConfigured(value.configured);
              if (!value.configured) {
                await getVillageId(value.id);
              }

              console.log("setting it true t start process");

              console.log(loading, configured, startProcessing, locationId);
              console.log(value.id);
              console.log(value.configured);
              setLocationId(value.id);

              setStartProcessing(true);
            }
          }}
        />
      </div>
    );
  }
  if (!loading && configured && startProcessing) {
    return (
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <EditConfiguration locationId={locationId} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Button variant="contained" color="primary">
            Confirm
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setStartProcessing(false);
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
  if (!loading && !configured && startProcessing) {
    return (
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
      >
        <NewConfiguration
          locationId={locationId}
          Crops={crops}
          configured={configured}
          setAllCrops={setCrops}
        />
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
            color="primary"
            onClick={addNewConfiguration}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setStartProcessing(false);
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}
