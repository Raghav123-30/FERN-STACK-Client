import Card from "@mui/material/Card";
import DoneIcon from "@mui/icons-material/Done";

const SuccessMessage = (props) => {
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
      <DoneIcon
        style={{
          margin: "2rem",
          width: "2.5rem",
          height: "2.5rem",
          backgroundColor: "green",
        }}
      ></DoneIcon>
      <p style={{ fontSize: "1.2rem" }}>{props.message}</p>
    </Card>
  );
};

export default SuccessMessage;
