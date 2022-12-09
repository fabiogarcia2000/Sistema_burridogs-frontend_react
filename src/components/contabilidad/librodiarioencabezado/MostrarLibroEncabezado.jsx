import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { getCurrentDateShort } from "../../../utils/fechaYhora";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcel/Export_Excel";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { getCurrentDate, getCurrentTime } from "../../../utils/fechaYhora";

const UrlMostrar =
  "http://190.53.243.69:3001/mc_libroencabezado/getallPorPeriodo/0";
const UrlMostrarDetalles =
  "http://190.53.243.69:3001/mc_librodetalle/getdiarioporenca/";
const UrlEliminar = "https://jsonplaceholder.typicode.com/comments";

const UrlMayorizar = "http://190.53.243.69:3001/mc_libromayor/mayorizar/";

const UrlPeriodo = "http://190.53.243.69:3001/mc_periodo/getall/";

const objeto = "FORM_LIBRO_ENCABEZADO";

const MostrarLibroDetalle = () => {
  const fechaHoy = getCurrentDateShort();
  const navigate = useNavigate();

  const [opcionSelect, setOpcionSelect] = useState("");

  const valoresIniciales = [
    {
      fecha: "",
      usuario: null,
      id_estado: null,
      id_usuario: null,
      descripcion: "",
      tipo_estado: "",
      descripcion_periodo: "",
      id_periodo_contable: null,
      id_libro_diario_enca: null,
    },
  ];

  /**************Fecha y Hora*************************/
  const [fecha, setFecha] = useState("--/--/--");
  const [fechaCorta, setFechaCorta] = useState("--/--/----");
  /***************************************************/

  //*******FECHA Y HORA*******/
  //obtener fecha
  const Fecha = () => {
    setFecha(getCurrentDate());
    setFechaCorta(getCurrentDateShort());
  };

  const valoresInicialesSub = [
    {
      sinopsis: "",
      monto_debe: 0,
      id_sucursal: null,
      monto_haber: 0,
      id_subcuenta: null,
      d_centro_costo: null,
      nombre_subcuenta: "",
      descripcion_sucursal: null,
      id_libro_diario_deta: null,
      id_libro_diario_enca: null,
      descripcion_centro_costo: null,
    },
  ];

  const [datos, setDatos] = useState({});
  const [enviar, setEnviar] = useState(false);

  const [error, setError] = useState({
    errorFecha: false,
    errorId: false,
  });

  const [datosEnc, setDatosEnc] = useState({
    id_periodo_contable: opcionSelect,
    descripcion: "",
    fecha: fecha,
  });

  //fecha encabezado
  const GuardarFecha = (valor) => {
    setDatosEnc({ ...datosEnc, fecha: valor });
    setError({ ...error, errorFecha: false });
  };

  //descripcion encabezado
  const GuardarDesc = (valor) => {
    setDatosEnc({ ...datosEnc, descripcion: valor });
    setError({ ...error, errorDesc: false });
  };

  useEffect(() => {
    if (datosEnc.fecha === "") {
      setError({ ...error, errorFecha: true });
    } else {
      setError({ ...error, errorFecha: false });
    }
  }, [datosEnc.fecha]);

  useEffect(() => {
    if (datosEnc.descripcion === "") {
      setError({ ...error, errorDesc: true });
    } else {
      setError({ ...error, errorDesc: false });
    }
  }, [datosEnc.descripcion]);

  //PREPARAR DATA
  const Submit = () => {
    if (datosEnc.fecha === "") {
      setError({ ...error, errorFecha: true });
    } else if (datosEnc.descripcion === "") {
      setError({ ...error, errorDesc: true });
    } else {
      setDatos({
        id_periodo_contable: datosEnc.id_periodo_contable,
        descripcion: datosEnc.descripcion,
        fecha: datosEnc.fecha,
      });
      setEnviar(true);
    }
  };

  //Enviar Data
  const PostMayor = async () => {
    console.log("valores a enviar");
    console.log(datos);
    try {
      const res = await axios.post(UrlMayorizar, datos);
      console.log("Data Respuesta");
      console.log(res.data);
      setGlobalState("dataPartida", res.data);
      setEnviar(false);
      mostrarAlertas("guardado");
      navigate("/admin/mostrarlibroencabezado");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (datos.descripcion && enviar) {
      PostMayor();
    }
  }, [datos]);

  //Configurar los hooks
  const [detalles, setDetalles] = useState(valoresIniciales);
  const [subDetalles, setSubDetalles] = useState(valoresInicialesSub);
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  const [registroDelete, setRegistroDelete] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
  }, []);

  //procedimineto para obtener todos los registros
  const getRegistros = async () => {
    try {
      const res = await axios.get(UrlMostrar);
      setRegistros(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  const ValidarFecha = () => {};
  const [sucursal, setperiodo] = useState([]);
  useEffect(() => {
    getperiodo();
  }, []);

  //petición a api
  const getperiodo = async () => {
    try {
      const res = await axios.get(UrlPeriodo);
      setperiodo(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //************************************************/
  //petición a api con la opción del select
  const getPediodoSelect = async () => {
    try {
      const res = await axios.get(UrlMostrar + opcionSelect);
      setRegistros(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //opción seleccionada en el select
  const handlerCargarPeriodo = function (e) {
    const opcion = e.target.value;
    setOpcionSelect(opcion);
  };

  useEffect(() => {
    if (opcionSelect !== "") {
      getPediodoSelect();
    }
  }, [opcionSelect]);

  //************************************************/
  //petición a api para mostrar detalles
  const getDetalles = async (idEnca) => {
    try {
      const res = await axios.get(UrlMostrarDetalles + idEnca);
      let valores = res.data;
      setDetalles(res.data);
      setSubDetalles(valores[0].detalle);
      setGlobalState("dataPartida", valores[0]);
      setGlobalState("dataDetalles", valores[0].detalle);
    } catch (error) {
      console.log(error);
      //mostrarAlertas("errormostrar");
    }
  };

  useEffect(() => {
    setTotalDebe(0);
    setTotalHaber(0);

    subDetalles.map((list) =>
      setTotalDebe((prevVal) => prevVal + parseFloat(list.monto_debe || 0))
    );

    subDetalles.map((list) =>
      setTotalHaber((prevVal) => prevVal + parseFloat(list.monto_haber || 0))
    );
  }, [subDetalles]);

  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true);

  const Permisos = () => {
    const newData = temp.filter((item) => item.objeto === objeto);
    setPermisos(newData);
  };

  useEffect(() => {
    let data = localStorage.getItem("permisos");
    if (data) {
      setTemp(JSON.parse(data));
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
    setPermitido(permisos[0].permiso_consultar);
  };

  /*******************/

  //Alertas de éxito o error al eliminar
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "eliminado":
        Swal.fire({
          title: "¡Eliminado!",
          text: "El encabezado de libro diario se eliminó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el encabezado de libro diario",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "errormostrar":
        Swal.fire({
          title: "Error al Mostrar",
          text: "En este momento no se pueden mostrar los datos, puede ser por un error de red o con el servidor. Intente más tarde.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;
      case "periodocerrado":
        Swal.fire({
          text: "Periodo Cerrado",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "permisos":
        Swal.fire({
          title: "Lo siento, no tienes permisos para realizar esta acción.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;
      case "mayorizar":
        Swal.fire({
          title: "El diario fue mayorizado con éxito.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "errormayorizar":
        Swal.fire({
          title: "Error al mayorizar",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;
      default:
        break;
    }
  };

  //procedimineto para eliminar un registro
  const deleteRegistro = async () => {
    try {
      console.log(registroDelete);
      const res = await axios.delete(`${UrlEliminar}${registroDelete}`);
      getRegistros();
      if (res.status === 200) {
        mostrarAlertas("eliminado");
        RegistroEnVitacora(
          permisos[0].id_objeto,
          "ELIMINAR",
          "ELIMINAR LIBRO DIARIO"
        );
      } else {
        mostrarAlertas("error");
      }
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
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
    results = registros;
  } else {
    results = registros.filter((dato) =>
      dato.descripcion.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);

  //Ventana modal para mostrar mas
  const [modalMayor, setMayor] = useState(false);
  const abrirModalMayor = () => setMayor(!modalMayor);

  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_libro_diario_enca,
      sortable: true,
    },
    {
      name: "PERIODO CONTABLE",
      selector: (row) => row.id_periodo_contable,
      sortable: true,
    },
    {
      name: "FECHA",
      selector: (row) => row.fecha_inicial,
      sortable: true,
    },
    /*{
      name: "FECHA FINAL",
      selector: (row) => row.fecha_final,
      sortable: true,
    },*/
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    /*{
      name: "MONTO HABER",
      selector: (row) => row.monto_haber,
      sortable: true,
    },*/
    {
      name: "ESTADO",
      selector: (row) => row.tipo_estado,
      sortable: true,
    },
    {
      name: "USUARIO",
      selector: (row) => row.id_usuario,
      sortable: true,
    },

    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-light"
            title="Ver Más..."
            onClick={() => {
              getDetalles(row.id_libro_diario_enca);
              abrirModalVerMas();
              //RegistroEnVitacora(permisos[0].id_objeto, "LECTURA", "MOSTRAR MAS LIBRO DIARIO ENCABEZADO");
            }}
          >
            <i className="bi bi-eye-fill"></i>
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => {
              if (permisos[0].permiso_actualizacion) {
                mostrarAlertas("permisos");
              } else {
                getDetalles(row.id_libro_diario_enca);
                setGlobalState("registroEdit", row);
                navigate("/admin/EditarLibroEncabezado");
              }
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              if (permisos[0].permiso_eliminacion) {
                setRegistroDelete(row.id_libro_diario_enca);
                abrirModalEliminar();
              } else {
                mostrarAlertas("permisos");
              }
            }}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="container">
      <h3>Libro Diario</h3>
      <br />

      {permitido ? (
        <div>
          {/*Mostrar los botones: Nuevo, Excel y PDF */}
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
                  aria-label="First group"
                >
                  <button
                    //AQUI
                    type="button"
                    className="btn btn-primary"
                    title="Agregar Nuevo"
                    onClick={() => {
                      if (permisos[0].permiso_insercion) {
                        navigate("/admin/CrearLibroEncabezado");
                      } else {
                        mostrarAlertas("permisos");
                      }
                    }}
                  >
                    <i className="bi bi-plus-lg"></i> Nuevo
                  </button>
                </div>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="Second group"
                >
                  <Button
                    to="/"
                    type="button"
                    className="btn btn-success"
                    title="Exportar a Excel"
                    onClick={() => {
                      Export_Excel(results);
                      RegistroEnVitacora(
                        permisos[0].id_objeto,
                        "EXPORTAR",
                        "EXPORTAR EXCEL LIBRO DIARIO"
                      );
                    }}
                  >
                    <i className="bi bi-file-earmark-excel-fill"></i>
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    title="Exportar a PDF"
                    onClick={() => {
                      Export_PDF(results);
                      RegistroEnVitacora(
                        permisos[0].id_objeto,
                        "EXPORTAR",
                        "EXPORTAR PDF LIBRO DIARIO"
                      );
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
                  placeholder="Buscar por descripcion..."
                  aria-label="Search"
                  value={busqueda}
                  onChange={valorBuscar}
                />
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="row">
              <Formik
                //valores iniciales
                initialValues={{
                  id_periodo_contable: "",
                }}
                //Funcion para validar
              >
                <Form>
                  <div className="row">
                    <div className="col-5">
                      <div className="mb-3">
                        <label
                          htmlFor="id_periodo_contable"
                          className="form-label"
                        >
                          Periodo contable
                        </label>
                        <select
                          className="form-select"
                          id="id_periodo_contable"
                          name="id_periodo_contable"
                          onClick={handlerCargarPeriodo}
                        >
                          <option value="">Seleccionar...</option>
                          {sucursal.map((item, i) => (
                            <option key={i} value={item.id_periodo_contable}>
                              Periodo:{item.id_periodo_contable} Fecha:
                              {item.descripcion_periodo}
                            </option>
                          ))}
                        </select>
                        {/*<ErrorMessage
                            name="id_periodo_contable"
                            component={() => (
                              <div className="error">
                                {errors.id_periodo_contable}
                              </div>
                            )}
                          /> */}
                      </div>
                    </div>
                    <div className="col-sm-4 bottom-aligned">
                      <button
                        className="btn btn-danger mb-3 me-2"
                        onClick={() => {
                          navigate("/admin/MayorizarDiario");
                        }}
                      >
                        Mayorizar
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
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
                fixedHeaderScrollHeight="550px"
              />
            ) : (
              <p className="text-center">Ninguna Categoría</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-danger">
          Lo siento, no tienes permisos para realizar esta acción.
        </p>
      )}

      {/* Ventana Modal de ver más
      <Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">ID: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.id_libro_diario_enca} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.fecha} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">DESCRIPCION: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.descripcion} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">DESCRIPCION ESTADO PERIODO: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.descripcion_estado_periodo} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">USUARIO: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.usuario} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">DESCRIPCION TIPO PERIODO: </p>
            </div>
            <div className="col-sm-6">
              <p> {encabezadoVerMas.descripcion_tipo_periodo} </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>*/}

      {/* Ventana Modal de Eliminar*/}
      <Modal isOpen={modalEliminar} toggle={abrirModalEliminar} centered>
        <ModalHeader toggle={abrirModalEliminar}>Eliminar Registro</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de Eliminar este Registro?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteRegistro();
              abrirModalEliminar();
            }}
          >
            Eliminar
          </Button>
          <Button color="secondary" onClick={abrirModalEliminar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de ver más*/}
      <Modal size="lg" isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col">
                <p>
                  <strong>FECHA: </strong>
                  {detalles[0].fecha || ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <strong>DESCRIPCIÓN: </strong>
                  {detalles[0].descripcion || ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <strong>DESCRIPCIÓN PERIODO: </strong>
                  {detalles[0].descripcion_periodo || ""}
                </p>
              </div>
            </div>
            <hr />

            <div className="row regul">
              <table class="table table-sm table-bordered border-dark table-responsive">
                <thead class="color1 border-dark">
                  <tr>
                    <th scope="col">SUBCUENTA</th>
                    <th scope="col">MONTO DEBE</th>
                    <th scope="col">MONTO HABER</th>
                    <th scope="col">SINOPSIS</th>
                    <th scope="col">SUCURSAL</th>
                    <th scope="col">CENTRO DE COSTOS</th>
                  </tr>
                </thead>
                <tbody>
                  {subDetalles &&
                    subDetalles.map((item, i) => (
                      <tr key={i}>
                        <td>{item.nombre_subcuenta}</td>
                        <td>{item.monto_debe}</td>
                        <td>{item.monto_haber}</td>
                        <td>{item.sinopsis}</td>
                        <td>{item.descripcion_sucursal}</td>
                        <td>{item.descripcion_centro_costo}</td>
                      </tr>
                    ))}

                  <tr>
                    <td className="text-end" colspan="5">
                      <strong>TOTAL DEBE:</strong>
                    </td>
                    <td>
                      <strong>{parseFloat(totalDebe)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end" colspan="5">
                      <strong>TOTAL HABER:</strong>
                    </td>
                    <td>
                      <strong>{totalHaber}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end" colspan="5">
                      <strong>DIFERENCIA: </strong>
                    </td>
                    <td>
                      <strong>{totalDebe - totalHaber || 0}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal Mayorizar*/}
      <Modal isOpen={modalMayor} toggle={abrirModalMayor} centered>
        <Formik
          //valores iniciales
          initialValues={{
            id_periodo_contable: "",
            descripcion: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion referencia
            if (!valores.descripcion) {
              errores.descripcion = "Requerido";
            }

            return errores;
          }}
        >
          {({ errors, values }) => (
            <Form>
              <ModalHeader toggle={abrirModalMayor}>
                <h4>Mayorizar Periodo {opcionSelect}</h4>
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="row">
                    <h5>Descripción:</h5>
                  </div>

                  <Field
                    type="text"
                    className="form-control"
                    name="descripcion"
                    placeholder="Descripción para el mayor"
                    onKeyUp={cambiarAMayusculasDescripcion(values)}
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => {
                    Submit();
                    abrirModalMayor();
                  }}
                >
                  Mayorizar
                </Button>
                <Button color="secondary" onClick={abrirModalMayor}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default MostrarLibroDetalle;
