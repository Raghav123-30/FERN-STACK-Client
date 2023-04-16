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

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useModal } from "../../Contexts/ModalContext";

export default function CropTable() {
  const {
    editModalOpener,
    setCrop,

    setServiceCharge,

    setMode,

    setTrayCapacity,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useModal();
  const [rows, setRows] = useState([
    {
      crop: "Tomatoes",
      serviceCharge: 5,
      trayCapacity: "20kg",
      mode: "drying",
    },
    {
      crop: "Cucumbers",
      serviceCharge: 4,
      trayCapacity: "25kg",
      mode: "drying",
    },
    {
      crop: "Greengram",
      serviceCharge: 6,
      trayCapacity: "30kg",
      mode: "growing",
    },
  ]);

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <IconButton
        style={{ margin: "1rem", float: "right" }}
        onClick={() => console.log("Download button clicked")}
      >
        <DownloadIcon />
      </IconButton>
      <Table>
        <TableHead
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            <TableCell>Crop</TableCell>
            <TableCell>Service Charge</TableCell>
            <TableCell>Tray Capacity</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.crop}</TableCell>
              <TableCell>{row.serviceCharge}</TableCell>
              <TableCell>{row.trayCapacity}</TableCell>
              <TableCell>{row.mode}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setCrop(row.crop);
                    setMode(row.mode);
                    setTrayCapacity(row.trayCapacity);
                    setServiceCharge(row.serviceCharge);
                    editModalOpener();
                    setIsEditModalOpen(true);
                  }}
                >
                  <ModeEditOutlineIcon></ModeEditOutlineIcon>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
