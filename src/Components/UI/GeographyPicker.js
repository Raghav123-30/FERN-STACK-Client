import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

export default function GeographyPicker(props) {
  const [data, setData] = useState(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    async function getData() {
      await fetch("http://localhost:3000/api/getGeographyAddress", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
          console.log(data);
          console.log(data.message);
          if (data.length == 0) {
            props.setServerState(false);
          }
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
          props.setServerState(false);
        });
    }
    getData();
  }, []);
  const handleChange = (event, value) => {
    if (value) {
      console.log(value);
      props.setGeography(value.region);
      props.setGeographyId(value.id);
    //   if (props.setnumTrays) {
    //     props.setnumTrays(value.numTrays);
    //   }
    }
  };
  if (!available) {
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

  if (available) {
    return (
      <>
        <Autocomplete
          style={{ width: "90%", margin: "0 auto", marginBottom: "1.5rem" }}
          options={data}
          getOptionLabel={(item) => item.region}
          renderInput={(params) => (
            <TextField {...params} label="Geography" variant="outlined" />
          )}
          renderOption={(props, item) => (
            <li {...props} key={item.id}>
              {item.region}
            </li>
          )}
          onChange={handleChange}
        />
      </>
    );
  }
}
