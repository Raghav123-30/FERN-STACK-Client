import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocationPicker from "../UI/LocationPicker";
import OrdersTable from "./FarmerOrders";
import { useState } from "react";

export default function HomePage() {
  const [location, setLocation] = useState();
  const [numTrays, setnumTrays] = useState();
  const [locationId, setLocationId] = useState();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "5rem",
          marginBottom: "2.5rem",
        }}
      >
        <Card
          style={{
            width: "40vw",
            height: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "2rem",
          }}
        >
          <LocationPicker
            location={location}
            setLocation={setLocation}
            setnumTrays={setnumTrays}
            setLocationId={setLocationId}
          ></LocationPicker>
        </Card>
        {!numTrays && (
          <Card
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
              Pick the location to view orders
            </p>
          </Card>
        )}
        {numTrays && (
          <Card style={{ width: "40vw", padding: "2rem" }}>
            <OrdersTable></OrdersTable>
          </Card>
        )}
      </div>
      {!numTrays && (
        <Card
          style={{
            width: "80vw",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              color: "grey",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            Pick the location to view the layout
          </p>
        </Card>
      )}
      {numTrays && (
        <Card
          style={{
            width: "80vw",
            padding: "2.5rem",
            margin: "0 auto",
            marginBottom: "2.5rem",
          }}
        >
          <p
            style={{
              color: "red",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            Currently there are no orders made in this location
          </p>
          <Grid container spacing={0.5}>
            {Array.from(Array(numTrays), (e, i) => (
              <Grid item xs={3} sm={2} md={1} key={i}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "#F2AA4C", // set your background color here
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
        </Card>
      )}
    </>
  );
}
