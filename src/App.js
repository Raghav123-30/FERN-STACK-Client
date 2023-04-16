import "./App.css";

import { AuthProvider } from "./Contexts/AuthContext";
import Dashboard from "./Components/Router/Dashboard";
import { useEffect } from "react";
import { ModalProvider } from "./Contexts/ModalContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Dashboard></Dashboard>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
