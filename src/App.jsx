import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio"
import Proyectos from "./pages/Proyectos"
import Contacto from "./pages/Contacto"
import Animacion from "./pages/proyectos/Animacion"
import Audiovisual from "./pages/proyectos/Audiovisual"
import Diseño from "./pages/proyectos/Diseño"
import Ilustracion from "./pages/proyectos/Ilustracion"
import Web from "./pages/proyectos/Web"
import Navbar from "./components/Navbar";
import ClimaAmbiente from "./components/ClimaAmbiente";
import LightningBolt from "./components/LightningBolt";




export default function App(){
  return(
    <>
    <div>
      <LightningBolt />

      <ClimaAmbiente />
    </div>
      
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Inicio/>} />
          <Route path="/proyectos" element={<Proyectos/>} />
          <Route path="/contacto" element={<Contacto/>} />

          <Route path="/animacion" element={<Animacion/>} />
          <Route path="/audiovisual" element={<Audiovisual/>} />
          <Route path="/diseño" element={<Diseño/>} />
          <Route path="/ilustracion" element={<Ilustracion/>} />
          <Route path="/web" element={<Web/>} />
        </Route>
      </Routes>
    </>
  );
}