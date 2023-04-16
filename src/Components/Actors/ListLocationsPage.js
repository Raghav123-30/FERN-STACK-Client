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
export default function ListLocatiosPage() {
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(null);
  const [owner, setowner] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [season, setSeason] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [newphone, setnewPhone] = useState("");
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
          width: "50vw",
          height: "50vh",
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

  if (available && data.length) {
    return (
      <Card
        style={{
          width: "70%",
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
                        setowner(item.owner);
                        setAddress(item.address);
                        setAdharNumber(item.adharNumber);
                        setAddress(item.address);
                        setPhone(item.phone);
                        setnewPhone(item.phone);

                        editModalOpener();
                        setId(item.id);
                      }}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setId(item.id);
                        deleteModalOpener();
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
      </Card>
    );
  }
}
