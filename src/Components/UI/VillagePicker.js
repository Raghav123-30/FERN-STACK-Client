import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

export default function VillagePicker(props) {
  const [data, setData] = useState(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    async function getData() {
      await fetch("http://localhost:3000/api/getVillageAddress", {
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
      props.setVillage(value.villageName);
      props.setVillageId(value.id);
    //   if (props.setnumTrays) {
    //     props.setnumTrays(value.numTrays);
    //   }
    }
  };
  const filteredVillages = data?.filter((item) => item.geographyid === props.geographyId);
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
          options={filteredVillages || []}
          getOptionLabel={(item) => item.villageName}
          renderInput={(params) => (
            <TextField {...params} label="Village" variant="outlined" />
          )}
          renderOption={(props, item) => (
            <li {...props} key={item.id} >
              {item.villageName}
            </li>
          )}
          onChange={handleChange}
        />
      </>
    );
  }
}
