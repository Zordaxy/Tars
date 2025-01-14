import React, { createContext, useState, useContext, useEffect } from "react";

const DialogContext = createContext();

export const DIALOG_TYPE = {
  INITIAL: "INITIAL",
  QUESTIONS: "QUESTIONS",
  FEEDBACK: "FEEDBACK",
};

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogType, setDialogType] = useState(DIALOG_TYPE.FEEDBACK);

  const openDialog = (type = DIALOG_TYPE.FEEDBACK, title, header) => {
    if (window.isDialogOpened) {
      const error = "Attempting to open modal dialog, but it is already opened";
      console.error(error);
      return;
    }
    setDialogTitle(title);
    setDialogHeader(header);
    setOpen(true);
    setDialogType(type);
    window.isDialogOpened = true;
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogTitle(""); // Reset title on close
    setDialogHeader(""); // Reset content on close
    window.isDialogOpened = false;
  };

  useEffect(() => {
    window.openDialog = openDialog;
    window.closeDialog = closeDialog;
  }, []);

  return (
    <DialogContext.Provider
      value={{
        open,
        dialogTitle,
        dialogHeader,
        openDialog,
        closeDialog,
        dialogType,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// Custom hook to use the Dialog Context
export const useDialog = () => useContext(DialogContext);
