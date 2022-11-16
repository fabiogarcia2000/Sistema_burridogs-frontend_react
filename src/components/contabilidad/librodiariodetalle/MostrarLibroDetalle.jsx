import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2"; 


const UrlMostrar = "http://190.53.243.69:3001/mc_librodetalle/getall/";
const UrlEliminar = "https://jsonplaceholder.typicode.com/comments";

const MostrarLibroDetalle= () => {
  //Configurar los hooks
  const [registroDelete, setRegistroDelete] = useState('');
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
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


//Alertas de éxito o error al eliminar
const mostrarAlertas = (alerta) =>{
  switch (alerta){
    case 'eliminado':
      Swal.fire({
        title: '¡Eliminado!',
        text: "El detalle de libro diario se eliminó con éxito",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });

    break;

    case 'error':
      Swal.fire({
        title: 'Error',
        text:  'No se pudo eliminar el detalle de libro diario',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });

    break;

    case 'errormostrar':
      Swal.fire({
        title: 'Error al Mostrar',
        text:  'En este momento no se pueden mostrar los datos, puede ser por un error de red o con el servidor. Intente más tarde.',
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

  //Barra de busqueda
    const [ busqueda, setBusqueda ] = useState("")
      //capturar valor a buscar
    const valorBuscar = (e) => {
      setBusqueda(e.target.value)   
  }
      //metodo de filtrado 
  let results = []
   if(!busqueda){
       results = registros
   }else{
        results = registros.filter( (dato) =>
        dato.id_libro_diario_enca.toString().includes(busqueda.toLocaleLowerCase()) 
        )
   };

    
  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [detalleVerMas, setDetalleVerMas] = useState({});

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID LIBRO DIARIO DETALLE",
      selector: (row) => row.id_libro_diario_deta,
      sortable: true,
    },
    {
      name: "ID LIBRO DIARIO ENCABEZADO",
      selector: (row) => row.id_libro_diario_enca,
      sortable: true,
    },
    {
        name: "SUBCUENTA",
        selector: (row) => row.id_subcuenta,
        sortable: true,
    },
    {
        name: "ID ESTADO",
        selector: (row) => row.id_estado,
        sortable: true,
    },
    /*{
        name: "PARCIAL",
        selector: (row) => row.parcial,
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
        name: "TIPO ESTADO",
        selector: (row) => row.tipo_estado,
        sortable: true,
    },
    {
        name: "ID USUARIO",
        selector: (row) => row.id_usuario,
        sortable: true,
    },
    {
        name: "NOMBRE USUARIO",
        selector: (row) => row.nombre_usuario,
        sortable: true,
    },
    {
        name: "SUCURSAL",
        selector: (row) => row.sucursal,
        sortable: true,
    },
    {
        name: "CENTRO COSTO",
        selector: (row) => row.centro_costo,
        sortable: true,
    }*/,
    

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
              setDetalleVerMas(row);
            }}
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
          &nbsp;
          <Link
            to="/" //AQUI
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
              setRegistroDelete(row.id_subcuenta);
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

  return (    
    <div className="container">
      <h3>Detalle Libro Diario</h3>
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
                to="/"  //AQUI
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
              <Link
                to="/"
                type="button"
                className="btn btn-secondary"
                title="?"
              >
                <i className="fa-solid fa-question"></i>
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
              placeholder="Buscar id de encabezado libro diario..."
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

      {/* Ventana Modal de ver más*/}
      <Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">ID: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.id_libro_diario_deta} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">ENCABEZADO: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.id_libro_diario_enca} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">SUBCUENTA: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.id_subcuenta} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">ESTADO: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.tipo_estado} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">PARCIAL: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.parcial} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MONTO EN DEBE: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.monto_debe} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MONTO EN HABER: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.monto_haber} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">SINOPSIS: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.sinopsis} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">SUCURSAL: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.sucursal} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CENTRO COSTO: </p>
            </div>
            <div className="col-sm-6">
              <p> {detalleVerMas.centro_costo} </p>
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

export default MostrarLibroDetalle;