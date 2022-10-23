import React, { useRef } from "react";
import { Routes } from "react-router-dom";
import { Link, Route, Switch } from "wouter";
import Login from "../../login/Login";
import Registro from "../../registro/Registro";
import Usuarios from "../../usuarios/Usuarios";
import "./sidebar.css";

export default function SideBarComponent(props) {
  
  return (
    <div className="contenedor">
    <div className="sideBarcss">
      <div className="liMenus">
        <div className="padre">
          <span id="seguridad" className="txtPadre">Seguridad</span>
          <div className="hijos">
            <a className="nodoHijo" href="#">Usuario</a>
            <a className="nodoHijo" href="#">Gestión de Usuario</a>
            <a className="nodoHijo" href="#">Preguntas</a>
            <a className="nodoHijo" href="#">Preguntas de Usuario</a>
            <a className="nodoHijo" href="#">Parámetros</a>
            <a className="nodoHijo" href="#">Objetos</a>
            <a className="nodoHijo" href="#">Permisos</a>
            <a className="nodoHijo" href="#">Roles</a>
            <a className="nodoHijo" href="#">Gestión Bitácora</a>
          </div>
        </div>
      </div>
  </div>
    <div className="contenedorrutas">
    <Switch>
                <Route component={Login} path="/Login" />
                <Route component={Registro} path="/Registro" />
                <Route component={Usuarios} path="/Seguridad/Usuarios" />
                {/* <Route
                  component={SearchResults}
                  path="/search/:keyword/:rating?"
                />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={ErrorPage} path="/:rest*" /> */}
    </Switch>


    </div>

  </div>
  );
}
