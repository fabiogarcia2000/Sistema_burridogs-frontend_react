import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

//to="/admin/crearcompra"
//  to="/admin/reporte-compra-fecha"
function PanelCompras() {
  let navigate = useNavigate();

  return (
    <div>
      <h2 id="Bienvenido">Panel de Compras</h2>
      <hr />
      <h4>Seleccione una opción</h4>
      <br />

      <div className="row">
        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div
                className="panel panel-danger panel-colorful"
                onClick={() => {
                  navigate("/admin/crearcompra");
                }}
                type="button"
              >
                <div className="panel-body text-center">
                  <p className="text-uppercase mar-btm text-sm">
                    <strong>Orden de Compra</strong>
                  </p>
                  <i className="bi bi-bag-plus fs-1"></i>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div
                className="panel panel-info panel-colorful"
                onClick={() => {
                  navigate("/admin/reporte-compra-fecha");
                }}
                type="button"
              >
                <div className="panel-body text-center">
                  <p className="text-uppercase mar-btm text-sm">
                    <strong>Reporte de Compras</strong>
                  </p>
                  <i className="bi bi-journal-plus fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelCompras;
