import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Export_Excel } from "./generarExcell/Export_Excel";
//import { Export_PDF } from "./generarPDF/Export_PDF";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { RegistroEnVitacora } from "../../../src/components/seguridad/bitacora/RegistroBitacora";

const UrlConsultar = "http://190.53.243.69:3001/categoria/getall/";

const objeto = "RPT_LIBRO_MAYOR"

const LibroMayor = () => {
  const [mostrar, setMostrar] = useState([]);

  const navigate = useNavigate();

  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true)

  const Permisos = () => {
    const newData = temp.filter(
      (item) => item.objeto === objeto
    );
    setPermisos(newData);
  }

  useEffect(() => {
    let data = localStorage.getItem('permisos')
    if (data) {
      setTemp(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);


  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);


  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar)
  }

  /*******************/

  //Barra de busqueda
  const [busqueda, setBusqueda] = useState("");
  //capturar valor a buscar
  const valorBuscar = (e) => {
    setBusqueda(e.target.value);
  };


  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "TRANSACCION",
      selector: (row) => row.cod_categoria,
      sortable: true,
    },
    {
      name: "PEDIDO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PRODUCTO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PRECIO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "SUBTOTAL",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "IMPUESTO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PAGO",
      selector: (row) => row.descripcion,
      sortable: true,
    }


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
      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se realizo la consulta',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        break;

      default: break;
    }
  };




  return (
    <div className="container">
      <h3>Resumen de Ventas</h3>
      <br />
      {permitido ? (

        <div>
          <div className="row">
            <Formik
              //valores iniciales
              initialValues={{
                fecha_inicial: "",
                fecha_final: "",

                creado_por: "autorPrueba",
                fecha_creacion: "2022/10/27",
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
                  const res = await axios.put(`${UrlConsultar}${valores}`);
                  setMostrar(res.data)

                } catch (error) {
                  console.log(error);
                  mostrarAlertas("error");
                  navigate("");
                }
              }}
            >
              {({ errors }) => (
                <Form>

                  <div className="row g-3">
                    <div className="col-4">
                      <label htmlFor="fechaInicio" className="form-label">
                        Fecha Inicio:
                      </label>
                      <Field
                        type="date"
                        className="form-select"
                        id="fechaInicio"
                        name="fecha_inicial"
                      />

                      <ErrorMessage
                        name="fecha_inicial"
                        component={() => <div className="error">{errors.fecha_inicial}</div>}
                      />
                    </div>

                    <div className="col-4">
                      <label htmlFor="fechafin" className="form-label">
                        Fecha Fin:
                      </label>
                      <Field
                        type="date"
                        className="form-select"
                        id="fechafin"
                        name="fecha_final"
                      />

                      <ErrorMessage
                        name="fecha_final"
                        component={() => <div className="error">{errors.fecha_final}</div>}
                      />
                    </div>

                    <div className="col-2 bottom-aligned">
                      <button className="btn btn-primary me-2" type="button">
                        Consultar
                      </button>

                      {/** 
                <button className="btn btn-danger" type="button">
                    Limpiar
                </button>
*/}

                    </div>
                  </div>

                </Form>
              )}
            </Formik>
          </div>

          <br /> <hr /> <br />

          {/*Mostrar los botones: Excel y PDF */}
          <div className="row">
            <div className="col">
              <div
                className="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="Second group"
                >
                  <Button
                    type="button"
                    className="btn btn-success"
                    title="Exportar a Excel"
                    onClick={() => {
                      //Export_Excel(results);
                      RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR EXCEL RPT DE LIBRO MAYOR");
                    }}
                  >
                    <i className="bi bi-file-earmark-excel-fill"></i>
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    title="Exportar a PDF"
                    onClick={() => {
                      //Export_PDF(results);
                      RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR PDF RPT DE LIBRO MAYOR");
                    }}
                  >
                    <i className="bi bi-filetype-pdf"></i>
                  </Button>
                </div>
              </div>
            </div>

            {/*Mostrar la barra de busqueda*/}
            <div className="col-4">
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
              </div>
            </div>
          </div>
          <br />


          {/*Mostramos la tabla con los datos*/}
          {/*
      <div className="row">
        <DataTable
          columns={columns}
          data={mostrar}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </div>
*/}

          <div className="row">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>TRANSACCION	</th>
                  <th>PEDIDO</th>
                  <th>PRODUCTO</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>SUBTOTAL</th>
                  <th>IMPUESTO</th>
                  <th>TOTAL</th>
                  <th>PAGO</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td align="center">1</td>
                  <td>LLEVAR</td>
                  <td>PRODUCTO1</td>
                  <td align="right">1.00</td>
                  <td align="right">60.00</td>
                  <td align="right">60.00</td>
                  <td align="right">9.00</td>
                  <td align="right">69.00</td>
                  <td>EFECTIVO</td>
                </tr>

                <tr>
                  <td align="center">1</td>
                  <td>LLEVAR</td>
                  <td>PRODUCTO2</td>
                  <td align="right">1.00</td>
                  <td align="right">70.00</td>
                  <td align="right">70.00</td>
                  <td align="right">10.50</td>
                  <td align="right">80.50</td>
                  <td>EFECTIVO</td>
                </tr>

                <tr>
                  <td align="center">1</td>
                  <td>LLEVAR</td>
                  <td>PRODUCTO3</td>
                  <td align="right">1.00</td>
                  <td align="right">50.00</td>
                  <td align="right">50.00</td>
                  <td align="right">7.50</td>
                  <td align="right">57.50</td>
                  <td>EFECTIVO</td>
                </tr>

                <tr>
                  <td align="center">1</td>
                  <td>LLEVAR</td>
                  <td>PRODUCTO4</td>
                  <td align="right">1.00</td>
                  <td align="right">70.00</td>
                  <td align="right">70.00</td>
                  <td align="right">10.50</td>
                  <td align="right">80.50</td>
                  <td>EFECTIVO</td>
                </tr>

                <tr>
                  <td align="center">1</td>
                  <td>LLEVAR</td>
                  <td>PRODUCTO5</td>
                  <td align="right">2.00</td>
                  <td align="right">60.00</td>
                  <td align="right">120.00</td>
                  <td align="right">18.00</td>
                  <td align="right">138.00</td>
                  <td>EFECTIVO</td>
                </tr>

                <tr align="right">
                  <th>TOTALES</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>370.00</th>
                  <th>55.50</th>
                  <th>425.50</th>
                </tr>
              </tbody>
            </table>

          </div>

          </div>

) : (
  <p className="text-center text-danger">Lo siento, no tienes permisos para realizar esta acción.</p>
)}

        </div>
        
      );
}

      export default LibroMayor