import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_PDF_R } from "./generarPDF_resultado/Export_PDF_R";
import { Export_PDF_IngresoGasto } from "./generarPDF_ingresogasto/Export_PDF_IngresoGasto";
import { useNavigate } from "react-router-dom";

const UrlMostrar = "http://190.53.243.69:3001/mc_libroencabezado/getallPorPeriodo/";
const UrlEliminar = "https://jsonplaceholder.typicode.com/comments";

//BALANCE GENERAL
const UrlMostrarActivos = "http://190.53.243.69:3001/mc_activos/getall/";
const UrlMostrarPasivos = "http://190.53.243.69:3001/mc_pasivos/getall/";
const UrlMostrarPatrimonio = "http://190.53.243.69:3001/mc_patrimonios/getall/";
const UrlMostrarTotal = "http://190.53.243.69:3001/mc_total_activo/getall";
const UrlMostrarTotalPasivo = "http://190.53.243.69:3001/mc_total_pasivo/getall";
const UrlMostrarTotalPatrimonio = "http://190.53.243.69:3001/mc_total_patrimonio/getall";

//ESTADO DE RESULTADOS
const UrlMostrarResultado = "http://190.53.243.69:3001/mc_estado_resultado/getall";
const UrlMostrarTotalIngresosGastos = "http://190.53.243.69:3001/mc_total_ingresos_gastos/getall";

//INGRESOGASTO
const UrlMostrarIngresoGasto = "http://190.53.243.69:3001/mc_ingresos/getall";

const UrlPeriodo = "http://190.53.243.69:3001/mc_periodo/getall/"

const objeto = "FORM_LIBRO_MAYOR"

const MostrarLibroMayor = () => {
  const navigate = useNavigate();
  // Opcion del select
  const [opcionSelect, setOpcionSelect] = useState('');

  //Configurar los hooks
  const [registroDelete, setRegistroDelete] = useState('');

  const [registros, setRegistros] = useState([]);


//Configurar los hooks ACTIVO
const [registrosActivos, setRegistrosActivos] = useState([]);
useEffect(() => {
  getRegistrosActivos();
}, []);


//Configurar los hooks PASIVOS
const [registrosPasivos, setRegistrosPasivos] = useState([]);
useEffect(() => {
 getRegistrosPasivos();
}, []);

//Configurar los hooks PATRIMONIO
const [registrosPatrimonio, setRegistrosPatrimonio] = useState([]);
useEffect(() => {
 getRegistrosPatrimonio();
}, []);

//Configurar los hooks TOTAL ACTIVO
const [registrosTotal, setRegistrosTotal] = useState([]);
useEffect(() => {
 getRegistrosTotal();
}, []);

//Configurar los hooks TOTAL PASIVO
const [registrosTotalPasivo, setRegistrosTotalPasivo] = useState([]);
useEffect(() => {
 getRegistrosTotalPasivo();
}, []);

//Configurar los hooks TOTAL PATRIMONIO
const [registrosTotalPatrimonio, setRegistrosTotalPatrimonio] = useState([]);
useEffect(() => {
 getRegistrosTotalPatrimonio();
}, []);

//Configurar los hooks ESTADO DE RESULTADOS
const [registrosResultado, setRegistrosResultado] = useState([]);
useEffect(() => {
  getRegistrosResultado();
}, []);

//Configurar los hooks INGRESOS Y GASTOS
const [registrosIngresoGasto, setRegistrosIngresoGasto] = useState([]);
useEffect(() => {
  getRegistrosIngresoGasto();
}, []);

  //procedimineto para obtener todos los registros
  const getRegistros = async () => {
    try {
      const res = await axios.get(UrlMostrar);
      //setRegistros(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

 //procedimineto para obtener todos los registros ACTIVOS
 const getRegistrosActivos = async () => {
  try {
    const res = await axios.get(UrlMostrarActivos);
    setRegistrosActivos(res.data); //--
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

  //procedimineto para obtener todos los registros PASIVOS
  const getRegistrosPasivos = async () => {
    try {
      const res = await axios.get(UrlMostrarPasivos);
      setRegistrosPasivos(res.data); //--
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

 //procedimineto para obtener todos los registros de PATRIMONIO
 const getRegistrosPatrimonio = async () => {
  try {
    const res = await axios.get(UrlMostrarPatrimonio);
    setRegistrosPatrimonio(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

//procedimineto para obtener todos los registros de TOTAL
const getRegistrosTotal = async () => {
  try {
    const res = await axios.get(UrlMostrarTotal);
    setRegistrosTotal(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

//procedimineto para obtener todos los registros de TOTAL PASIVO
const getRegistrosTotalPasivo = async () => {
  try {
    const res = await axios.get(UrlMostrarTotalPasivo);
    setRegistrosTotalPasivo(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};


//procedimineto para obtener todos los registros de TOTAL PATRIMONIO
const getRegistrosTotalPatrimonio = async () => {
  try {
    const res = await axios.get(UrlMostrarTotalPatrimonio);
    setRegistrosTotalPatrimonio(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

//procedimineto para obtener todos los registros ESTADO DE RESULTADOS
const getRegistrosResultado = async () => {
  try {
    const res = await axios.get(UrlMostrarResultado);
    setRegistrosResultado(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

//procedimineto para obtener todos los registros INGRESOS Y GASTOS
const getRegistrosIngresoGasto = async () => {
  try {
    const res = await axios.get(UrlMostrarIngresoGasto);
    setRegistrosIngresoGasto(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};


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
  const handlerCargarPerido = function (e) {
    const opcion = e.target.value;
    setOpcionSelect(opcion)
  }

  useEffect(() => {
    if (opcionSelect !== "") {
      getPediodoSelect();
    }
  }, [opcionSelect]);

  //************************************************/

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
  //Alertas de éxito o error al eliminar
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'eliminado':
        Swal.fire({
          title: '¡Eliminado!',
          text: "El registro se eliminó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el registro',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'errormostrar':
        Swal.fire({
          title: 'Error al Mostrar',
          text: 'En este momento no se pueden mostrar los datos, puede ser por un error de red o con el servidor. Intente más tarde.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
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
      default: break;
    }
  };

  //procedimineto para eliminar un registro
  const deleteRegistro = async () => {
    try {
      console.log(registroDelete)
      const res = await axios.delete(`${UrlEliminar}${registroDelete}`);
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

  //Barra de busqueda
  const [busqueda, setBusqueda] = useState("")
  //capturar valor a buscar
  const valorBuscar = (e) => {
    setBusqueda(e.target.value)
  }
  //metodo de filtrado 
  let results = []
  if (!busqueda) {
    results = registros
  } else {
    results = registros.filter((dato) =>
      dato.codigo_cuenta.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
      dato.nombre_cuenta.toString().includes(busqueda.toLocaleLowerCase())
    )
  };

  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [encabezadoVerMas, setEncabezadoVerMas] = useState({});

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID LIBRO DIARIO ENCABEZADO",
      selector: (row) => row.id_libro_diario_enca,
      sortable: true,
    },
    {
      name: "PERIODO CONTABLE",
      selector: (row) => row.id_periodo_contable,
      sortable: true,
    },
    {
      name: "ESTADO",
      selector: (row) => row.tipo_estado,
      sortable: true,
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.descripcion,
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
      name: "FECHA INICIAL",
      selector: (row) => row.fecha_inicial,
      sortable: true,
    },
    {
      name: "FECHA FINAL",
      selector: (row) => row.fecha_final,
      sortable: true,
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.descripcion_estado_periodo,
      sortable: true,
    },

    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          {/*<Link
            to="/editarlibromayor"
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => setGlobalState('registroEdit', row)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
      </Link>*/}
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setRegistroDelete(row.id_cuenta);
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
      <h3>Libro Mayor</h3>
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
                  aria-label="Second group"
                >
                  <Link
                    to="/"
                    type="button"
                    className="btn btn-success"
                    title="Exportar a Excel"
                  >
                    <i className="fa-solid fa-file-excel"></i>
                  </Link>
                  <Link
                    to="/"
                    type="button"
                    className="btn btn-danger"
                    title="Exportar a PDF"
                  >
                    <i className="fa-solid fa-file-pdf"></i>
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
                  placeholder="Buscar por código o nombre de la cuenta..."
                  aria-label="Search"
                  value={busqueda}
                  onChange={valorBuscar}
                />
              </div>
            </div>
          </div>
          <br />

      {/*Mostrar los botones: Balance, Estado de resultados y Ingresos/egresos */}
      <div className="row">
        <div className="col">
          <div
            className="btn-toolbar"
            role="toolbar"
          >
            <div
              className="btn-group me-2"
            >
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() =>{
                  Export_PDF(registrosActivos, registrosPasivos, registrosPatrimonio, registrosTotal, registrosTotalPasivo, registrosTotalPatrimonio);
                }}
              >
                <i className="fa-solid fa-file-pdf"></i> Balance General
              </Button>
            </div>
            <div
              className="btn-group me-2"
            >
               <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() =>{
                  Export_PDF_R(registrosResultado);
                }}
              >
                <i className="fa-solid fa-file-pdf"></i> Estado de Resultados
              </Button>
            </div>
            <div
              className="btn-group me-2"
            >
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() =>{
                  Export_PDF_IngresoGasto(registrosIngresoGasto);
                }}
              >
                <i className="fa-solid fa-file-pdf"></i>Ingresos y Gastos
              </Button>
            </div>
            <div
              className="btn-group me-2"
            >
            </div>

              </div>
            </div>
            <br /><br />
            <div className="row">
              <div className="col-5">
                <div className="mb-3">

                  <label htmlFor="id_periodo_contable" className="form-label">
                    Periodo contable
                  </label>
                  <select
                    className="form-select"
                    id="id_periodo_contable"
                    name="id_periodo_contable"
                    onClick={handlerCargarPerido}
                  >
                    <option value="">Seleccionar...</option>
                    {sucursal.map((item, i) => (
                      <option key={i} value={item.id_periodo_contable}>Periodo:{item.id_periodo_contable}       Fecha inicio:{item.fecha_inicial}      Fecha final{item.fecha_final}</option>
                    ))}
                  </select >
                </div>
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
              <p className="text-center">No hay registros que mostrar</p>
            )}
          </div>

          </div>    
     ) : (
       <p className="text-center text-danger">Lo siento, no tienes permisos para realizar esta acción.</p>
     )}

          {/* Ventana Modal de ver más*/}
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
                  <p className="colorText">MONTO DEBE: </p>
                </div>
                <div className="col-sm-6">
                  <p> {encabezadoVerMas.monto_debe} </p>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <p className="colorText">MONTO HABER: </p>
                </div>
                <div className="col-sm-6">
                  <p> {encabezadoVerMas.monto_haber} </p>
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

      export default MostrarLibroMayor;
