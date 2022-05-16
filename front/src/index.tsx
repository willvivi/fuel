import React from "react";
import "./index.scss";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SnackbarProvider } from "notistack";
import Button from "@mui/material/Button";
import { createRoot } from "react-dom/client";

const notistackRef: React.RefObject<any> = React.createRef();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current.closeSnackbar(key);
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <SnackbarProvider
    ref={notistackRef}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    action={(key) => <Button onClick={onClickDismiss(key)}>Cacher</Button>}
    maxSnack={2}
  >
    <App />
  </SnackbarProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
