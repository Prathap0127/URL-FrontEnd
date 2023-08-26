import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Browser Router
import { BrowserRouter } from "react-router-dom";

//  Bootstrap Css
import "bootstrap/dist/css/bootstrap.min.css";

import { CookiesProvider } from "react-cookie";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
        />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
