import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import App from "./App";
import { worker } from "./mock";

// Start MSW
console.log("🔧 Starting MSW...");
worker.start().then(() => {
  console.log("✅ MSW Started Successfully");
}).catch((err) => {
  console.error("❌ MSW Failed to Start:", err);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
