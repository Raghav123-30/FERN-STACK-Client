import PersistentDrawerLeft from "../../Navigation/DrawerLayout"
import AddActorPage from "../Actors/AddActorPage"
import ListOperatorsPage from "../Actors/ListOperatorsPage"
import ListLocationsPage from "../Actors/ListLocationsPage"
import Settingspage from "../Settings/settingPage"
import LandingPage from "../Landing/Landing"
import HomePage from '../Home/HomePage'
import { useAuth } from "../../Contexts/AuthContext"


import {Route, Routes} from 'react-router-dom'
import { useEffect } from "react"
export default function Dashboard(){
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
    useEffect(() => {
        const checkAuthState = async () => {
          const response = await fetch('http://localhost:3000/api/checkAuthState');
          console.log("Hi")
          const data = await response.json();
          setIsLoggedIn(data.data);
        };
    
        checkAuthState();
      }, []);
    
    if(isLoggedIn){
        return(
            <div className="App">
          <PersistentDrawerLeft/>
          <Routes>
            <Route path='/' exact element={<HomePage></HomePage>}></Route>
            <Route path='/addloc' exact element={<AddActorPage actor="owner" ></AddActorPage>}></Route>
            <Route path='/addop' exact element={<AddActorPage actor="operator" ></AddActorPage>}></Route>
            <Route path='/listop' exact element={<ListOperatorsPage  ></ListOperatorsPage>}></Route>
            <Route path='/listloc' exact element={<ListLocationsPage ></ListLocationsPage>}></Route>
            <Route path='/settings' exact element={<Settingspage ></Settingspage>}></Route>
           
          </Routes>
        </div>
        )
    }
    else{
        return(
            <LandingPage/>
        )
    }
}