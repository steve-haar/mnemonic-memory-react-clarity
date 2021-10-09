import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "modern-normalize/modern-normalize.css";
import "@cds/core/global.css"; // pre-minified version breaks
import "@cds/city/css/bundles/default.min.css";

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
