import { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Autocomplete from "@mui/material/Autocomplete";

import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CropTable() {
  const [Loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  const [chosenId, setChosenID] = useState("");
  const [chosen, setChosen] = useState(false);
  const [villages, setVillages] = useState([]);

  async function handleChoice() {
    setChosen(false);
    await fetchFromServer();
    setDocuments((prevDocuments) => {
      return prevDocuments.filter((item) => item.villageid === chosenId);
    });
    setChosen(true);
  }
  async function fetchFromServer() {
    await fetch("http://localhost:3000/api/getVillageCrops", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDocuments(data.data);
      });
  }
  async function getAllVillages() {
    await fetch("http://localhost:3000/api/getAllVillages")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVillages(data.data);
        setLoading(false);
      });
  }
  useEffect(() => {
    getAllVillages();
    setLoading(true);

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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "2vw",
            alignItems: "center",
          }}
        >
          <Autocomplete
            style={{
              width: "150%",
              marginBottom: "1.5rem",
              marginTop: "1.5rem",
            }}
            options={villages}
            getOptionLabel={(item) => item.village}
            renderInput={(params) => (
              <TextField {...params} label="pick village" variant="outlined" />
            )}
            renderOption={(props, item) => (
              <li {...props} key={item.id}>
                {item.village}
              </li>
            )}
            onChange={(event, value) => {
              if (value) {
                setChosenID(value.id);
              }
            }}
          />
          <Button variant="contained" onClick={handleChoice}>
            submit
          </Button>
        </div>

        {chosen && documents.length > 0 && (
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
                      Cropname
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>mode</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>period</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      pertraycapacity
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
                        {item.cropname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.mode}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.period}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.pertraycapacity}
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
        )}
        {chosen && documents.length == 0 && (
          <Card
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "red",
                fontSize: "2vh",
                textTransform: "uppercase",
              }}
            >
              No crops added in this village
            </p>
          </Card>
        )}
      </div>
    );
  }
}
