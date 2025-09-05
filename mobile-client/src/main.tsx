import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "virtual:uno.css";
import "./main.css";
import 'antd-mobile/bundle/css-vars-patch.css'

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);