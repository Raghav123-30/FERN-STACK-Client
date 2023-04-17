import React from "react";
import { useEffect, useState, useContext } from "react";

const ModalContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [somethingIsRequested, setsomethingisRequested] = useState(false);
  const [crop, setCrop] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [mode, setMode] = useState("");
  const [trayCapacity, setTrayCapacity] = useState("");
  const [locationId, setLocationId] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [adhar, setAdhar] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [adharError, setAdharError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [location, setLocation] = useState("");
  const [verified, setverified] = useState(false);
  const [serverState, setServerState] = useState(true);
  const [newPhone, setNewPhone] = useState("");

  const editModalCloser = () => {
    setIsEditModalOpen(false);
  };
  const editModalOpener = () => {
    setIsDeleteModalOpen(true);
  };
  const deleteModalOpener = () => {
    setIsEditModalOpen(true);
  };
  const deleteModalCloser = () => {
    setIsDeleteModalOpen(false);
  };

  const values = {
    somethingIsRequested,
    setsomethingisRequested,
    crop,
    setCrop,
    serviceCharge,
    setServiceCharge,
    mode,
    setMode,
    trayCapacity,
    setTrayCapacity,
    locationId,
    setLocationId,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editModalOpener,
    editModalCloser,
    deleteModalOpener,
    deleteModalCloser,
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
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
    newPhone,
    setNewPhone,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
