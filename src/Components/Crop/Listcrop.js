import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { useModal } from "../../Contexts/ModalContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CropEditModal from "./List-crop-edit-modal";
import SuccessMessage from "../Settings/successOperation";
import Confirmation from "../Actors/confirmationHandlers/Confirmation";
export default function ListCropPage() {
  const {
    crop,
    setCrop,
    serviceCharge,
    setServiceCharge,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    documentId,
    setDocumentId,
    duration,
    setDuration,
    setRole,
    role,
    setAction,
    action,
    successfulOperation,
    message,
    isDeletionEnabled,
    setIsDeletionEnabled,
  } = useModal();
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const editModalOpener = () => {
    setEditModal(true);
  };
  const editModalCloser = () => {
    setEditModal(false);
  };
  const deleteModalOpener = () => {
    setDeleteModal(true);
  };
  const deleteModalCloser = () => {
    setDeleteModal(false);
  };
  useEffect(() => {
    async function getData() {
      await fetch("http://localhost:3000/api/listcrop", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
          console.log(data);
          console.log(data.message);
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
        });
    }
    getData();
  }, []);

  if (!available) {
    return (
      <Card
        style={{
          width: "90vw",
          maxWidth: "800px",
          height: "20vh",
          margin: "0 auto",
          marginTop: "5rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress></CircularProgress>
        <p>Fetching data from the server</p>
      </Card>
    );
  }

  if (available && data.length && !successfulOperation) {
    return (
      <Card
        style={{
          width: "90vw",
          maxWidth: "800px",

          margin: "0 auto",
          marginTop: "5rem",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <TableContainer component={Paper}>
          <IconButton style={{ margin: "1rem", float: "right" }}>
            <DownloadIcon />
          </IconButton>
          <Table aria-label="simple table">
            <TableHead
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Crop </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Mode
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Tray Capacity (in Kg)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Service Charge (in Rs)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Duration (in days)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.crop}>
                  <TableCell component="th" scope="row">
                    {item.crop}
                  </TableCell>
                  <TableCell align="right">{item.mode}</TableCell>
                  <TableCell align="right">{item.trayCapacity}</TableCell>
                  <TableCell align="right">{item.serviceCharge}</TableCell>
                  <TableCell align="right">{item.duration}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setCrop(item.crop);
                        setMode(item.mode);
                        setTrayCapacity(item.trayCapacity);
                        setServiceCharge(item.serviceCharge);
                        setDuration(item.duration);
                        setDocumentId(item.id);
                        setId(item.id);
                        setRole("crop");
                        setAction("edit");
                        editModalOpener();
                      }}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setRole("crop");
                        setAction("delete");
                        setIsDeletionEnabled(true);
                        setDocumentId(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CropEditModal
          editModal={editModal}
          setEditModal={setEditModal}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        ></CropEditModal>
        {isDeletionEnabled && <Confirmation />}
      </Card>
    );
  } else if (available && successfulOperation) {
    return <SuccessMessage message={message}></SuccessMessage>;
  }
}
