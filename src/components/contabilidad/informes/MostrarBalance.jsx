import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Export_PDF } from "./generarPDF/Export_PDF";


const UrlMostrar = "http://190.53.243.69:3001/mc_balance/getall/";
const UrlMostrarActivos = "http://190.53.243.69:3001/mc_activos/getall/";
const UrlMostrarPasivos = "http://190.53.243.69:3001/mc_pasivos/getall/";
const UrlMostrarPatrimonio = "http://190.53.243.69:3001/mc_patrimonios/getall/";
const UrlMostrarTotal = "http://localhost:3001/mc_total_activo/getall";
const UrlMostrarTotalPasivo = "http://localhost:3001/mc_total_pasivo/getall";
const UrlMostrarTotalPatrimonio = "http://localhost:3001/mc_total_patrimonio/getall";


const MostrarBalance = () => {
  //Configurar los hooks
  //const [registroDelete, setRegistroDelete] = useState('');
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
  }, []);

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

 //Configurar los hooks TOTAL PASIVO
 const [registrosTotalPatrimonio, setRegistrosTotalPatrimonio] = useState([]);
 useEffect(() => {
   getRegistrosTotalPatrimonio();
 }, []);

  //procedimineto para obtener todos los registros
  const getRegistros = async () => {
    try {
      const res = await axios.get(UrlMostrar);
      setRegistros(res.data);
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
      default: break;
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


  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_destino_cuenta,
      sortable: true,
    },
    {
      name: "NOMBRE CUENTA",
      selector: (row) => row.nombre_cuenta,
      sortable: true,
    },
    {
      name: "NOMBRE SUBCUENTA",
      selector: (row) => row.nombre_subcuenta,
      sortable: true,
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "CATEGORIA",
      selector: (row) => row.nombre_categoria,
      sortable: true,
    },
    {
      name: "SALDO",
      selector: (row) => row.saldo,
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

  return (
    <div className="container">
      <h3>Balance General</h3>
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
              <Link
                to="/"
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
              >
                <i className="fa-solid fa-file-excel"></i>
              </Link>
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() =>{
                  Export_PDF(registrosActivos, registrosPasivos, registrosPatrimonio, registrosTotal, registrosTotalPasivo, registrosTotalPatrimonio);
                }}
              >
                <i className="fa-solid fa-file-pdf"></i>
              </Button>
            </div>
          </div>
        </div>

        {/*Mostrar la barra de busqueda*/}
        <div className="col-4">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-magnifying-glass"></i>
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

        {/*Mostrar imput select con periodos*/}
        <div className="col-4">
          <div className="input-group flex-nowrap">
            <select
              as="select"
              className="form-select"
              id="periodocontable"
              name="id_periodo_contable"
            >
              <option value="">Seleccionar periodo contable...</option>
              <option value="1">Periodo 1</option>
              <option value="2">Periodo 2</option>
            </select>
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

      <Link
        to="/admin/mostrarlibromayor"
        type="button"
        className="btn btn-danger mb-3 me-2"
      >
        Cancelar
      </Link>

    </div>
  );
};

export default MostrarBalance;