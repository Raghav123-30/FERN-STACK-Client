import PersistentDrawerLeft from "../../Navigation/DrawerLayout";
import AddActorPage from "../Actors/AddActorPage";
import ListOperatorsPage from "../Actors/ListOperatorsPage";
import ListLocationsPage from "../Actors/ListLocationsPage";
import AddProductPage from "../Actors/add-ProductPage";
import ListProductsPage from "../Actors/ListProductsPage";
import LandingPage from "../Landing/Landing";
import HomePage from "../Home/HomePage";

import { useAuth } from "../../Contexts/AuthContext";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import MainContainer from "../GeographicalCropManagement/MainContainer";
import ImpactPage from "../Home/impact";
import MainConfiguration from "../SetupManagement/MainConfiguration";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
export default function Dashboard() {
  const [Loading, setLoading] = useState(true);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    async function getSessionStatus() {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/checkAuthState", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    }

    getSessionStatus();
  }, []);

  if (Loading && !isLoggedIn) {
    return (
      <div
        data-testid="dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <LinearProgress />
        </Box>
      </div>
    );
  } else if (isLoggedIn && !Loading) {
    return (
      <div className="App" data-testid="list-operators">
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/" exact element={<HomePage></HomePage>}></Route>
          <Route
            path="/addloc"
            exact
            element={<AddActorPage actor="owner"></AddActorPage>}
          ></Route>
          <Route
            path="/addop"
            exact
            element={<AddActorPage actor="operator"></AddActorPage>}
          ></Route>
          <Route
            path="/listop"
            exact
            element={<ListOperatorsPage></ListOperatorsPage>}
          ></Route>
          <Route
            path="/addproduct"
            exact
            element={<AddProductPage></AddProductPage>}
          ></Route>
          <Route
            path="/listproduct"
            exact
            element={<ListProductsPage></ListProductsPage>}
          ></Route>
          <Route
            path="/listloc"
            exact
            element={<ListLocationsPage></ListLocationsPage>}
          ></Route>

          <Route
            path="/impact"
            exact
            element={<ImpactPage></ImpactPage>}
          ></Route>
          <Route
            path="/geography"
            exact
            element={<MainContainer></MainContainer>}
          ></Route>
          <Route
            path="/configure"
            exact
            element={<MainConfiguration></MainConfiguration>}
          ></Route>
        </Routes>
      </div>
    );
  } else {
    return <LandingPage />;
  }
}
