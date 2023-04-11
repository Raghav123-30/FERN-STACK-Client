import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField  from '@mui/material/TextField'

export default function LandingPage(props){
    const user = props.user;
    const setuser = props.setuser;
    const loginHandler = () => {
        setuser(true);
    }
     return(
        <Card style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding:'2.5rem',
          width:'25vw',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
         <TextField required label="Email" filled style={{ marginBottom: "1.5rem", width: "80%" }}></TextField>
         <TextField required label="Password" style={{ marginBottom: "1.5rem", width: "80%" }}></TextField>
         <Button variant='contained' color="primary" style={{ display: "block", width: "80%" }} onClick={loginHandler}>Login</Button>
        </Card>
     )
}
