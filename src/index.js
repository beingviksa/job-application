import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { JobContextProvider } from "./components/jobContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <JobContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </JobContextProvider>
);
