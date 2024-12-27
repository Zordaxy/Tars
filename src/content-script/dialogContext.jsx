import React, { createContext, useState, useContext, useEffect } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");

  const openDialog = (header) => {
    debugger;
    if (window.isDialogOpened) {
      console.log("Opened: ", window.isDialogOpened);
      const error = "Attempting to opem modal dialog, but it is already opened";
      console.error(error);
      return;
    }
    console.log("Opened: ", open);
    setDialogHeader(header);
    setOpen(true);
    window.isDialogOpened = true;
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogHeader(""); // Reset content on close
    window.isDialogOpened = false;
  };

  useEffect(() => {
    window.openDialog = openDialog;
    window.closeDialog = closeDialog;
  }, []);

  return (
    <DialogContext.Provider
      value={{ open, dialogHeader, openDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// Custom hook to use the Dialog Context
export const useDialog = () => useContext(DialogContext);
