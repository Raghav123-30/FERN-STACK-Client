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
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
