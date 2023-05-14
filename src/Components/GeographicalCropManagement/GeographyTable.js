import { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";

import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";

export default function GeographyTable() {
  const [Loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    setLoading(true);
    async function fetchFromServer() {
      await fetch("http://localhost:3000/api/getAllGeography", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDocuments(data.data);
        });
    }
    fetchFromServer();
    setLoading(false);
  }, []);
  if (Loading) {
    <Card
      style={{
        width: "80%",

        margin: "0 auto",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress></CircularProgress>
      <p>Fetching data from the server</p>
    </Card>;
  } else if (!Loading) {
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
                <TableCell style={{ fontWeight: "bold" }}>
                  Region/Division
                </TableCell>

                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.region}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton onClick={() => {}}>
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>
                    <IconButton onClick={() => {}}>
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
