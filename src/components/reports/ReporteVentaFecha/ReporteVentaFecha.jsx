import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
//import Factura from "../facturaA4/Factura";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcell/Export_Excel";

import Swal from "sweetalert2";

const UrlEncabezado = "http://190.53.243.69:3001/venta/venta_por_fecha/";
const UrlDetalles = "http://190.53.243.69:3001/venta/detalle_por_encabezado/";

const ReporteVentaFecha = () => {
  const componenteRef = useRef();

  const [encabezado, setEncabezado] = useState([]);
  const [detalles, setDetalles] = useState([]);

  //procedimineto para obtener los detalles
  const getDetalles = async (id) => {
    try {
      const res = await axios.get(UrlDetalles + id);
      setDetalles(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //Barra de busqueda
  const [busqueda, setBusqueda] = useState("");
  //capturar valor a buscar
  const valorBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  //metodo de filtrado
  let results = [];
  if (!busqueda) {
    results = encabezado;
  } else {
    results = encabezado.filter(
      (dato) =>
        dato.nombre_cliente
          .toLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        dato.rtn.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
        dato.venta_total.toString().includes(busqueda.toLocaleLowerCase()) ||
        dato.correlativo.toString().includes(busqueda.toLocaleLowerCase())
    );
  }

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
      },
      {
        name: "RTN",
        selector: (row) => row.rtn,
        sortable: true,
      },
      {
        name: "SUCURSAL",
        selector: (row) => row.cod_sucursal,
        sortable: true,
      },
      {
        name: "NÚMERO DE CUENTA",
        selector: (row) => row.numero_cuenta,
        sortable: true,
      },
      {
        name: "CORRELATIVO",
        selector: (row) => row.correlativo,
        sortable: true,
      },
      {
        name: "POS",
        selector: (row) => row.cod_pos,
        sortable: true,
    },
    {
        name: "DESCRIPCION",
        selector: (row) => row.descripcion_pos,
        sortable: true,
    },
      {
        name: "VENTA 15%",
        selector: (row) => row.venta_grabada_15,
        sortable: true,
      },
      {
        name: "VENTA 18%",
        selector: (row) => row.venta_grabada_18,
        sortable: true,
      },
      {
          name: "VENDEDOR",
          selector: (row) => row.usuario,
          sortable: true,
      },
      {
        name: "VENTAL TOTAL",
        selector: (row) => row.venta_total,
        sortable: true,
      },
      {
          name: "ESTADO",
          selector: (row) => row.descripcion_estado,
          sortable: true,
      },
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "error":
        Swal.fire({
          title: "Error",
          text: "No se realizo la consulta",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <h3>Reporte de Facturas por Fecha</h3>
      <br />

      <div className="row">
        <Formik
          //valores iniciales
          initialValues={{
            fecha_inicial: "",
            fecha_final: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion 
            if (!valores.fecha_inicial) {
              errores.fecha_inicial = "Seleccione una fecha";
            }

            // Validacion 
            if (!valores.fecha_final) {
              errores.fecha_final = "Seleccione una fecha";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            try {
              console.log(valores);
              const res = await axios.post(UrlEncabezado, valores);
              setEncabezado(res.data);
              console.log(res);
            } catch (error) {
              console.log(error);
              mostrarAlertas("errormostrar");
            }
          }}
        >
          {({ errors, values }) => (
            <Form>
              <div className="row g-3">
                <div className="col-sm-3">
                  <div className="mb-3">
                    <label htmlFor="inicio" className="form-label">
                      Fecha Inicio:
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="inicio"
                      name="fecha_inicial"
                    />

                    <ErrorMessage
                      name="fecha_inicial"
                      component={() => (
                        <div className="error">{errors.fecha_inicial}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="mb-3">
                    <label htmlFor="final" className="form-label">
                      Fecha Final:
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="final"
                      name="fecha_final"
                    />

                    <ErrorMessage
                      name="fecha_final"
                      component={() => (
                        <div className="error">{errors.fecha_final}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4 bottom-aligned">
                  <button className="btn btn-primary mb-3 me-2" type="submit">
                    Consultar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <hr />

      <div className="row">
        {/*Mostrar la barra de busqueda*/}
        <div className="col-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
            <Link
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={()=>{
                  Export_Excel(results);
                }}
              >
                <i className="fa-solid fa-file-excel"></i>
              </Link>
              <Link
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={()=>{
                  Export_PDF(results);
                }}
              >
                <i className="fa-solid fa-file-pdf"></i>
              </Link>
          </div>
        </div>
      </div>
      <br />

      {/*Mostramos la tabla con los datos*/}

      <div className="row">
        {results.length > 0 ? (
          <DataTable
            columns={columns}
            data={results}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="400px"
          />
        ) : (
          <p className="text-center">No hay registros que mostrar</p>
        )}
      </div>

    </div>
  );
};

export default ReporteVentaFecha;
