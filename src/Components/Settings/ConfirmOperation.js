// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useModal } from "../../Contexts/ModalContext";
// import Modal from "@mui/material/Modal";

// export default function ConfirmOperation(props) {
//   const {
//     successfulOperation,
//     setSuccessfulOperation,
//     openConfirmation,
//     setOpenConfirmation,
//   } = useModal();
//   const role = props.role;
//   const action = props.action;
//   const handler = () => {
//     setSuccessfulOperation(true);
//     console.log(props.locationId, props.numTrays);
//     fetch("http:localhost:3000/api/updateTray", {
//       method: "POST",
//       data: JSON.stringify({
//         id: props.locationId,
//         numTrays: props.numTrays,
//       }),
//     });
//   };
//   return (
//     <Modal
//       open={props.openConfirmation}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "80vw",
//           maxHeight: "90vh",
//           overflow: "auto",
//           padding: "2vh",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "2vh",
//           }}
//         >
//           <Typography
//             variant="h5"
//             color="gray"
//             style={{ textAlign: "center", marginTop: "2vh" }}
//           >
//             you have chosesn crop and will be set to the location. Do you want
//             to continue?
//           </Typography>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "1rem",
//               width: "70%",
//               marginTop: "2vh",
//               marginBottom: "2vh",
//             }}
//           >
//             <Button variant="contained" color="primary" onClick={handler}>
//               confirm
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => {
//                 setOpenConfirmation(false);
//                 window.location.reload();
//               }}
//             >
//               cancel
//             </Button>
//           </div>
//         </Card>
//       </Box>
//     </Modal>
//   );
// }
