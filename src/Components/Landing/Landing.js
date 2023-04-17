import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../Contexts/AuthContext";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Authenticate } from "./Authenticate";
import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import PasswordIcon from "@mui/icons-material/Password";
export default function LandingPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [areInputsInvalid, setareInputsInvalid] = useState(false);

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const user = props.user;
  const setuser = props.setuser;

  const loginHandler = () => {
    if (email.includes("@") && password.length >= 3) {
      setareInputsInvalid(false);
      if (Authenticate(email, password)) {
        setIsLoggedIn(true);
        console.log(setIsLoggedIn);
      } else {
        console.log("error");
      }
    } else {
      setareInputsInvalid(true);
    }
  };
  return (
    <Card
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "1.5rem",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        required
        id="input-with-icon-adornment"
        variant="standard"
        label="Email"
        filled
        style={{ marginBottom: "1.5rem", width: "90%" }}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>

      <TextField
        id="input-with-icon-adornment"
        variant="standard"
        required
        value={password}
        label="Password"
        type="password"
        style={{ marginBottom: "1.5rem", width: "90%" }}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Button
        variant="contained"
        color="secondary"
        style={{ display: "block", width: "80%" }}
        onClick={loginHandler}
      >
        Login
      </Button>
      {areInputsInvalid && (
        <Typography
          variant="h6"
          color={"darkred"}
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Please enter the valid credentials
        </Typography>
      )}
    </Card>
  );
}
