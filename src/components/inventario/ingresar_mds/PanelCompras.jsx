import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";

function PanelCompras() {
  return (
    <div>
      <h2 id="Bienvenido">Panel de Compras</h2>
      <hr />
      <h4>Seleccione una opción</h4>
      <br />
      <div className="row">
        <div className="col">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group me-4"
              role="group"
              aria-label="First group"
            >
              <Link
                to="/admin/crearcompra"
                type="button"
                className="btn btn-danger m-4"
                title="Nuevo Pedido"
              >
                <i className="bi bi-truck"></i> Nuevo Pedido
              </Link>
            </div>
            <div
              className="btn-group me-4"
              role="group"
              aria-label="Second group"
            >
              <Link
                to="/admin/reporte-compra-fecha"
                type="button"
                className="btn btn-primary m-4"
                title="Ver Compras"
              >
                <i className="bi bi-clipboard-data"></i> Ver Compras
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelCompras;
