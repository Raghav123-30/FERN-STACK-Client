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
  const [success, setSuccess] = useState(false);
  const [crops, setCrops] = useState([]);
  const [startProcessing, setStartProcessing] = useState(false);
  const [validator, setValidator] = useState(false);
  const [message, setMessage] = useState();

  async function addNewConfiguration() {
    console.log("Hello, hello");
    if (!configured) {
      await fetch("http://localhost:3000/api/addNewConfiguration", {
        method: "POST",
        body: JSON.stringify({
          crops: crops,
          locationId: locationId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Crops in the setup configured successfully");
          setSuccess(true);
        }
      });
    } else {
      console.log("Configured so edited successfully");
      await fetch("http://localhost:3000/api/updateConfiguration", {
        method: "POST",
        body: JSON.stringify({
          crops: crops,
          locationId: locationId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Crops in the setup edited successfully");
          setSuccess(true);
        }
      });
    }
  }

  async function getLocationCrops() {
    await fetch("http://localhost:3000/api/getLocationCrops")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const docs = data.data;
        const filteredCrops = docs.filter((item) => {
          return item.locationid === locationId;
        });
        console.log("Actual crops are here");

        setCrops(filteredCrops);
        setValidator((prev) => {
          return !prev;
        });
      });
  }

  async function getVillageId(ID) {
    setGlobalLoading(true);
    await fetch("http://localhost:3000/api/getVillageId", {
      method: "POST",
      body: JSON.stringify({
        locationId: ID,
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
        console.log("villageId which we got is", data.data, villageId);
      });
  }

  async function getVillageCrops() {
    await fetch("http://localhost:3000/api/getVillageCrops")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const docs = data.data;
        console.log("What we obtained?");

        console.log(docs);

        // setCrops((prevCrops) => {
        //   return prevCrops.filter((item) => {
        //     return item.villageid == villageId;
        //   });
        // });
        const filteredCrops = docs.filter((item) => {
          return item.villageid === villageId;
        });
        console.log(filteredCrops);
        console.log("One of the filtered crop", filteredCrops[0]);
        console.log(villageId);
        console.log("what's wrong", villageId);

        console.log(filteredCrops);
        setCrops(filteredCrops);
        setValidator((prev) => {
          return !prev;
        });
      });
  }

  useEffect(() => {
    async function fetchCrops() {
      if (villageId && crops.length == 0) {
        await getVillageCrops();
        console.log("wait while we get villagecrops dude");
      }
    }
    fetchCrops();
  }, [villageId]);
  useEffect(() => {
    if (locationId && configured) {
      getLocationCrops();
    }
  }, [locationId]);
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
        <CircularProgress />
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
              console.log(crops.length);
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
        <EditConfiguration
          locationId={locationId}
          Crops={crops}
          configured={configured}
          setAllCrops={setCrops}
          success={success}
          validator={validator}
          setSuccess={setSuccess}
          message={message}
          setMessage={setMessage}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {!success && (
            <Button
              variant="contained"
              color="primary"
              onClick={addNewConfiguration}
            >
              Confirm
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setStartProcessing(false);
              window.location.reload();
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
          success={success}
          validator={validator}
          message={message}
          setMessage={setMessage}
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
              window.location.reload();
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}
