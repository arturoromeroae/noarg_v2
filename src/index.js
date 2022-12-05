import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cotizaciones from "./pages/Cotizaciones";
import Repuestos from "./pages/Repuestos";
import Almacen from "./pages/Almacen";
import Mantenimiento from "./pages/Mantenimiento";
import Ventas from "./pages/Ventas";
import CompletarVenta from "./pages/CompletarVenta";
import Cuenta from "./pages/Cuenta";
import AgregarUsuarios from "./pages/AgregarUsuarios";
import Clientes from "./pages/Clientes";

// app test

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/completar-venta" element={<CompletarVenta />} />
        <Route path="/repuestos" element={<Repuestos />} />
        <Route path="/almacen" element={<Almacen />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/agregar-usuarios" element={<AgregarUsuarios />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
