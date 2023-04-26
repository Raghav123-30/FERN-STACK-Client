import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
export default function OtpModalFragment(props) {
  return (
    <>
      <Modal
        open={props.otpModal}
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
              width: "90vw",
              maxWidth: "400px",
              padding: "0.2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Enter OTP"
              style={{ width: "90%", marginTop: "1rem" }}
              placeholder="XXXXXX"
              value={props.otp}
              onChange={(event) => {
                props.setotp(event.target.value);
              }}
            ></TextField>

            <Button
              variant="contained"
              color="warning"
              onClick={props.handleVerification}
            >
              Submit
            </Button>
            {props.otpText && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {props.otpText}
              </p>
            )}
          </Card>
        </Box>
      </Modal>
    </>
  );
}
