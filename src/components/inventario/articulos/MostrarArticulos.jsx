import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { Export_Excel } from "./generarExcel/Export_Excel";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel_RC } from "../articulos/generarExcel_RC/Export_Excel_RC";
import { Export_PDF_RC } from "../articulos/generarPDF_RC/Export_PDF_RC";
import { InsertarBitacora } from "../../seguridad/bitacora/InsertarBitacora";


const UrlMostrar = "http://190.53.243.69:3001/articulo/getall/";
const UrlMostrarReceta =
  "http://190.53.243.69:3001/lista_materiales/padregetone/";
const UrlEliminarArt = "http://190.53.243.69:3001/articulo/eliminar/";
const UrlEliminarReceta =
  "http://190.53.243.69:3001/lista_materiales/eliminar/";

const objeto = "FORM_ARTICULO";


const MostrarArticulos = () => {
  //Configurar los hooks
  const [encabezado, setEncabezado] = useState([]);
  const [registroDelete, setRegistroDelete] = useState("");
  const [recetaDelete, setRecetaDelete] = useState("");
  const [registros, setRegistros] = useState([]);
  const [recetas, setRecetas] = useState([]);
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
      const res = await axios.get(UrlMostrar);
      setArticulos(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };



   /*****Obtener y corroborar Permisos*****/
   const [temp, setTemp] = useState([]);
   const [permisos, setPermisos] = useState([]);
   const [permitido, setPermitido] = useState(true)
 
   const Permisos = () =>{
     const newData = temp.filter(
       (item) => item.objeto === objeto
     );
     setPermisos(newData);
   }
 
   useEffect(() => {
     let data = localStorage.getItem('permisos')
     if(data){
       setTemp(JSON.parse(data))
     }
   }, []);
 
   useEffect(() => {
     Permisos();
   }, [temp]);
 
 
   useEffect(() => {
     if(permisos.length > 0){
       TienePermisos();
     }
   }, [permisos]);
 
   const TienePermisos = () =>{
     setPermitido(permisos[0].permiso_consultar)
   }
 /*******************/ 





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

  //procedimineto para mostrar las recetas
  /* const getRecetas = async () => {
    try {
      const res = await axios.get(UrlMostrarReceta); 
      setRecetas(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };*/

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

  //procedimineto para eliminar artículo
  const deleteRegistro = async () => {
    try {
      console.log(registroDelete);
      const res = await axios.delete(`${UrlEliminarArt}${registroDelete}`);
      getRegistros();
      if (res.status === 200) {
        mostrarAlertas("eliminado");
        InsertarBitacora(permisos[0].id_objeto, "ELIMINAR", "ELIMINAR ARTICULO");
      } else {
        mostrarAlertas("error");
      }
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
    }
  };

  //procedimineto para eliminar receta
  const deleteReceta = async () => {
    try {
      console.log(recetaDelete);
      const res = await axios.delete(`${UrlEliminarReceta}${recetaDelete}`);
      getRegistros();
      if (res.status === 200) {
        mostrarAlertas("eliminado");
      } else {
        mostrarAlertas("error");
      }
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
    }
  };

  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Ventana modal para mostrar más articulos
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [registroVerMas, setRegistroVerMas] = useState({});

  //Ventana modal para mostrar más recetas
  const [modalVerMas2, setVerMas2] = useState(false);
  const abrirModalVerMas2 = () => setVerMas2(!modalVerMas2);
  const [registroVerMas2, setRegistroVerMas2] = useState({});

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
        dato.descripcion_corta
          .toLowerCase()
          .includes(busqueda.toLocaleLowerCase())
    );
  }

  let results2 = [];
  results2 = recetas;

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "CÓDIGO",
      selector: (row) => row.cod_articulo,
      sortable: true,
      maxWidth: "120px", //ancho de la columna
    },
    {
      name: "TIPO",
      selector: (row) => (row.tipo === "V" ? "VENTA" : "INVENTARIO"),
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion_articulo,
      sortable: true,
      maxWidth: "350px",
    },
    {
      name: "DESCRIPCIÓN CORTA",
      selector: (row) => row.descripcion_corta,
      sortable: true,
      maxWidth: "350px",
    },

    {
      name: "IMPUESTO",
      selector: (row) => row.descripcion_impuesto,
      sortable: true,
      maxWidth: "130px",
    },

    {
      name: "CATEGORIA",
      selector: (row) => row.descripcion_categoria,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "PRECIO",
      selector: (row) => row.precio,
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

    {
      name: "CÓDIGO DE BARRA",
      selector: (row) => row.codigo_barra,
      sortable: true,
      maxWidth: "180px",
    },

    {
      name: "UNIDAD DE MEDIDA",
      selector: (row) => row.descripcion_unidad_medida,
      sortable: true,
      maxWidth: "180px",
    },

    {
      name: "ESTADO",
      selector: (row) => (row.activo === "1" ? "ACTIVO" : "INACTIVO"),
      sortable: true,
    },

    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Link
            type="button"
            className="btn btn-light"
            title="Ver Más..."
            onClick={() => {
              abrirModalVerMas();
              setRegistroVerMas(row);
              InsertarBitacora(permisos[0].id_objeto, "LECTURA", "MOSTRAR MAS ARTICULO")
            }}
          >
            <i className="bi bi-eye-fill"></i>
          </Link>
          &nbsp;
          <Link
            to="/admin/editararticulo"
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => setGlobalState("registroEdit", row)}
          >
            <i class="bi bi-pencil-square"></i>
          </Link>
          &nbsp;
          <Link
            to="/admin/crearmaterial"
            type="button"
            className="btn btn-light"
            title="Añadir Receta"
            onClick={() => setGlobalState("registroEdit", row)}
          >
            <i className="bi bi-book"></i>
          </Link>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setRegistroDelete(row.cod_articulo);
              abrirModalEliminar();
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

  //Configuramos las columnas de la tabla
  const columns2 = [
    {
      name: "CÓDIGO ARTÍCULO",
      selector: (row) => row.cod_articulo_padre,
      sortable: true,
      maxWidth: "260px", //ancho de la columna
    },

    {
      name: "NOMBRE ARTICULO",
      selector: (row) => row.descripcion_articulo_padre,
      sortable: true,
      maxWidth: "450px",
    },
    {
      name: "CÓDIGO MATERIAL",
      selector: (row) => row.cod_articulo_hijo,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "NOMBRE MATERIAL",
      selector: (row) => row.descripcion_articulo_hijo,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.cantidad,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "COMENTARIO",
      selector: (row) => row.comentario,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Link
            type="button"
            className="btn btn-light"
            title="Ver Más..."
            onClick={() => {
              abrirModalVerMas2();
              setRegistroVerMas2(row);
            }}
          >
            <i className="bi bi-eye-fill"></i>
          </Link>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setRecetaDelete(row.id_articulo_padre);
              abrirModalEliminar();
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
      <h3>Artículos</h3>
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
              aria-label="First group"
            >
              <Link
                to="/admin/creararticulo"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                <i className="bi bi-plus-lg"></i> Nuevo
              </Link>
            </div>
            <div
              className="btn-group me-2"
              role="group"
              aria-label="Second group"
            >
              <Link
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={() => {
                  Export_Excel(results);
                  InsertarBitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR EXCEL ARTICULOS")
                }}
              >
                <i class="bi bi-file-earmark-excel-fill"></i>
              </Link>
              <Link
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() => {
                  Export_PDF(results);
                  InsertarBitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR PDF ARTICULOS")
                }}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Link>
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
        <DataTable
          columns={columns}
          data={results}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </div>

      {/*Sección de La Receta*/}
      <br />
      <hr />
      <h3>Consultar Receta de Artículo</h3>
      <br />
      <div className="row">
        <Formik
          //valores iniciales
          initialValues={{
            id_articulo_padre: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion de artículo
            if (!valores.id_articulo_padre) {
              errores.id_articulo_padre = "Seleccione una campo";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            try {
              console.log(valores);
              const res = await axios.get(
                `${UrlMostrarReceta}${valores.id_articulo_padre}`
              );
              setRecetas(res.data);
              console.log(res);
            } catch (error) {
              console.log(error);
              mostrarAlertas("errormostrar");
            }
          }}
        >
          {({ errors }) => (
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
                      name="id_articulo_padre"
                    >
                      <option value="">Seleccionar...</option>
                      {articulos.map((item, i) => (
                        <option key={i} value={item.id_articulo}>
                          {item.descripcion_articulo}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="id_articulo_padre"
                      component={() => (
                        <div className="error">{errors.id_articulo}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4 bottom-aligned">
                  <button className="btn btn-primary mb-3 me-2" type="submit">
                    Consultar
                  </button>
                  <Link
                    type="button"
                    className="btn btn-success"
                    title="Exportar a Excel"
                    onClick={() => {
                      Export_Excel_RC(results2);
                    }}
                  >
                    <i class="bi bi-file-earmark-excel-fill"></i>
                  </Link>
                  <Link
                    type="button"
                    className="btn btn-danger"
                    title="Exportar a PDF"
                    onClick={() => {
                      Export_PDF_RC(results2);
                    }}
                  >
                    <i class="bi bi-filetype-pdf"></i>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/*Mostramos la segunda tabla con los datos*/}
      <div className="row">
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

      {/* Ventana Modal de ver más*/}
      <Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CÓDIGO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.cod_articulo} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">DESCRIPCIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.descripcion_corta} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">IMPUESTO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.descripcion_impuesto} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CATEGORIA: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.descripcion_categoria} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">PRECIO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.precio} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">UNIDAD DE MEDIDA: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.descripcion_unidad_medida} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CÓDIGO DE BARRA: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.codigo_barra} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CREADO POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.creado_por} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE CREACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.fecha_creacion} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MODIFICADO POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.modificado_por} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE MODIFICACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas.fecha_modificacion} </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de ver más receta*/}
      <Modal isOpen={modalVerMas2} toggle={abrirModalVerMas2} centered>
        <ModalHeader toggle={abrirModalVerMas2}>Detalles</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CÓDIGO ARTÍCULO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.cod_articulo_padre} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">NOMBRE ARTÍCULO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.descripcion_articulo_padre} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CODIGO MATERIAL: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.cod_articulo_hijo} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CANTIDAD: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.cantidad} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">COMENTARIO: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.comentario} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CREADO POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.creado_por} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE CREACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.fecha_creacion} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MODIFICADO POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.modificado_por} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE MODIFICACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {registroVerMas2.fecha_modificacion} </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abrirModalVerMas2}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

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
    </div>
  );
};

export default MostrarArticulos;
