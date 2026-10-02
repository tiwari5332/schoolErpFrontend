import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App.tsx";
import "./index.css";

console.log("App version: 1.0.4 - Vercel Fix Deployment");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
