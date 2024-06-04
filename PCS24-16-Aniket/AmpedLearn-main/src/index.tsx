import { GlobalProvider } from "context";
import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Polyfill from MDN.
if (typeof window.queueMicrotask !== "function") {
  window.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch((e) =>
        setTimeout(() => {
          throw e;
        })
      );
  };
}

ReactDOM.render(
  <GlobalProvider>
    <Provider store={store}>
    <App />
    </Provider>
  </GlobalProvider>,
  document.getElementById("root")
);
