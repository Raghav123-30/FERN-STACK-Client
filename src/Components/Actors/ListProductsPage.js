import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";
import ProductEditFragment from "./list-product-editModal";
import SuccessMessage from "../Settings/successOperation";
import Confirmation from "./confirmationHandlers/Confirmation";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { useModal } from "../../Contexts/ModalContext";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemSharpIcon from "@mui/icons-material/ReportProblemSharp";
import { Button, Typography } from "@mui/material";

export default function ListProductsPage() {
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const {
    productName,
    setProductName,
    rack,
    setRack,
    section,
    setSection,
    tray,
    setTray,
    productNameError,
    setProductNameError,
    rackError,
    setRackError,
    sectionError,
    setSectionError,
    trayError,
    setTrayError,
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
    message,
    setMessage,
    setRole,
    setAction,
    successfulOperation,
    isDeletionEnabled,
    setIsDeletionEnabled,
  } = useModal();

  const delModalOpener = () => {
    setDelModalVisible(true);
  };

  const closedelModalHandler = () => {
    setDelModalVisible(false);
  };
  useEffect(() => {
    async function getData() 
    {
      await fetch("http://localhost:3000/api/listproduct",{
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

  const deleteHandler = () => {
    console.log("Deleting document with ID:", documentId);
    fetch("http://localhost:3000/api/deleteproduct", {
      method: "POST",
      body: JSON.stringify({
        id: documentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        console.log(data.message);
      });
  };

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
          <IconButton
            style={{ margin: "1rem", float: "right" }}
            onClick={() => console.log("Download button clicked")}
          >
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
                <TableCell style={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                 No of Racks
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                 No of Sections
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  No of Trays
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.productName}>
                  <TableCell component="th" scope="row">
                    {item.productName}
                  </TableCell>
                  <TableCell align="right">{item.rack}</TableCell>
                  <TableCell align="right">{item.section}</TableCell>
                  <TableCell align="right">{item.tray}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setProductName(item.productName);
                        setRack(item.rack);
                        setSection(item.section);
                        setTray(item.tray);
                        setRole("A3S Product");
                        setAction("edit");
                        setDocumentId(item.id);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDocumentId(item.id);
                        setRole("A3S Product");
                        setAction("delete");
                        setIsDeletionEnabled(true);
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
        <ProductEditFragment></ProductEditFragment>
        {isDeletionEnabled && <Confirmation></Confirmation>}
      </Card>
    );
  } else if (available && successfulOperation) {
    return <SuccessMessage message={message}></SuccessMessage>;
  }
}
