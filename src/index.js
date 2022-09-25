import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cotizaciones from "./pages/Cotizaciones";
import Repuestos from "./pages/Repuestos";
import Almacen from "./pages/Almacen";
import Mantenimiento from "./pages/Mantenimiento";
import Ventas from "./pages/Ventas";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/repuestos" element={<Repuestos />} />
        <Route path="/almacen" element={<Almacen />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
