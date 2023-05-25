import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocationPicker from "../UI/LocationPicker";
import OrdersTable from "./FarmerOrders";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [location, setLocation] = useState();
  const [numTrays, setnumTrays] = useState();
  const [locationId, setLocationId] = useState();
  const [productName, setProductName] = useState();
  const [rack, setRacks] = useState();
  const [layers, setLayers] = useState();
  const [orderData, setorderData] = useState([]);
  const [trayAllocationArray, setTrayAllocationArray] = useState([]);
  useEffect(() => {
    console.log("location ID now is ", locationId);
    async function fetchSetupDetails() {
      if (locationId) {
        await fetch("http://localhost:3000/api/fetchSetupDetails", {
          method: "POST",
          body: JSON.stringify({
            locationId: locationId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const details = data.data;
            setProductName(details.productName);
            setRacks(details.rack);
            setnumTrays(details.trays);
            setLayers(details.layers);
          });
      }
    }
    fetchSetupDetails();
  }, [locationId]);
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
            <OrdersTable
              locationId={locationId}
              orderData={orderData}
              setOrderData={setorderData}
            ></OrdersTable>
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
            ProductName: {productName}, Total number of trays:{numTrays}, Number
            of racks:{rack}, Number of layers:{layers}
          </p>
          <Grid container spacing={0.5}>
            {Array.from(Array(numTrays), (e, i) => {
              const trayIndex = i + 1;
              const tray = orderData.find((item) =>
                item.trayallocation.includes(trayIndex.toString())
              );

              const backgroundColor = tray ? tray.colorcode : "#fff";

              return (
                <Grid item xs={3} sm={2} md={1} key={i}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      color: "black",
                      backgroundColor: backgroundColor,
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
                    {trayIndex}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      )}
    </>
  );
}
