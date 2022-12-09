import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setGlobalState } from "../../../globalStates/globalStates";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasCentroCosto,
  cambiarAMayusculasSinopsis,
  cambiarAMayusculasSucursal,
} from "../../../utils/cambiarAMayusculas";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";

const UrlEstado = "http://190.53.243.69:3001/mc_estado/getall";
const UrlSubcuenta = "http://190.53.243.69:3001/mc_subcuenta/getall";
const UrlCentroCost = "http://190.53.243.69:3001/centro_costo/getall";
const UrlMostrarSucursal = "http://190.53.243.69:3001/sucursal/getall";

const URLCrear = "http://190.53.243.69:3001/mc_libroencabezado/insertar";
const URLValidarFecha = "http://190.53.243.69:3001/mc_periodo/validar/";

const URLMostrarUno = "";
const current = new Date();
const date = `${current.getFullYear()}/${
  current.getMonth() + 1
}/${current.getDate()}`;

const objeto = "FORM_LIBRO_ENCABEZADO";

const CrearLibroEncabezado = () => {
  const navigate = useNavigate();

  const [indice, setIndice] = useState(1);
  const [partidaDelete, setPartidaDelete] = useState(0);
  const [listDetail, setListDetail] = useState([]);
  const [datosEnc, setDatosEnc] = useState({
    fecha: "",
    descripcion: "",
  });
  const [validarFecha, setValidarFecha] = useState(true);
  const [asiento, setAsiento] = useState({});
  const [enviar, setEnviar] = useState(false);

  const [error, setError] = useState({
    errorFecha: false,
    errorDesc: false,
  });

  //TRAER NOMBRE DE USUARIO PARA EL CREADO POR
  const userdata = JSON.parse(localStorage.getItem("data"));
  const iDusuario = userdata.data.id;

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  /***temp***/
  const [DifTotal, setDifTotal] = useState(0.0);
  const [tempdebe, setTempDebe] = useState(0.0);
  const [temphaber, setTempHaber] = useState(0.0);

  //resetea el valores
  const Refrescar = () => {
    window.location.reload();
  };

  //UTILIZAN ESTA PARTE PARA TRAER LOS DATOS DEL OBJETO
  // const [detalles, setidiario_enca] = useState([])

  const [dato, setDato] = useState([]);

  useEffect(() => {}, []);

  //procedimineto para obtener ESTADO
  const [estado, setestado] = useState([]);

  useEffect(() => {
    //getestado();
  }, []);

  //petición a api
  const getestado = async () => {
    try {
      const res = await axios.get(UrlEstado);
      setestado(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener SUBCUENTA
  const [subcuenta, setsubcuenta] = useState([]);
  useEffect(() => {
    getsubcuenta();
  }, []);

  //petición a api
  const getsubcuenta = async () => {
    try {
      const res = await axios.get(UrlSubcuenta);
      setsubcuenta(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener CENTRO COSTO
  const [centro, setcentro] = useState([]);
  useEffect(() => {
    getcentro();
  }, []);

  //petición a api
  const getcentro = async () => {
    try {
      const res = await axios.get(UrlCentroCost);
      setcentro(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener SUCURSAL
  const [sucursal, setsucursal] = useState([]);
  useEffect(() => {
    getsucursal();
  }, []);

  //petición a api
  const getsucursal = async () => {
    try {
      const res = await axios.get(UrlMostrarSucursal);
      setsucursal(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //Validar fecha
  const ValidarFecha = async () => {
    try {
      const res = await axios.get(URLValidarFecha + datosEnc.fecha);
      setValidarFecha(res.data);
    } catch (error) {
      console.log(error);
      //mostrarAlertas("errormostrar");
    }
  };

  useEffect(() => {
    if (datosEnc.fecha) {
      ValidarFecha();
    }
  }, [datosEnc]);

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
    } else if (!validarFecha) {
      mostrarAlertas("fechaError");
    } else if (datosEnc.descripcion === "") {
      setError({ ...error, errorDesc: true });
    } else if (!listDetail.length) {
      mostrarAlertas("vacio");
    } else if (DifTotal > 0 || DifTotal < 0) {
      mostrarAlertas("cuadrar");
    } else {
      setAsiento({
        id_estado: 1,
        descripcion: datosEnc.descripcion,
        fecha: datosEnc.fecha,
        id_usuario: iDusuario,
        detalle: listDetail,
      });
      setEnviar(true);
    }
  };

  //Enviar Data
  const PostAsiento = async () => {
    console.log("valores a enviar");
    console.log(asiento);
    try {
      const res = await axios.post(URLCrear, asiento);
      console.log(res.data);
      setEnviar(false);
      mostrarAlertas("guardado");
      navigate("/admin/mostrarlibroencabezado")
      console.log(res);
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
    }
  };

  useEffect(() => {
    if (asiento.descripcion && enviar) {
      PostAsiento();
    }
  }, [asiento]);

  //Eliminar una partida de la lista
  const eliminarPartida = () => {
    const newLista = listDetail.filter((item) => item.i !== partidaDelete);
    setListDetail(newLista);
  };

  //CALCULAR EL TOTAL DEL DEBE Y HABER
  useEffect(() => {
    setTempDebe(0);
    setTempHaber(0);

    try {
      listDetail.map((item) =>
        setTempDebe((prevValor) => prevValor + parseFloat(item.monto_debe))
      );

      listDetail.map((item) =>
        setTempHaber((prevValor) => prevValor + parseFloat(item.monto_haber))
      );
    } catch (error) {}
  }, [listDetail]);

  //CALCULAR LA DIFERENCIA DEL DEBE Y HABER
  useEffect(() => {
    setDifTotal(0);
    try {
      setDifTotal(parseFloat(tempdebe) - parseFloat(temphaber));
    } catch (error) {}
  }, [tempdebe, temphaber]);

  //Ventana modal eliminar artículo
  const [modalEliminarPartida, setModalEliminarPartida] = useState(false);
  const abrirModalEliminarPartida = () =>
    setModalEliminarPartida(!modalEliminarPartida);

  //===================Obtener datos del localstorage=====================
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
  //================================================================

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "vacio":
        Swal.fire({
          text: "Libro diario detalles está vacío",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;
      case "cuadrar":
        Swal.fire({
          text: "No debe haber diferencia entre el total debe y el total haber.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "Se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo crear",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "fechaError":
        Swal.fire({
          text: "No hay un período abierto para la fecha seleccionada",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      default:
        break;
    }
  };

  const columns = [
    {
      name: "SUBCUENTA",
      selector: (row) => row.id_subcuenta,
      sortable: true,
    },
    {
      name: "MONTO DEBE",
      selector: (row) => row.monto_debe,
      sortable: true,
    },
    {
      name: "MONTO HABER",
      selector: (row) => row.monto_haber,
      sortable: true,
    },
    {
      name: "SINOPSIS",
      selector: (row) => row.sinopsis,
      sortable: true,
    },
    {
      name: "SUCURSAL",
      selector: (row) => row.id_sucursal,
      sortable: true,
    },
    {
      name: "CENTRO COSTO",
      selector: (row) => row.id_centro_costo,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setPartidaDelete(row.i);
              abrirModalEliminarPartida();
            }}
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container">
      <h3 className="mb-3">Nuevo registro diario</h3>
      <div className="row g-3">
        <div className="col-sm-4">
          <div className="mb-3">
            <label htmlFor="fechafinal" className="form-label">
              Fecha:
            </label>
            <input
              type="date"
              className="form-control"
              id="fechafinal"
              name="fecha_final"
              onChange={(e) => GuardarFecha(e.target.value)}
            />
            {error.errorFecha === true ? (
              <div className="error">Seleccione una fecha</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="col-sm-8">
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción:
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              onChange={(e) => GuardarDesc(e.target.value)}
            />
            {error.errorDesc === true ? (
              <div className="error">Ingrese una descripción</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Formik
        //valores iniciales
        initialValues={{
          id_subcuenta: "",
          monto_debe: "0",
          monto_haber: "0",
          sinopsis: "",
          id_sucursal: "",
          id_centro_costo: "",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de subcuenta
          if (!valores.id_subcuenta) {
            errores.id_subcuenta = "Requerido";
          }

          // Validacion de debe y haber
          if (!valores.monto_debe) {
            valores.monto_debe = "0";
          } else if (!/^[0-9.]+$/.test(valores.monto_debe)) {
            errores.monto_debe = "Escribir solo números";
          } else if (!/^[0-9]+(.[0-9]+)?$/.test(valores.monto_debe)) {
            errores.monto_debe = "Ingrese un número válido";
          }

          // Validacion de debe y haber
          if (!valores.monto_haber) {
            valores.monto_haber = "0";
          } else if (!/^[0-9.]+$/.test(valores.monto_haber)) {
            errores.monto_haber = "Escribir solo números";
          } else if (!/^[0-9]+(.[0-9]+)?$/.test(valores.monto_haber)) {
            errores.monto_haber = "Ingrese un número válido";
          }

          // Validacion de debe y haber
          if (valores.monto_debe === "0" && valores.monto_haber === "0") {
            errores.monto_debe = "Requerido";
            errores.monto_haber = "Requerido";
          }

          // Validacion de debe y haber
          if (valores.monto_debe !== "0" && valores.monto_haber !== "0") {
            errores.monto_debe =
              "No puede ingresar en el debe y en el haber a la vez, solo en uno";
            errores.monto_haber =
              "No puede ingresar en el haber y en el debe a la vez, solo en uno";
          }

          // Validacion de sinopsis
          if (!valores.sinopsis) {
            errores.sinopsis = "Requerido";
          }
          // Validacion de id subcuenta
          if (!valores.id_subcuenta) {
            errores.id_subcuenta = "Requerido";
          }

          // Validacion de debe y haber
          if (!valores.id_sucursal && !valores.id_centro_costo) {
            errores.id_sucursal = "Requerido";
            errores.id_centro_costo = "Requerido";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          if (valores.monto_debe !== "0" && valores.monto_haber !== "0") {
            alert("Solo debe ingresar en el debe o en el haber, no en ambos");
          } else {
            setListDetail([
              ...listDetail,
              {
                i: indice,
                id_subcuenta: parseFloat(valores.id_subcuenta),
                monto_debe: parseFloat(valores.monto_debe || 0),
                monto_haber: parseFloat(valores.monto_haber || 0),
                sinopsis: valores.sinopsis,
                id_sucursal: valores.id_sucursal,
                id_centro_costo: valores.id_centro_costo,
              },
            ]);
            setIndice(indice + 1);
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <hr />

            {/**********************PRUEBA DE LA API ****************************/}
            <h3 className="mb-3">Libro diario detalle</h3>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="idsubcuenta" className="form-label">
                    SubCuenta:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idsubcuenta"
                    type="text"
                    name="id_subcuenta"
                  >
                    <option value="">Seleccionar...</option>
                    {subcuenta.map((item, i) => (
                      <option key={i} value={item.id_subcuenta}>
                        {item.nombre_subcuenta}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="id_subcuenta"
                    component={() => (
                      <div className="error">{errors.id_subcuenta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="montodebe" className="form-label">
                    Monto debe:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="montodebe"
                    name="monto_debe"
                    placeholder="Monto debe..."
                  />
                  <ErrorMessage
                    name="monto_debe"
                    component={() => (
                      <div className="error">{errors.monto_debe}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="montoHaber" className="form-label">
                    Monto haber:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="montoHaber"
                    name="monto_haber"
                    placeholder="Monto haber..."
                  />
                  <ErrorMessage
                    name="monto_haber"
                    component={() => (
                      <div className="error">{errors.monto_haber}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="sinopsis" className="form-label">
                    Sinopsis:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="sinopsis"
                    name="sinopsis"
                    placeholder="Sinopsis..."
                  />
                  <ErrorMessage
                    name="sinopsis"
                    component={() => (
                      <div className="error">{errors.sinopsis}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="sucursal" className="form-label">
                    Sucursal:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="pos"
                    name="id_sucursal"
                  >
                    <option value="">Seleccionar...</option>
                    {sucursal.map((item, i) => (
                      <option key={i} value={item.id_sucursal}>
                        {item.descripcion_sucursal}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_sucursal"
                    component={() => (
                      <div className="error">{errors.id_sucursal}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="centrocosto" className="form-label">
                    Centro costo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="centrocosto"
                    name="id_centro_costo"
                  >
                    <option value="">Seleccionar...</option>
                    {centro.map((item, i) => (
                      <option key={i} value={item.id_centro_costo}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="id_centro_costo"
                    component={() => (
                      <div className="error">{errors.id_centro_costo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Se agrego un boton para ir agregando los detalles */}
            <button
              type="submit"
              className="btn btn-warning mb-3 me-2 text-gray"
            >
              Agregar Detalle
            </button>
            {/* Fin boton */}

            <button
              type="reset"
              className="btn btn-warning mb-3 me-2 text-gray"
            >
              Limpiar
            </button>

            <hr />
          </Form>
        )}
      </Formik>

      <h3>Partidas</h3>
      {/*Mostramos la tabla con los datos*/}
      <div className="row">
        {listDetail.length > 0 ? (
          <DataTable
            columns={columns}
            data={listDetail}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="550px"
          />
        ) : (
          <p className="text-center">Ningún Registro</p>
        )}
      </div>
      <br />

      <hr />
      <Formik>
        <Form>
          <div className="container">
            <div className="col-4">
              <div className="row-2">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Debe
                    <span className="">
                      {"L. " + (tempdebe || 0).toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Haber
                    <span className="">
                      {"L. " + (temphaber || 0).toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h4>Diferencia</h4>
                    <span className="">
                      <h4>{"L. " + parseFloat(DifTotal).toFixed(2)}</h4>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <hr />

      <div className="row text-end">
        <div className="col-12">
          <button
            className="btn btn-success mb-3 me-2"
            type="button"
            onClick={() => Submit()}
          >
            Guardar
          </button>
          <Link
            to="/admin/mostrarlibroencabezado"
            type="button"
            className="btn btn-danger mb-3 me-2"
          >
            Cancelar
          </Link>
          {/**/}
        </div>
      </div>
      {/* Ventana Modal de eliminar un articulo de la lista*/}
      <Modal
        isOpen={modalEliminarPartida}
        toggle={abrirModalEliminarPartida}
        centered
      >
        <ModalHeader toggle={abrirModalEliminarPartida}>
          Eliminar Partida
        </ModalHeader>
        <ModalBody>
          <p>¿Está seguro de eliminar esta partida?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              //eliminarPartida();
              eliminarPartida();
              abrirModalEliminarPartida();
            }}
          >
            Eliminar
          </Button>
          <Button color="secondary" onClick={abrirModalEliminarPartida}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CrearLibroEncabezado;
