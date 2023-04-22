import Card from "@mui/material/Card";
import DoneIcon from "@mui/icons-material/Done";

const SuccessMessage = (props) => {
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
      <DoneIcon
        style={{
          margin: "2rem",
          width: "2.5rem",
          height: "2.5rem",
          backgroundColor: "green",
        }}
      ></DoneIcon>
      <p style={{ fontSize: "1.5rem" }}>{props.message}</p>
    </Card>
  );
};

export default SuccessMessage;
