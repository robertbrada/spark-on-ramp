import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Test } from "./components/Test/Test";
import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      {/* <Route path="/contact" component={Contact} /> */}
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);
