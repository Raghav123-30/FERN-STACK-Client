import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress";


export default function Settingspage() {
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
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
        });
    }
    getData();
  },[])
  const handleChange = (event, value) => {
    console.log(value);
  };
  if(!available){
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

  if(available){
    return (
      <Box style={{ width:'80%',margin:'0 auto',marginTop:'10rem'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '40vh', padding: '1rem', display: 'flex', justifyContent: 'center',alignItems:'center'}}>
            <Autocomplete
             style={{width:'80%'}}
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
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '40vh', padding: '1rem' }}>
            {/* Your content for the second card goes here */}
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card style={{ height: '40vh', padding: '1rem' }}>
            {/* Your content for the third card goes here */}
          </Card>
        </Grid>
      </Grid>
      </Box>
    );
  }
}
