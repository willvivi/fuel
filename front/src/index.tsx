import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";

const notistackRef: React.RefObject<any> = React.createRef();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <SnackbarProvider
    ref={notistackRef}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    action={key => <Button onClick={onClickDismiss(key)}>Cacher</Button>}
    maxSnack={3}
  >
    <App />{" "}
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
