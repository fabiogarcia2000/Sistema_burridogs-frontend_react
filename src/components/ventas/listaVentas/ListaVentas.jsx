import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import Factura from "../facturaA4/Factura";

import Swal from "sweetalert2";

const UrlEncabezado = "http://190.53.243.69:3001/venta/venta_por_fecha/";
const UrlDetalles = "http://190.53.243.69:3001/venta/detalle_por_encabezado/";

const VentaResumen = () => {
  const componenteRef = useRef();

  const [encabezado, setEncabezado] = useState([]);
  const [datosEncabezado, setDatosEncabezado] = useState([]);
  const [detalles, setDetalles] = useState([]);


    const [totalDesc, setTotalDesc] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [totalIsv, setTotalIsv] = useState(0);
    const [totalPagar, setTotalPagar] = useState(0);

  //Ventana modal para mostrar mas
  const [modalVerMas, setVerMas] = useState(false);
  const abrirModalVerMas = () => setVerMas(!modalVerMas);

  //procedimineto para obtener los detalles
  const getDetalles = async (id) => {
    try {
      const res = await axios.get(UrlDetalles + id);
      setDetalles(res.data.detalle);
      setDatosEncabezado(res.data)
      setGlobalState("dataVenta", res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  useEffect(() => {
    setTotalDesc(0)
    setSubTotal(0)
    setTotalIsv(0)
    

    if(detalles){
        
        detalles.map((list) =>
        setTotalDesc((prevValores) => prevValores + (parseFloat(list.monto_descuento || 0)))
        );

        detalles.map((item) =>
        setSubTotal((prevValores) => prevValores + ((parseFloat(item.cantidad)*parseFloat(item.precio))-(parseFloat(item.monto_descuento)||0)))
        );

        detalles.map((list) =>
        setTotalIsv((prevValores) => prevValores + (parseFloat(list.total_impuesto || 0)))
        );

      
    }
}, [detalles]);

useEffect(() => {
  setTotalPagar(subTotal+totalIsv)
}, [totalIsv]);

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
        dato.rtn.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
        dato.venta_total.toString().includes(busqueda.toLocaleLowerCase()) ||
        dato.correlativo.toString().includes(busqueda.toLocaleLowerCase())
    );
  }

  //Para generar factura/imprimir
  const handlePrint = useReactToPrint({
    content: () => componenteRef.current,
    documentTitle: "Factura",
    onAfterPrint: () => console.log("Listo"),
  });

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "CLIENTE",
      selector: (row) => row.nombre_cliente,
      sortable: true,
    },
    {
      name: "RTN",
      selector: (row) => row.rtn,
      sortable: true,
    },
    {
      name: "VENTA TOTAL",
      selector: (row) => row.venta_total,
      sortable: true,
    },
    {
      name: "FACTURA",
      selector: (row) => row.correlativo,
      sortable: true,
    },
    {
      name: "VENDEDOR",
      selector: (row) => row.usuario,
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

      default:
        break;
    }
  };

  return (
    <div className="container">
      <h3>Consultar Ventas</h3>
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
            try {
              console.log(valores);
              const res = await axios.post(UrlEncabezado, valores);
              setEncabezado(res.data);
              console.log(res);
            } catch (error) {
              console.log(error);
              mostrarAlertas("errormostrar");
            }
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
      <Modal size="lg" isOpen={modalVerMas} toggle={abrirModalVerMas} centered>
        <ModalHeader toggle={abrirModalVerMas}>Detalles</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col">
                  <p><strong>FECHA: </strong>{(datosEncabezado.fecha || "")}</p>
                </div>
            </div>
            <div className="row">
              <div className="col">
                  <p><strong>TERMINAL: </strong>{(datosEncabezado.descripcion_pos || "")}</p>
                </div>
                <div className="col">
                  <p><strong>USUARIO: </strong>{(datosEncabezado.nombre_usuario || "")}</p>
                </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <p><strong>CLIENTE: </strong>{(datosEncabezado.nombre_cliente || "")}</p>
              </div>
              <div className="col">
                <p><strong>R.T.N: </strong>{(datosEncabezado.rtn || "")}</p>
              </div>
            </div>

            <div className='row regul'>
            <table class="table table-sm table-bordered border-dark table-responsive">
                <thead class="color1 border-dark">
                <tr>
                    <th scope="col">CANT.</th>
                    <th scope="col">DESC.</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">DESCUENTOS</th>
                    <th scope="col">TOTAL</th>
                </tr>
                </thead>
                <tbody>
                    {detalles && 
                        detalles.map((item, i) =>(
                            <tr key={i}>
                                <td>{item.cantidad}</td>
                                <td>{item.descripcion_articulo}</td>
                                <td>{"L. "+item.precio}</td>
                                <td>{"L. "+(item.monto_descuento ||0)}</td>
                                <td>{"L. "+((parseFloat(item.precio)*parseFloat(item.cantidad))-(parseFloat(item.monto_descuento)||0))}</td>
                             </tr>
                        ))

                    }


                <tr>                    
                    <td  className='text-end' colspan="3"><strong>SubTotal</strong></td>
                    <td><strong>{"L. "+totalDesc}</strong></td>
                    <td><strong>{"L. "+subTotal}</strong></td>
                </tr>
                <tr>                    
                    <td  className='text-end' colspan="4"><strong>I.S.V</strong></td>
                    <td><strong>{"L. "+datosEncabezado.impuesto_15}</strong></td>
                </tr>
                <tr>                    
                    <td  className='text-end' colspan="4"><strong>TOTAL PAGADO: </strong></td>
                    <td><strong>{"L. "+datosEncabezado.venta_total}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>


          </div>
          {/**FACTURA**/}
          <div ref={componenteRef} className="imprimir">
            <Factura />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handlePrint();
              abrirModalVerMas();
            }}
          >
            Imprimir Factura
          </Button>
          <Button color="secondary" onClick={abrirModalVerMas}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VentaResumen;
