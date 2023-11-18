import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import "../assets/css/index.css";
import TokenProtect from "../assets/components/TokenProtect";
import { Keranjang } from "../pages/Keranjang";
import RegisterFirebase from "../pages/RegisterFirebase";
import LoginFirebase from "../pages/LoginFirebase";
// import { ProtectedRoute } from "../assets/components/ProtectedRoute";
import { RiwayatPesanan } from "../pages/RiwayatPesanan";

export const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterFirebase />} />
        <Route path="/login" element={<LoginFirebase />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/riwayat" element={<RiwayatPesanan />} />
      </Routes>
    </BrowserRouter>
  );
};
