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
import { useModal } from "../../Contexts/ModalContext";
import XLSX from "xlsx";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import LocationEditModal from "./List-location-edit-modal";

import Confirmation from "./confirmationHandlers/Confirmation";
import SuccessMessage from "../Settings/successOperation";
export default function ListLocatiosPage() {
  const DownloadSheet = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "owners");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "ownerData.xlsx");
  };
  const {
    otpModal,
    setOtpModal,
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
    openConfirmation,
    setOpenConfirmation,
    message,
    successfulOperation,
    setDocumentId,
    role,
    setRole,
    action,
    isDeletionEnabled,
    setIsDeletionEnabled,
    isEditModalOpen,
    setIsEditModalOpen,
    setAction,
  } = useModal();
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
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
      await fetch("http://localhost:3000/api/listowners", {
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
          <IconButton
            style={{ margin: "1rem", float: "right" }}
            onClick={DownloadSheet}
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
                <TableCell style={{ fontWeight: "bold" }}>Full Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Phone Number
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Address
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Adhar Number
                </TableCell>

                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.owner}>
                  <TableCell component="th" scope="row">
                    {item.owner}
                  </TableCell>
                  <TableCell align="right">{item.phone}</TableCell>
                  <TableCell align="right">{item.address}</TableCell>

                  <TableCell align="right">
                    {item.adharNumber || "N/A"}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setFullName(item.owner);
                        setAddress(item.address);
                        setAdhar(item.adharNumber);
                        setAddress(item.address);
                        setPhone(item.phone);
                        setNewPhone(item.phone);

                        setDocumentId(item.id);
                        console.log(item.id);
                        setRole("owner");
                        setAction("edit");
                        setIsEditModalOpen(true);
                      }}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setDocumentId(item.id);

                        setRole("owner");
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
        <LocationEditModal />
        {isDeletionEnabled && <Confirmation></Confirmation>}
      </Card>
    );
  } else if (available && successfulOperation) {
    return <SuccessMessage message={message}></SuccessMessage>;
  }
}
