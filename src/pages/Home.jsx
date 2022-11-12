import React from "react";
import logoEmpresa from "../assets/img/logo1.png";

function Home() {
  return (
    <div>
      <h1 id="Bienvenido">Bienvenido Al Sistema POS Burridogs</h1>
      <img id="LogoEmpresa" src={logoEmpresa} alt="Logo Empresa" />
    </div>
  );
}

export default Home;
