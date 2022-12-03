import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcel/Export_Excel";

const UrlMostrar = "http://190.53.243.69:3001/mc_libroencabezado/getallPorPeriodo/1";
const UrlEliminar = "https://jsonplaceholder.typicode.com/comments";
const fechaHoy = "2022-02-01"

const objeto = "FORM_LIBRO_ENCABEZADO"

const MostrarLibroDetalle = () => {
  const navigate = useNavigate();

  const [opcionSelect, setOpcionSelect] = useState('');

  //Configurar los hooks
  const [registroDelete, setRegistroDelete] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
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

  const ValidarFecha = () => {

  }


//************************************************/
//petición a api con la opción del select
const getPediodoSelect = async () => {
  try {
    const res = await axios.get(UrlMostrar+opcionSelect);
    setRegistros(res.data);
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};

//opción seleccionada en el select
const  handlerCargarPerido = function (e) {
  const opcion = e.target.value;
  setOpcionSelect(opcion)
}

useEffect(() => {
  if(opcionSelect !== ""){
    getPediodoSelect();
  }
}, [opcionSelect]);

//************************************************/


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
          text: "El encabezado de libro diario se eliminó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el encabezado de libro diario',
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
        case 'periodocerrado':
        Swal.fire({
          text: 'Periodo Cerrado',
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
        RegistroEnVitacora(permisos[0].id_objeto, "ELIMINAR", "ELIMINAR LIBRO DIARIO ENCABEZADO");
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
      dato.id_libro_diario_enca.toString().includes(busqueda.toLocaleLowerCase())
    )
  };


  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);
  const [encabezadoVerMas, setEncabezadoVerMas] = useState({});

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
    /*{
      name: "PERIODO CONTABLE",
      selector: (row) => row.id_periodo_contable,
      sortable: true,
    },*/
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
          <Link
            type="button"
            className="btn btn-light"
            title="Ver Más..."
            onClick={() => {
              abrirModalVerMas();
              setEncabezadoVerMas(row);
              RegistroEnVitacora(permisos[0].id_objeto, "LECTURA", "MOSTRAR MAS LIBRO DIARIO ENCABEZADO");
            }}
          >
            <i className="bi bi-eye-fill"></i>
          </Link>
          &nbsp;
          <button
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => {
              if(row.fecha_final < fechaHoy){
                mostrarAlertas("periodocerrado");
              }else{
                navigate(`/admin/mostrarlibrodetalle/${row.id_libro_diario_enca}`)
              }
              
              if(permisos[0].permiso_actualizacion){
                setGlobalState("registroEdit", row);
                navigate("/admin/editarlibrodetalle")
              }else{
                mostrarAlertas("/admin/CrearLibroEncabezado");
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
                setRegistroDelete(row.id_libro_diario_enca);
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

  return (
    <div className="container">
      <h3>Libro Diario</h3>
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
                //AQUI
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
                onClick={() => {
                  if(permisos[0].permiso_insercion){
                    navigate("/admin/CrearLibroEncabezado") 
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
                  RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR EXCEL LIBRO DIARIO ENCABEZADO");
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
                  RegistroEnVitacora(permisos[0].id_objeto, "EXPORTAR", "EXPORTAR PDF LIBRO DIARIO ENCABEZADO");
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
       <p className="text-center text-danger">Lo siento, no tienes permisos para realizar esta acción.</p>
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

    </div>
  );
};

export default MostrarLibroDetalle;