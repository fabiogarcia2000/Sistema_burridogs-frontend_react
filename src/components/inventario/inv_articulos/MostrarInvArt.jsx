import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import { Export_Excel } from "./generarExcel/Export_Excel";
import { Export_PDF } from "./generarPDF/Export_PDF";

const UrlMostrar = "http://190.53.243.69:3001/articulo/getallporbodega";
const UrlMostrarArtBod =
  "http://190.53.243.69:3001/articulo/movimientosporarticulo/";

const MostrarInvArticulos = () => {
  //Configurar los hooks
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
    setHay(false);
  }, []);

  const [listaCompras, setListaCompras] = useState([]);
  const [hay, setHay] = useState(false);
  const [articuloClick, setArticuloClick] = useState({});
  const [cantidad, setCantidad] = useState(1);

  //agregar articulos a la lista
  const agregarArticulos = () => {
    if (
      !listaCompras.find(
        (list) => list.cod_centro_costo === articuloClick.cod_articulo
      )
    ) {
      setListaCompras([
        ...listaCompras,
        {
          id: articuloClick.cod_articulo,
          porc: articuloClick.descripcion_articulo,
          cod: articuloClick.cod_centro_costo,
          desc: articuloClick.descripcion_centro_costo,
          cant: cantidad,
        },
      ]);
    }
  };

  //procedimineto para obtener las unidades de medida
  const [articulos, setUnidades] = useState([]);
  useEffect(() => {
    getUnidades();
  }, []);

  //petición a api
  const getUnidades = async () => {
    try {
      const res = await axios.get(UrlMostrarArtBod);
      setUnidades(res.data);
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
  const [registroVerMas, setRegistroVerMas] = useState({});

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

    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <div className="btn-group me-2" role="group" aria-label="First group">
            <Link
              type="button"
              className="btn btn-primary"
              title="Ver Movimientos..."
              onClick={() => {
                agregarArticulos();
                abrirModalVerMas();
              }}
            >
              <i className="fa-solid fa-plus"></i> Ver Movimientos
            </Link>
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "200px",
    },
  ];

  //Configuramos las columnas de la tabla
  const columns2 = [
    {
      name: "FECHA",
      selector: (row) => row.cod_articulo,
      sortable: true,
      maxWidth: "160px", //ancho de la columna
    },

    {
      name: "TIPO",
      selector: (row) => row.cod_centro_costo,
      sortable: true,
      maxWidth: "450px",
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.en_mano,
      sortable: true,
      maxWidth: "120px",
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
              <Link
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={() => {
                  Export_Excel(results);
                }}
              >
                <i className="fa-solid fa-file-excel"></i>
              </Link>
              <Link
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={() => {
                  Export_PDF(results);
                }}
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
        <ModalHeader toggle={abrirModalVerMas}>Movimientos</ModalHeader>
        <ModalBody>
          <div className="row">
            <DataTable
              columns={columns2}
              data={results}
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
