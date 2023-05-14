import Button from "@mui/material/Button";
import CropTable from "./CropTable";
import VillageTable from "./VillageTable";
import GeographyTable from "./GeographyTable";
import { useState } from "react";
export default function ListingData() {
  const [showCropTable, setShowCropTable] = useState(false);
  const [showVillageTable, setShowVillageTable] = useState(false);
  const [showGeographyTable, setShowGeographyTable] = useState(false);
  function enableGeoographyTable() {
    setShowGeographyTable(true);
    setShowVillageTable(false);
    setShowCropTable(false);
  }
  function enableVillageTable() {
    setShowVillageTable(true);
    setShowCropTable(false);
    setShowGeographyTable(false);
  }
  function enableCropTable() {
    setShowCropTable(true);
    setShowGeographyTable(false);
    setShowVillageTable(false);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "2vw",
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={enableGeoographyTable}
        >
          List geography
        </Button>
        <Button variant="contained" color="info" onClick={enableVillageTable}>
          List Villages
        </Button>
        <Button variant="contained" color="info" onClick={enableCropTable}>
          List Crops village wise
        </Button>
      </div>
      {showCropTable && <CropTable />}
      {showGeographyTable && <GeographyTable />}
      {showVillageTable && <VillageTable />}
    </div>
  );
}
