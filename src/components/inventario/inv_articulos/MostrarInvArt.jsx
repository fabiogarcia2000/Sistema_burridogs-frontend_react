import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import Swal from "sweetalert2";
import { Export_Excel } from "./generarExcel/Export_Excel";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel_MV } from "./generarExcel_MV/Export_Excel_MV";
import { Export_PDF_MV } from "./generarPDF_MV/Export_PDF_MV";

const UrlMostrar = "http://190.53.243.69:3001/articulo/getallporbodega";
const UrlMostrarInv = "http://190.53.243.69:3001/articulo/getallactiveinv";
const UrlMostrarBod = "http://190.53.243.69:3001/centro_costo/getall";
const UrlMostrarArtBod =
  "http://190.53.243.69:3001/articulo/movimientosporarticulo/";

const MostrarInvArticulos = () => {
  const [encabezado, setEncabezado] = useState([]);

  //Configurar los hooks
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
  }, []);

  //procedimineto para obtener los artículos
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
    getArticulos();
  }, []);

  //petición a api
  const getArticulos = async () => {
    try {
      const res = await axios.get(UrlMostrarInv);
      setArticulos(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener los artículos
  const [bodegas, setBodegas] = useState([]);
  useEffect(() => {
    getBodegas();
  }, []);

  //petición a api
  const getBodegas = async () => {
    try {
      const res = await axios.get(UrlMostrarBod);
      setBodegas(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para mostrar todos los registros
  const getRegistros = async () => {
    try {
      const res = await axios.get(UrlMostrar);
      setRegistros(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //Alertas de éxito o error al eliminar
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "eliminado":
        Swal.fire({
          title: "¡Eliminado!",
          text: "El artículo se eliminó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el artículo",
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

      default:
        break;
    }
  };

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  //const [registroVerMas, setRegistroVerMas] = useState({});

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
    results = registros.filter(
      (dato) =>
        dato.cod_articulo.toString().includes(busqueda.toLocaleLowerCase()) ||
        dato.descripcion_articulo
          .toLowerCase()
          .includes(busqueda.toLocaleLowerCase())
    );
  }

  let results2 = [];
  results2 = encabezado;

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "CÓDIGO ART.",
      selector: (row) => row.cod_articulo,
      sortable: true,
      maxWidth: "160px", //ancho de la columna
    },

    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion_articulo,
      sortable: true,
      maxWidth: "450px",
    },
    {
      name: "CÓDIGO",
      selector: (row) => row.cod_centro_costo,
      sortable: true,
      maxWidth: "120px",
    },

    {
      name: "CENTRO DE COSTO",
      selector: (row) => row.descripcion_centro_costo,
      sortable: true,
      maxWidth: "190px",
    },

    {
      name: "EN MANO",
      selector: (row) => row.en_mano,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "CANT. MÍN",
      selector: (row) => row.inventario_minimo,
      sortable: true,
      maxWidth: "160px",
    },

    {
      name: "CANT. MAX",
      selector: (row) => row.inventario_maximo,
      sortable: true,
      maxWidth: "160px",
    },
  ];

  //Configuramos las columnas de la tabla
  const columns2 = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
      maxWidth: "260px", //ancho de la columna
    },

    {
      name: "TIPO",
      selector: (row) => row.tipo,
      sortable: true,
      maxWidth: "450px",
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.cantidad,
      sortable: true,
      maxWidth: "150px",
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
      <h3>Artículos por Bodega</h3>
      <br />
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
              aria-label="Second group"
            >
              <Button
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={() => {
                  Export_Excel(results);
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
              <i class="bi bi-search"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar por código o descripción..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
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
          fixedHeaderScrollHeight="550px"
        />
          ) : (
     <p className="text-center">Ningún Registro</p>
   )}
      </div>
      <br />
      <hr />
      <h3>Consultar Movimientos</h3>
      <br />
      <div className="row">
        <Formik
          //valores iniciales
          initialValues={{
            id_articulo: "",
            id_centro_costo: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion de artículo
            if (!valores.id_articulo) {
              errores.id_articulo = "Seleccione una campo";
            }

            // Validacion centro costo
            if (!valores.id_centro_costo) {
              errores.id_centro_costo = "Seleccione una campo";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            try {
              console.log(valores);
              const res = await axios.post(UrlMostrarArtBod, valores);
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
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="idArticulo" className="form-label">
                      Artículo:
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="idArticulo"
                      name="id_articulo"
                    >
                      <option value="">Seleccionar...</option>
                      {articulos.map((item, i) => (
                        <option key={i} value={item.id_articulo}>
                          {item.descripcion}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="id_articulo"
                      component={() => (
                        <div className="error">{errors.id_articulo}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="idCentro_costo" className="form-label">
                      Bodega:
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="idCentro_costo"
                      name="id_centro_costo"
                    >
                      <option value="">Seleccionar...</option>
                      {bodegas.map((item, i) => (
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

                <div className="col-sm-4 bottom-aligned">
                  <button className="btn btn-primary mb-3 me-2" type="submit">
                    Consultar
                  </button>
                  <Button
                    type="button"
                    className="btn btn-success"
                    title="Exportar a Excel"
                    onClick={() => {
                      Export_Excel_MV(results2);
                    }}
                  >
                    <i className="bi bi-file-earmark-excel-fill"></i>
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    title="Exportar a PDF"
                    onClick={() => {
                      Export_PDF_MV(results2);
                    }}
                  >
                    <i className="bi bi-filetype-pdf"></i>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/*Mostramos la segunda tabla con los datos*/}
      <div className="row">
        <div className="col-8">
          {results.length > 0 ? (
            <DataTable
              columns={columns2}
              data={results2}
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

      {/* Ventana Modal de ver más*/}
      <Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Movimientos</ModalHeader>
        <ModalBody>
          <div className="row">
            <DataTable
              columns={columns2}
              data={""}
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="200px"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MostrarInvArticulos;
