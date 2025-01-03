import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomDialog from "../popup/dialog/CustomDialog";
import { DialogProvider } from "./dialogContext";

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            fontSize: "16px",
          },
          "& .MuiDialogTitle-root": {
            fontSize: "22px",
          },
          "& .MuiDialogContentText-root": {
            fontSize: "17px",
          },
          "& .MuiTextField-root": {
            fontSize: "17px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
  },
  typography: {
    // Override typography to use px instead of rem
    fontSize: 16,
    h2: {
      fontSize: 22,
    },
    p: {
      fontSize: 16,
    },
  },
});

const injectRoot = () => {
  const root = document.createElement("div");
  root.id = "crx-root";
  // Reset root styles
  root.style.cssText = `
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
  `;
  document.body.appendChild(root);
  return root;
};

const initContent = () => {
  const root = injectRoot();
  const reactRoot = createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <DialogProvider>
        <ThemeProvider theme={theme}>
          <CustomDialog />
        </ThemeProvider>
      </DialogProvider>
    </React.StrictMode>
  );
};

// Initialize React in content script
export default initContent;
