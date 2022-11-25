import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { downloadCSV, getOneParam, toUpperCaseField } from '../../../utils/utils';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2"; 


const UrlEliminar = "http://190.53.243.69:3001/ms_rol/eliminar/";

export default function Roles(props) {

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
    fetch(urlapi + "/ms_rol/getall"
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

  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [cuentaVerMas, setCuentaVerMas] = useState({});

  //Configuramos las columnas de la tabla
  // const columReport=['rol','creado_por','descripcion','fecha_creacion']
  const columns = [
    {
      name: "ID ROL",
      selector: (row) => row.id_rol || 'NO APLICA',
      sortable: true,

    },
    {
      name: "ROL",
      selector: (row) => toUpperCaseField(row.rol) || 'NO APLICA',
      sortable: true,

    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => toUpperCaseField(row.descripcion) || 'NO APLICA',
      sortable: true,

    },
    {
      name: "CREADO POR",
      selector: (row) => toUpperCaseField(row.creado_por) || 'NO APLICA',
      sortable: true,

    },

    {
      name: "FECHA DE CREACIÓN",
      selector: (row) => row.fecha_creacion || 'NO APLICA',
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
              setCuentaVerMas(row);
            }}
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
          &nbsp;
          <Link
            to="/admin/editarrol"
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => setGlobalState('registroEdit', row)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setRegistroDelete(row.id_rol);
              abrirModalEliminar();
            }}
          >
            <i className="fa-solid fa-trash"></i>
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
      dato.id_rol.toString().includes(busqueda.toLocaleLowerCase()) ||
      dato.rol.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
      dato.fecha_creacion.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
      dato.descripcion.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
  };



  const [pending, setPending] = React.useState(true);
  return (

    <div className="container">
      <h5>Roles</h5>
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
                to="/admin/crearrol"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                <i className="fa-solid fa-plus"></i> Nuevo
              </Link>
            </div>
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
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <DataTable
          columns={columns}
          data={results}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          progressPending={pending}
          progressComponent="Cargando datos..."
          noDataComponent="---Datos no encontrados ---"
          paginationPerPage="6"
        // actions={actionsMemo}
        // fixedHeaderScrollHeight="550px"
        />
      </div>

      {/* Ventana Modal de ver más*/}
      <Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">ID ROL: </p>
            </div>
            <div className="col-sm-6">
              <p> {cuentaVerMas.id_rol} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MODIFICADOR POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {cuentaVerMas.modificado_por} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE MODIFICACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {cuentaVerMas.fecha_modificacion} </p>
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
}

