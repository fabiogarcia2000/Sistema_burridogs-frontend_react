import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Export_PDF } from "./generarPDF/Export_PDF";
import { Export_Excel } from "./generarExcell/Export_Excel";
import Factura from "./facturaA4/Factura";
import Swal from "sweetalert2";

const UrlEncabezado = "http://190.53.243.69:3001/compras/compras_por_fecha/";
const UrlDetalles = "http://190.53.243.69:3001/compras/detalle_por_encabezado/";
const UrlAnular ="http://190.53.243.69:3001/compras/anular/";

const ReporteCompraFecha = () => {
  const componenteRef = useRef();

  const [registroDelete, setRegistroDelete] = useState('');
  const [encabezado, setEncabezado] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [datos, setDatos] = useState([]);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);

  //procedimineto para obtener los detalles
  const getDetalles = async (id) => {
    try {
      const res = await axios.get(UrlDetalles + id);
      setDetalles(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

   //procedimineto para anular una compra
   const getEncabezados = async () => {
    try {
      console.log(datos);
      const res = await axios.post(UrlEncabezado, datos);
      setEncabezado(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  useEffect(() => {
    getEncabezados();
  }, [datos]);


    //Para generar factura/imprimir
    const handlePrint = useReactToPrint({
      content: () => componenteRef.current,
      documentTitle: "Factura",
      onAfterPrint: () => console.log("Listo"),
    });
  

  //Barra de busqueda
  const [busqueda, setBusqueda] = useState("");
  //capturar valor a buscar
  const valorBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  //metodo de filtrado
  let results = [];
  if (!busqueda) {
    results = encabezado;
  } else {
    results = encabezado.filter(
      (dato) =>
        dato.nombre_cliente
          .toLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        dato.cod_socio_negocio.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
        dato.descripcion_socio_negocio.toString().includes(busqueda.toLocaleLowerCase()) ||
        dato.monto_total.toString().includes(busqueda.toLocaleLowerCase())
    );
  }

   //Ventana modal de confirmación de eliminar
   const [modalEliminar, setModalEliminar] = useState(false);
   const abrirModalEliminar = () => setModalEliminar(!modalEliminar);
  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "BODEGA",
      selector: (row) => row.cod_centro_costo,
      sortable: true,
    },
   {
      name: "CODIGO PROVEEDOR",
      selector: (row) => row.cod_socio_negocio,
      sortable: true,
    },
    {
      name: "PROVEEDOR",
      selector: (row) => row.descripcion_socio_negocio,
      sortable: true,
    },
    {
      name: "TIPO",
      selector: (row) => row.referencia,
      sortable: true,
    },
      {
          name: "DESCRIPCIÓN",
          selector: (row) => row.descripcion_centro_costo,
          sortable: true,
      },
      {
        name: "MONTO IMPUESTO",
        selector: (row) => row.monto_impuesto_total,
        sortable: true,
      },
      {
        name: "MONTO TOTAL",
        selector: (row) => row.monto_total,
        sortable: true,
      },
      {
          name: "ESTADO",
          selector: (row) => row.descripcion_estado,
          sortable: true,
      },
      {
        name: "VER MÁS...",
        cell: (row) => (
          <>
            <Link
              to="#"
              type="button"
              className="btn btn-light"
              title="Ver Más..."
              onClick={() => {
                getDetalles(row.secuencia_enc);
                abrirModalVerMas();
              }}
            >
              <i className="bi bi-eye-fill"></i>
            </Link>
            &nbsp;
            <button
              className="btn btn-light"
              title="Anular"
              onClick={() => {
              setRegistroDelete(row.secuencia_enc);
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

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "error":
        Swal.fire({
          title: "Error",
          text: "No se realizo la consulta",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case 'anulado':
      Swal.fire({
        title: '¡anulado!',
        text: "Se anulo con éxito",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });

    break;
    case 'error':
      Swal.fire({
        title: 'Error',
        text:  'No se pudo anular',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
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
      const res = await axios.post(`${UrlAnular}${registroDelete}`);
      //getDetalles();
      if (res.status === 200) {
        getEncabezados()
         mostrarAlertas("eliminado"); 
      } else {
        mostrarAlertas("error");
      }
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
    }
  };

  return (
    <div className="container">
      <h3>Reporte de Compra por Fecha</h3>
      <br />

      <div className="row">
        <Formik
          //valores iniciales
          initialValues={{
            fecha_inicial: "",
            fecha_final: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion de código
            if (!valores.fecha_inicial) {
              errores.fecha_inicial = "Seleccione una fecha";
            }

            // Validacion descripción
            if (!valores.fecha_final) {
              errores.fecha_final = "Seleccione una fecha";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            setDatos(valores)
            //getEncabezados(valores)
          }}
        >
          {({ errors, values }) => (
            <Form>
              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="inicio" className="form-label">
                      Fecha Inicio:
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="inicio"
                      name="fecha_inicial"
                    />

                    <ErrorMessage
                      name="fecha_inicial"
                      component={() => (
                        <div className="error">{errors.fecha_inicial}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="final" className="form-label">
                      Fecha Final:
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="final"
                      name="fecha_final"
                    />

                    <ErrorMessage
                      name="fecha_final"
                      component={() => (
                        <div className="error">{errors.fecha_final}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4 bottom-aligned">
                  <button className="btn btn-primary mb-3 me-2" type="submit">
                    Consultar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <hr />

      <div className="row">
        {/*Mostrar la barra de busqueda*/}
        <div className="col-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
            <Button
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={()=>{
                  Export_Excel(results);
                }}
              >
               <i className="bi bi-file-earmark-excel-fill"></i>
              </Button>
              <Button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
                onClick={()=>{
                  Export_PDF(results);
                }}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Button>
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
              <p className="colorText">FACTURA: </p>
            </div>
            <div className="col-sm-6">
              <p> {(detalles.referencia||"")} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">CODIGO: </p>
            </div>
            <div className="col-sm-6">
              <p> {(detalles.cod_socio_negocio||"")} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE CREACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {(detalles.fecha_creacion||"")} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">MODIFICADO POR: </p>
            </div>
            <div className="col-sm-6">
              <p> {(detalles.modificado_por||"")} </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="colorText">FECHA DE MODIFICACIÓN: </p>
            </div>
            <div className="col-sm-6">
              <p> {(detalles.fecha_modificacion||"")} </p>
            </div>
            </div>

              {/** 
              <div ref={componenteRef} className="imprimir">
                 <Factura />
              </div> */}
          
          </ModalBody>
          <ModalFooter>
          {/**<Button
            color="primary"
            onClick={() => {
              //handlePrint();
              abrirModalVerMas();
            }}
          >
            Imprimir Factura
          </Button> */}
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
          </Modal>

          {/* Ventana Modal de Eliminar*/}
          <Modal isOpen={modalEliminar} toggle={abrirModalEliminar} centered>
          <ModalHeader toggle={abrirModalEliminar}>Anular Registro</ModalHeader>
          <ModalBody>
            <p>¿Está seguro de Anular este Registro?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
              deleteRegistro();
              abrirModalEliminar();
            }}
            >
              Anular
            </Button>
            <Button color="secondary" onClick={abrirModalEliminar}>
              Cancelar
            </Button>
          </ModalFooter>
          </Modal>
         

    </div>
  );
};

export default ReporteCompraFecha;
