import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios"; // Import Axios
import App from "./App.jsx";
import "./index.css";

// Set the Axios base URL
axios.defaults.baseURL = "http://127.0.0.1:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
