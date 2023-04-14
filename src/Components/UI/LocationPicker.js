import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress";


export default function LocationPicker(props) {
  const [data, setData] = useState(null);
  const [available, setAvailable] = useState(false);

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
          if(data.length == 0){
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
  },[])
  const handleChange = (event, value) => {
    if(value){
      console.log(value);
    props.setLocation(value.location)
    }
  };
  if(!available){
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

  if(available){
    return (
     
        <>
            <Autocomplete
             style={{width:'80%',margin:'0 auto' ,marginBottom:'1.5rem'}}
              options={data}
              getOptionLabel={(item) => item.location}
              renderInput={(params) => (
                <TextField
                 
                  {...params}
                  label="Location"
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
          </>
       
    );
  }
}
