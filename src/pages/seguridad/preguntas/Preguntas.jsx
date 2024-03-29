import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { downloadCSV, getOneParam, toUpperCaseField } from '../../../utils/utils';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2"; import '../preguntas/preguntas.css';
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcel/Export_Excel";
import { RegistroEnVitacora } from "../../../components/seguridad/bitacora/RegistroBitacora";

// const urlapi = "http://localhost:3001";

const UrlMostrar = "http://190.53.243.69:3001/ms_pregunta/getall/";
const UrlEliminar = "http://190.53.243.69:3001/ms_pregunta/eliminar/";

const objeto = "FORM_PREGUNTAS_SEGURIDAD"

export default function Pregunta(props) {
  const navigate = useNavigate();

    //Configurar los hooks
  const [registroDelete, setRegistroDelete] = useState('');
  useEffect(() => {
    getRegistros();
  }, []);

  var dataPar = JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam = getOneParam(dataPar, "URL_API")
  const urlapi = urlApiParam.valor

  
  
  const [registros, setRegistros] = useState([]);
  const getRegistros = async () => {
    fetch(urlapi + "/ms_pregunta/getall"
      , {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        // console.log("responseJson",responseJson)
        // console.log("responseJson.status",responseJson.status)
        setRegistros(responseJson.object);
        setPending(false)
      })
      .catch(error => {
        // console.log(error)   
      })
  };

  useEffect(() => {
    //saveLog()
    getRegistros();
  }, []);

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
  //Alertas de éxito o error al eliminar
const mostrarAlertas = (alerta) => {
  switch (alerta) {
    case 'eliminado':
      Swal.fire({
        title: '¡Eliminado!',
        text: "La cuenta se eliminó con éxito",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });

      break;

    case 'error':
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la cuenta',
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

      default: 
       break;
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
      RegistroEnVitacora(permisos[0].id_objeto, "ELIMINAR", "ELIMINAR PREGUNTA SEGURIDAD");
    } else {
      mostrarAlertas("error");
      RegistroEnVitacora(permisos[0].id_objeto, "ELIMINAR", "ERROR AL ELIMINAR PREGUNTA SEGURIDAD");

    }
  } catch (error) {
    console.log(error);
    mostrarAlertas("error");
    RegistroEnVitacora(permisos[0].id_objeto, "ELIMINAR", "ERROR AL ELIMINAR PREGUNTA SEGURIDAD");

  }
};

//Ventana modal de confirmación de eliminar
const [modalEliminar, setModalEliminar] = useState(false);
const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

//Ventana modal para mostrar mas
const [modalVerMas, setVerMas] = useState(false);
const abrirModalVerMas = () => setVerMas(!modalVerMas);
const [cuentaVerMas, setCuentaVerMas] = useState({});

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID PREGUNTA SEGURIDAD",
      selector: (row) => row.id_pregunta,
      sortable: false,
    },
    {
      name: "PREGUNTA",
      selector: (row) => toUpperCaseField(row.pregunta),
      sortable: false,
    },
    
    {
      name: "ACCIONES",
      cell: (row) => (
        <>

          &nbsp;
          <button
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => {
              if(permisos[0].permiso_actualizacion){
                setGlobalState("registroEdit", row);
                navigate("/admin/editarpregunta")
              }else{
                mostrarAlertas("permisos");
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
              if(permisos[0].permiso_eliminacion){
                setRegistroDelete(row.id_pregunta);
                abrirModalEliminar();
              }else{
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
      dato.id_pregunta.toString().includes(busqueda.toLocaleLowerCase()) ||
      dato?.pregunta?.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }



  const [pending, setPending] = React.useState(true);
  return (
    <div className="container">
      <h3>Preguntas de seguridad</h3>

      <br />

{permitido? (
     
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
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
                onClick={() => {
                  if(permisos[0].permiso_insercion){
                    navigate("/admin/crearpregunta") //
                  }else{
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
                onClick={()=>{
                  Export_Excel(results);
                  RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR EXCEL PREGUNTAS SEGURIDAD");
                }}
              >
                <i className="bi bi-file-earmark-excel-fill"></i>
              </Button>
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() =>{
                  Export_PDF(results);
                  RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR PDF PREGUNTAS SEGURIDAD");
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
              placeholder="Buscar por Id pregunta / pregunta..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
          </div>
        </div>
      </div>
      <br />
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
          progressPending={pending}
          progressComponent="Cargando datos..."
          noDataComponent="---Datos no encontrados ---"
          paginationPerPage="6"
        />
        ) : (
          <p className="text-center">Ningún Registro</p>
        )}
      </div>
    </div>

) : (
  <p className="text-center text-danger">Lo siento, no tienes permisos para realizar esta acción.</p>
)}


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
}
