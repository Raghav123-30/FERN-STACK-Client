import PersistentDrawerLeft from './Navigation/DrawerLayout';
import './App.css';
import { useEffect, useState } from 'react';
import AddActorPage from './Components/Actors/AddActorPage';
import {Routes, Route} from 'react-router-dom'
import HomePage from './Components/Home/HomePage';
import LandingPage from './Components/Landing/Landing';
import Settingspage from './Components/Settings/settingPage';
import ListOperatorsPage from './Components/Actors/ListOperatorsPage';
import ListLocationsPage from './Components/Actors/ListLocationsPage';

function App() {
  const [user, setuser] = useState(null);
  
  if(!user){
    return(
      <LandingPage user={user} setuser={setuser}/>
    )
  }
  else{
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
}

export default App;
