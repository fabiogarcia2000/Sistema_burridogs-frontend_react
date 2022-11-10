import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates"; 


const UrlMostrar =  "http://190.53.243.69:3001/correlativo/getall";
const UrlEliminar = "http://190.53.243.69:3001/correlativo/eliminar/";

const MostrarTalonarioSAR = () => {
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
      alert("ERROR - No se ha podido conectar con el servidor :(");
    }
  };

  //procedimineto para eliminar un registro
  const deleteRegistro = async () => {
    try {
      console.log(registroDelete)
      const res = await axios.delete(`${UrlEliminar}${registroDelete}`);
      getRegistros();
      if (res.status === 200) {
        alert("Eliminado!"); 
      } else {
        alert("ERROR al Eliminar :(");
      }
    } catch (error) {
      console.log(error);
      alert("ERROR - No se ha podido eliminar :(");
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
        dato.id_pos.toString().includes(busqueda.toLocaleLowerCase()) || 
        dato.cai.toLowerCase().includes(busqueda.toLocaleLowerCase())        
        )
   };

    
  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [registroVerMas, setRegistroVerMas] = useState({});

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "POS",
      selector: (row) => row.id_pos,
      sortable: true,
    },
    {
      name: "CAI",
      selector: (row) => row.cai,
      sortable: true,
    },
    {
      name: "SUCURSAL",
      selector: (row) => row.sucursal_sar,
      sortable: true,
    },
    {
      name: "TERMINAL",
      selector: (row) => row.terminal_sar,
      sortable: true,
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.tipo_documento_sar,
      sortable: true,
    },
    {
      name: "CORRELATIVO INICIAL",
      selector: (row) => row.correlativo_inicial,
      sortable: true,
    },
    {
      name: "CORRELATIVO FINAL",
      selector: (row) => row.correlativo_final,
      sortable: true,
    },
    {
      name: "CORRELATIVO ACTUAL",
      selector: (row) => row.correlativo_actual,
      sortable: true,
    },
    {
      name: "FECHA VENCIMIENTO",
      selector: (row) => row.fecha_vencimiento,
      sortable: true,
    },
    {
      name: "SIGUIENTE",
      selector: (row) => row.siguiente,
      sortable: true,
    },
    {
      name: "ESTADO",
      selector: (row) => row.activo === "1"? 'Activo' : 'Inactivo',
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
            }}
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
          &nbsp;
          <Link
            to="/editarTaSAR"
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
              setRegistroDelete(row.id_pos);
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
      <h3>Correlativo</h3>
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
                to="/creartalonarioSAR"
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



{/* Ventana Modal de ver más*/}
<Modal isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>

        <div className="row g-3">
          <div className="col-sm-6">
          <p className="colorText">CAI: </p>
          </div>
          <div className="col-sm-6">
          <p> {registroVerMas.cai} </p>
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

export default MostrarTalonarioSAR;