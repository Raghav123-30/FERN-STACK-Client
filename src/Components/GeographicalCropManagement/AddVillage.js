import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { useState, useEffect } from "react";

export default function AddVillage() {
  const [enabled, setEnabled] = useState(false);
  const [taluk, setTaluk] = useState("");
  const [village, setVillage] = useState("");
  const [currentGeography, setCurrentGeography] = useState();
  const [geographies, setGeographies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geographyId, setGeographyID] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function getGeographies() {
    await fetch("http://localhost:3000/api/getAllGeography")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGeographies(data.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getGeographies();
  }, []);

  async function enableHandler() {
    await getGeographies();
    setEnabled(true);
  }

  async function submitHandler() {
    if (village.trim().length < 3 || taluk.trim().length < 3) {
      alert("Please enter valid inputs");
      return;
    } else {
      await fetch("http://localhost:3000/api/addVillage", {
        method: "POST",
        body: JSON.stringify({
          geographyId: geographyId,
          taluk: taluk,
          village: village,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.data) {
            setSuccess(true);
            setCurrentGeography("");
            setTaluk("");
            setVillage("");
          } else {
            setError(true);
          }
        });
    }
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
        data-testid="add-village"
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
        data-testid="add-village"
      >
        <CircularProgress />
        <p>Fetching data from the server</p>
      </Card>
    );
  }

  if (!enabled) {
    return (
      <Button
        onClick={enableHandler}
        variant="contained"
        color="info"
        data-testid="add-village"
      >
        Add new village
      </Button>
    );
  }

  if (enabled) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5vw",
          alignItems: "center",
        }}
        data-testid="add-village"
      >
        <Autocomplete
          style={{ width: "150%", marginBottom: "1.5vh" }}
          options={geographies}
          getOptionLabel={(item) => item.region}
          renderInput={(params) => (
            <TextField {...params} label="pick geography" variant="outlined" />
          )}
          renderOption={(props, item) => (
            <li {...props} key={item.id}>
              {item.region}
            </li>
          )}
          onChange={(event, value) => {
            if (value) {
              setCurrentGeography(value.region);
              setGeographyID(value.id);
            } else {
              setCurrentGeography("");
            }
          }}
        />

        {currentGeography && (
          <TextField
            style={{ width: "100%", marginBottom: "0.7vh" }}
            label="Taluk"
            placeholder="Eg.Hubli"
            value={taluk}
            onChange={(e) => {
              setTaluk(e.target.value);
            }}
            data-testid="taluk-input"
          />
        )}

        {currentGeography && (
          <TextField
            style={{ width: "100%", marginBottom: "0.7vh" }}
            label="Village"
            placeholder="Eg.Annigeri"
            value={village}
            onChange={(e) => {
              setVillage(e.target.value);
            }}
            data-testid="village-input"
          />
        )}

        {currentGeography && (
          <Button
            onClick={submitHandler}
            variant="contained"
            color="secondary"
            data-testid="submit-button"
          >
            Submit
          </Button>
        )}
      </div>
    );
  }
}
