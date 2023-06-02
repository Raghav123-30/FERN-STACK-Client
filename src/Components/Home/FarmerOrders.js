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
import XLSX from "xlsx";

export default function OrdersTable({ locationId, orderData, setOrderData }) {
  const DownloadSheet = () => {
    const workSheet = XLSX.utils.json_to_sheet(orderData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "orders");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "orders.xlsx");
  };
  const [loading, setLoading] = useState(false);
  const getDate = (timestamp) => {
    const seconds = timestamp.seconds;
    const milliseconds =
      seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);

    // Get the day, month, and year components from the date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    // Format the components as "DD/MM/yyyy"
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    return formattedDate;
  };
  useEffect(() => {
    console.log("now sending the request");
    async function fetchOrders() {
      if (locationId) {
        setLoading(true);
        await fetch("http://localhost:3000/api/getOrders", {
          method: "POST",
          body: JSON.stringify({
            locationId: locationId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(orderData);
            setOrderData(data.data);
          });
      }
    }
    fetchOrders();
  }, [locationId]);
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
        onClick={DownloadSheet}
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
            <TableCell>Colorcode</TableCell>
            <TableCell>Number of trays</TableCell>
            <TableCell>Arrival Date</TableCell>
            <TableCell>Dispatch Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <TableRow key={orderData.phoneNumber}>
              <TableCell>{row.farmername}</TableCell>
              <TableCell>{row.farmerphone}</TableCell>
              <TableCell>{row.selectedcrop}</TableCell>
              <TableCell>{row.colorcode}</TableCell>
              <TableCell>{row.totalnumberoftrays}</TableCell>
              <TableCell>{getDate(row.dateofarrival)}</TableCell>
              <TableCell>{getDate(row.dateofdispatch)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
