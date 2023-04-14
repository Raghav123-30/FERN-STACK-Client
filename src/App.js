
import './App.css';


import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Dashboard from './Components/Router/Dashboard';

function App() {

  

    
  
    return(
      <AuthProvider>
       <Dashboard></Dashboard>
    </AuthProvider>
    )
  
}

export default App;
