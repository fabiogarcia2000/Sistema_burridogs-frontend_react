import React, { useRef } from "react";
import "./navbar.css";

export default function NavBarComponent(props) {
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 =DatosEmpresa.logo1;
  
  return (
    <div className="navbarcss">
      <div className="logo">
        <img src={`data:image/png;base64,${logo1}`} alt="Imagen" />
      </div>
      <div className="slogan">
        <h5 className="h4Navbar">PIERDA LA PENA, ENTRELE SIN MIEDO</h5>
      </div>
    </div>
  );
}
