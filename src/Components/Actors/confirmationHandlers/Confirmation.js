import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useModal } from "../../../Contexts/ModalContext";

export default function Confirmation(props) {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    newPhone,
    setNewPhone,
    setAddress,
    location,
    setLocation,
    adhar,
    setAdhar,
    fullNameError,
    setFullNameError,
    phoneError,
    setPhoneError,
    addressError,
    setAddressError,
    locationError,
    setLocationError,
    adharError,
    setAdharError,
    otpModal,
    setOtpModal,
    verified,
    setverified,
    serverState,
    setServerState,
    openConfirmation,
    setOpenConfirmation,
    isEditModalOpen,
    setIsEditModalOpen,
    editModalOpener,
    documentId,
    setDocumentId,
    setSuccessfulOperation,
    setMessage,
    crop,

    serviceCharge,

    mode,

    trayCapacity,

    duration,

    role,
    action,
    setIsDeletionEnabled,
  } = useModal();

  function handler() {
    console.log(role, action);
    if (role == "operator" && action == "edit") {
      fetch("http://localhost:3000/api/updateop", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
          fullName: fullName,
          phone: phone,
          adhar: adhar,
          address: address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Operator edited successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    } else if (role == "owner" && action == "edit") {
      fetch("http://localhost:3000/api/updateloc", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
          owner: fullName,
          phoneno: phone,
          adhar: adhar,
          address: address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Location edited successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    } else if (role == "crop" && action == "edit") {
      fetch("http://localhost:3000/api/updatecrop", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
          crop: crop,
          mode: mode,
          trayCapacity: trayCapacity,

          duration: duration,
          serviceCharge: serviceCharge,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Crop edited successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    } else if (role == "crop" && action == "delete") {
      console.log("Hi bro");
      fetch("http://localhost:3000/api/deletecrop", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("Crop deleted successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    } else if (role == "owner" && action == "delete") {
      console.log("Hi bro");
      fetch("http://localhost:3000/api/deleteloc", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("location deleted successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    } else if (role == "operator" && action == "delete") {
      console.log("Hi bro");
      fetch("http://localhost:3000/api/deleteop", {
        method: "POST",
        body: JSON.stringify({
          id: documentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setMessage("operator deleted successfully");
          setSuccessfulOperation(true);
          console.log("success");
        } else if (!response.ok) {
          console.log("Failed");
        }
      });
    }
  }
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
          width: "90vw",

          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h6" color="red" style={{ textAlign: "center" }}>
          On clicking confirm {role} will be {action}ed. Would you like to
          proceed?
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
              setIsDeletionEnabled(false);
            }}
          >
            cancel
          </Button>
        </div>
      </Card>
    </Box>
  );
}
