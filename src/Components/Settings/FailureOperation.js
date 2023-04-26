import ErrorIcon from "@mui/icons-material/Error";
import Card from "@mui/material/Card";

const FailedMessage = (props) => {
  return (
    <Card
      style={{
        width: "90vw",
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",

        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <ErrorIcon
        style={{
          margin: "2rem",
          width: "2.5rem",
          height: "2.5rem",
          backgroundColor: "red",
        }}
      ></ErrorIcon>
      <p style={{ fontSize: "1.5rem" }}>{props.message}</p>
    </Card>
  );
};

export default FailedMessage;
