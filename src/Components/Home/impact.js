import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
export default function ImpactPage() {
  return (
    <>
      <Card
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          width: "100vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          TypographyAlign: "center",
          padding: "4rem",
          marginTop: "1rem",
        }}
      >
        <h2 style={{ fontSize: "45px", color: "black" }}>
          <i>Pequrel Impact</i>
        </h2>
      </Card>

      <Grid
        container
        spacing={2}
        justify="center"
        sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={65} duration={2} delay={0}></CountUp>+
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              farmers benefitted{" "}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh", background: "green" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={65000} duration={2} delay={0}></CountUp>Kg
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              produce dry in A3S
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={5700} duration={2} delay={0}></CountUp>Kg
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              of food saved from wastage
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              with A3S drying
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh", background: "green" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={38} duration={2} delay={0}></CountUp>%
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              higher revenue with A3S drying
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              compared to traditional
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              open-sun drying
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={80} duration={2} delay={0}></CountUp>%
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              higher yield with A3S seedings vs
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              nursery seedings and in-field sowing
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "green",
            }}
          >
            <Typography
              h3
              size={50}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={2} duration={3} delay={0}></CountUp>Tons
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              of carbon dioxide (CO2) emissions
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              are avoided
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={70} duration={2} delay={0}></CountUp>%
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              reduction in the drying time
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "green",
            }}
          >
            <Typography
              h3
              size={50}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              <CountUp start={0} end={185000} duration={3} delay={0}></CountUp>{" "}
              +
            </Typography>
            <Typography
              h3
              size={20}
              color="white"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              seedings produced
            </Typography>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ height: "25vh" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              h3
              size={50}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              3 permanent and 6
            </Typography>
            <Typography
              h3
              size={20}
              color="green"
              sx={{ margin: "0 auto", fontSize: "2.8vh", fontWeight: "bold" }}
            >
              seasonal jobs created at village-level
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
