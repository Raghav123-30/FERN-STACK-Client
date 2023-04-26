import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function AddModal(props) {
  const [numTraysError, setNumTraysError] = useState(false);
  const submitHandler = () => {
    const numTrays = Number(props.numTrays);
    if (numTrays == 0 || numTrays > 0) {
      setNumTraysError(false);
      const trayData = {
        id: props.locationId,
        numTrays: props.numTrays,
      };
      console.log(trayData);
      fetch("http://localhost:3000/api/updateTray", {
        method: "POST",
        body: JSON.stringify(trayData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          console.log("SUCCESS");
          props.setMessage("New layout is added successfully");

          props.setOpenAddModal(false);
          props.setOperationSuccess(true);
        } else {
          props.setMessage("Failed to add new layout!Try again later");

          props.setOpenAddModal(false);
          props.setOperationFailed(true);
        }
      });
    } else {
      setNumTraysError(true);
    }
  };
  return (
    <Modal
      open={props.openAddModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          width: "90vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "300px",
        }}
      >
        <Card
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            label="Number of trays"
            style={{ margin: "0 auto", marginBottom: "1.5rem", width: "80%" }}
            variant="standard"
            type="number"
            value={props.numTrays}
            onChange={(event) => {
              try {
                props.setnumTrays(Number(event.target.value));
              } catch {
                setNumTraysError(true);
              }

              if (numTraysError) {
                setNumTraysError(false);
              }
            }}
            error={numTraysError}
            helperText={
              numTraysError
                ? "Please enter a valid number of trays in numbers"
                : ""
            }
          ></TextField>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              width: "90%",
              gap: "2vw",
              marginTop: "2vh",
              marginBottom: "2vh",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ display: "block", margin: "0 auto", width: "50%" }}
              onClick={submitHandler}
            >
              submit
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ display: "block", margin: "0 auto", width: "50%" }}
              onClick={() => {
                props.setOpenAddModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </Box>
    </Modal>
  );
}
