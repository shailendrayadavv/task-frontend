import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { DetailsPage } from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/details" element={<DetailsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
