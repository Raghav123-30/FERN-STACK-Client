import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
// Icons
import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllOutlined";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import SuccessMessage from "../Settings/successOperation";

const useStyles = {
  root: {
    marginTop: "5rem",
    overflowX: "auto",
    marginBottom: "5rem",
  },
  table: {
    minWidth: 1000,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
};

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles;
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export default function EditConfiguration({
  locationId,
  villageId,
  Crops,
  configured,
  setAllCrops,
  success,
  validator,
}) {
  const [crops, setCrops] = useState(Crops);
  const [previous, setPrevious] = useState({});
  const classes = useStyles;

  useEffect(() => {
    if (crops.length == 0) {
      setCrops(Crops);
    }
  }, [Crops, validator]);
  const onToggleEditMode = (id) => {
    setCrops((prevState) => {
      return prevState.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
    setAllCrops(crops);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((prevState) => ({ ...prevState, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newCrops = crops.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setCrops(newCrops);
    setAllCrops(newCrops);
  };

  const onRevert = (id) => {
    const newCrops = crops.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setCrops(newCrops);
    setAllCrops(newCrops);
    setPrevious((prevState) => {
      delete prevState[id];
      return { ...prevState };
    });
    onToggleEditMode(id);
  };
  if (success) {
    return <SuccessMessage message="Configuration set successfully" />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2vw",
          }}
        >
          <p
            style={{
              color: "green",
              fontWeight: "bold",

              textTransform: "uppercase",
            }}
          >
            Edit configuaration
          </p>
          <Button variant="contained" color="secondary">
            Add new crop
          </Button>
        </div>
        <Card
          style={{
            margin: "3rem",
            padding: "2rem",
          }}
        >
          <Table className={classes.table} aria-label="caption table">
            <TableHead
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">Cropname </TableCell>
                <TableCell align="left">Mode</TableCell>
                <TableCell align="left">Period</TableCell>
                <TableCell align="left">PerTrayCapacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crops.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="done"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="revert"
                          onClick={() => onRevert(row.id)}
                        >
                          <RevertIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <CustomTableCell {...{ row, name: "cropname", onChange }} />
                  <CustomTableCell {...{ row, name: "mode", onChange }} />
                  <CustomTableCell {...{ row, name: "period", onChange }} />
                  <CustomTableCell
                    {...{ row, name: "pertraycapacity", onChange }}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    );
  }
}
