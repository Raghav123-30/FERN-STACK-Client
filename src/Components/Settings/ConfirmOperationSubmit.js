import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useModal } from "../../Contexts/ModalContext";

export default function ConfirmOperation(props) {
  const {
    successfulOperation,
    setSuccessfulOperation,
    cropSettingConfirmation,
    setCropSettingConfirmation,
  } = useModal();
  const role = props.role;
  const action = props.action;
  const handler = () => {
    setSuccessfulOperation(true);
  };
  return (
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
          width: "50vw",
          height: "35vh",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          padding: "0.1rem",
        }}
      >
        <Typography variant="h6" color="red" style={{ textAlign: "center" }}>
          On clicking confirm layout will be deleted would you like to continue?
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Button variant="contained" color="primary" onClick={handler}>
            confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpenConfirmation(false);
            }}
          >
            cancel
          </Button>
        </div>
      </Card>
    </Box>
  );
}
