import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddGeography from "./AddGeography";
import AddVillage from "./AddVillage";
import AddDryingCrops from "./AddDryingCrops";
import AddGrowingCrops from "./AddGrowingCrops";
import ListingData from "./ListingData";
export default function MainContainer() {
  return (
    <div style={{ marginTop: "5rem" }}>
      <Grid container>
        <Grid xs={12} md={6} sm={12}>
          <Card
            style={{
              minHeight: "40vh",
              margin: "2vw",
              padding: "2vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <AddGeography></AddGeography>
          </Card>
        </Grid>
        <Grid xs={12} md={6} sm={12}>
          <Card
            style={{
              minHeight: "40vh",
              margin: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddVillage></AddVillage>
          </Card>
        </Grid>
        <Grid xs={12} md={6} sm={12}>
          <Card
            style={{
              minHeight: "40vh",
              margin: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddDryingCrops />
          </Card>
        </Grid>
        <Grid xs={12} md={6} sm={12}>
          <Card
            style={{
              minHeight: "40vh",
              margin: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddGrowingCrops />
          </Card>
        </Grid>
        <Grid xs={12} md={12} sm={12}>
          <Card
            style={{
              minHeight: "70vh",
              margin: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListingData />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
