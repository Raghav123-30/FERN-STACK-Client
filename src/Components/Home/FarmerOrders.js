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
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export default function OrdersTable() {
  const [rows, setRows] = useState([
    {
      fullName: "Sandeep Kumar",
      phoneNumber: "9891123456",
      crop: "Rice",
      weight: "10kg",
      price: 500,
      arrivalDate: "2022-04-16",
      dispatchDate: "2022-04-17",
    },
    {
      fullName: "Kavita Sharma",
      phoneNumber: "9812345678",
      crop: "Wheat",
      weight: "15kg",
      price: 750,
      arrivalDate: "2022-04-17",
      dispatchDate: "2022-04-18",
    },
    {
      fullName: "Amit Gupta",
      phoneNumber: "9876543210",
      crop: "Maize",
      weight: "12kg",
      price: 600,
      arrivalDate: "2022-04-18",
      dispatchDate: "2022-04-19",
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
            <TableCell>Full Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Crop</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Arrival Date</TableCell>
            <TableCell>Dispatch Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.crop}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.arrivalDate}</TableCell>
              <TableCell>{row.dispatchDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
