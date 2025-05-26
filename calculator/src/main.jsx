import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AverageCalculator from "./AverageCalculator";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/numbers/p" replace />} />
      <Route path="/numbers/:numberid" element={<AverageCalculator />} />
      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  </BrowserRouter>
);
