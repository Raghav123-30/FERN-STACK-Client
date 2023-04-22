import ErrorIcon from "@mui/icons-material/Error";
import Card from "@mui/material/Card";

const FailedMessage = (props) => {
  return (
    <Card
      style={{
        width: "50vw",

        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        marginTop: "5rem",
        justifyContent: "center",
        alignItems: "center",
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
