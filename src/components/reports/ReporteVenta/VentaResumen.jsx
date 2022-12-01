import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcell/Export_Excel";
import Swal from "sweetalert2";

const UrlVentaTotal = "http://190.53.243.69:3001/venta/getreporteventas/";

const ReporteVentaResumen = () => {
  var dataPar = JSON.parse(localStorage.getItem("bodsuc"));
  var id_sucursal= dataPar[0].id_sucursal;

  var sucursal = dataPar[0].descripcion_sucursal;

  const [encabezado, setEncabezado] = useState([]);
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
      name: "DESCRIPCION",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "MONTO",
      selector: (row) => row.monto,
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
      <h3>Consultar el Total de las Ventas</h3>
      <br />

      <div className="row">
        <Formik
          //valores iniciales
          initialValues={{
            id_sucursal:id_sucursal,
            fecha_inicial: "",
            fecha_final: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion de código
            if (!valores.fecha_inicial) {
              errores.fecha_inicial = "Seleccione una fecha";
            }

            // Validacion descripción
            if (!valores.fecha_final) {
              errores.fecha_final = "Seleccione una fecha";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            //procedimineto para guardar el los cambios
            
            try {
              const res = await axios.post(UrlVentaTotal, valores);

                if (res.status === 200) {
                  setEncabezado(res.data);
                  //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR POS");
                } else {
                  mostrarAlertas("error");
                }
              
            } catch (error) {
              console.log(error);
              mostrarAlertas("error");
            }
      }}
        >
          {({ errors, values }) => (
            <Form>
              <div className="row g-3">
                <div className="col-sm-4">
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

                <div className="col-sm-4">
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
            <Button
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={()=>{
                  Export_Excel(results);
                }}
              >
                <i className="bi bi-file-earmark-excel-fill"></i>
              </Button>
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={()=>{
                  Export_PDF(results, sucursal);
                }}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Button>
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
            fixedHeaderScrollHeight="600px"
          />
        ) : (
          <p className="text-center">No hay registros que mostrar</p>
        )}
      </div>


    </div>
  );
};
  

export default ReporteVentaResumen;