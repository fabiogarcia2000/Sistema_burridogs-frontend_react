import React, { useRef } from "react";
import "./navbar.css";
import imgLogo from "./logo-dark.png";

export default function NavBarComponent(props) {
  return (
    <div className="navbarcss">
      <div className="logo">
        <img src={imgLogo} className="logoNavB" />
      </div>
      <div className="slogan">
        <h5 className="h4Navbar">PIERDA LA PENA, ENTRELE SIN MIEDO</h5>
      </div>
    </div>
  );
}
