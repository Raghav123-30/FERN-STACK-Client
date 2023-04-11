import  Modal  from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import  Card  from "@mui/material/Card";
export default function OtpModalFragment(props){
    return(<>
        <Modal
        open={props.otpModal}
        onClose={props.closeotpModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card
            style={{
              width: "35vw",
              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Enter OTP"
              style={{ width: "90%", marginTop: "0.5rem" }}
              placeholder="XXXXXX"
              value={props.otp}
              onChange={(event) => {
                props.setotp(event.target.value);
              }}
            ></TextField>

            <Button
              variant="contained"
              color="secondary"
              onClick={props.handleVerification}
            >
              Submit
            </Button>
            <p style={{marginTop:'1rem', color:'red', fontSize:'0.7rem', textTransform:'uppercase', textAlign:'center'}}>{props.otpText}</p>
          </Card>
        </Box>
      </Modal>
      </>
    )
}