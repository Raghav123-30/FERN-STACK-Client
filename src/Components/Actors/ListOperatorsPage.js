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
import OperatorEditFragment from "./list-operator-edit-modal";
import { useState } from "react";
import { useModal } from "../../Contexts/ModalContext";

export default function ListOperatorsPage() {
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState(null);

  const [id, setId] = useState("");

  const [adharNumber, setAdharNumber] = useState("");

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
  } = useModal();

  useEffect(() => {
    async function getData() {
      await fetch("http://localhost:3000/api/listop", {
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
                  A3S Location
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
                <TableRow key={item.fullName}>
                  <TableCell component="th" scope="row">
                    {item.fullName}
                  </TableCell>
                  <TableCell align="right">{item.phone}</TableCell>
                  <TableCell align="right">{item.address}</TableCell>
                  <TableCell align="right">{item.location}</TableCell>
                  <TableCell align="right">
                    {item.adharNumber || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setFullName(item.fullName);
                        setAddress(item.address);
                        setAdharNumber(item.adharNumber);
                        setLocation(item.location);
                        setPhone(item.phone);
                        setNewPhone(item.phone);

                        setIsEditModalOpen(true);
                        setId(item.id);
                      }}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setId(item.id);
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
        <OperatorEditFragment></OperatorEditFragment>
      </Card>
    );
  }
}
