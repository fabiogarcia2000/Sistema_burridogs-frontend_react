import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripCorta,
  cambiarAMayusculasDescripArticulo,
} from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const UrlMostrarSocios = "http://190.53.243.69:3001/socio_negocio/getall";
const UrlCategorias = "http://190.53.243.69:3001/categoria/getall_active";
const UrlArticulos = "http://190.53.243.69:3001/articulo/getallactiveinv/";
const UrlArticulosCategoria =
  "http://190.53.243.69:3001/articulo/getallbycategoria/";
const isv = 0.15;
const Formulario = () => {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosMostrar, setArticulosMostrar] = useState([]);

  // const [pagoCompartido, setPagoCompartido] = useState(true);

  const [cantidad, setCantidad] = useState(1);
  const [articuloClick, setArticuloClick] = useState({});
  const [articuloEdit, setArticuloEdit] = useState({});
  const [cantidadEdit, setCantidadEdit] = useState(1);
  const [articuloDelete, setArticuloDelete] = useState(0);
  const [listaCompras, setListaCompras] = useState([]);

  const [subTotal, setSubTotal] = useState(0.0);
  const [Impuesto, setImpuesto] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    getCategorias();
    getArticulos();
  }, []);

  //procedimineto para obtener los socios de negocio
  const [socios, setSocios] = useState([]);
  useEffect(() => {
    getSocios();
  }, []);

  //procedimineto para obtener las categorias
  const getCategorias = async () => {
    try {
      const res = await axios.get(UrlCategorias);
      setCategorias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //procedimineto para obtener todos los articulos
  const getArticulos = async () => {
    try {
      const res = await axios.get(UrlArticulos);
      setArticulos(res.data);
      setArticulosMostrar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //procedimineto para obtener los articulos por categoria
  const getArticulosCategoria = async (categoria) => {
    try {
      const res = await axios.get(UrlArticulosCategoria + categoria);
      setArticulos(res.data);
      setArticulosMostrar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //petición a api
  const getSocios = async () => {
    try {
      const res = await axios.get(UrlMostrarSocios);
      setSocios(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  useEffect(() => {
    listaCompras.map((list) =>
      setSubTotal((prevValores) => prevValores + list.total)
    );
  }, [listaCompras]);

  useEffect(() => {
    setImpuesto(subTotal * isv);
  }, [subTotal]);

  useEffect(() => {
    setTotal(subTotal + Impuesto);
  }, [Impuesto, subTotal]);

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "La compra se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo ingresar la compra",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "duplicado":
        Swal.fire({
          text: "Ya existe un artículo con el código ingresado",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      default:
        break;
    }
  };
  const columns = [
    {
      name: "TRANSACCION",
      selector: (row) => row.cod_categoria,
      sortable: true,
    },
    {
      name: "PEDIDO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PRODUCTO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PRECIO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "SUBTOTAL",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "IMPUESTO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "PAGO",
      selector: (row) => row.descripcion,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          secuencia_enc: "",
          id_socio_negocio: "",
          fecha: "",
          referencia: "",
          monto_total: "",
          monto_impuesto_total: "",
          creado_por: "eaplicano",
          fecha_creacion: "2022-11-21",
          modificado_por: "eaplicano",
          fecha_modificacion: "2022-11-21",
          id_usuario: "",
          id_centro_costo: "",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion socio
          if (!valores.id_socio_negocio) {
            errores.id_socio_negocio = "Por favor seleccione una opción";
          }

          // Validacion referencia
          if (!valores.referencia) {
            errores.referencia = "Por favor ingrese una referencia";
          }

          // Validacion monto
          if (!valores.monto_total) {
            errores.monto_total = "Por favor ingrese un monto";
          } else if (!/^^[0-9]+$/.test(valores.monto_total)) {
            errores.monto_total = "El monto solo pueden contener números";
          }

          // Validacion unidad
          if (!valores.unidad) {
            errores.unidad = "Por favor ingrese una unidad";
          }
          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingrese la cantidad";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.cantidad = "La cantidad solo puede contener números";
          }
          // Validacion precio unitario
          if (!valores.preciou) {
            errores.preciou = "Por favor ingrese un precio";
          }

          // Validacion total
          if (!valores.total) {
            errores.total = "Por favor ingrese el total";
          } else if (!/^^[0-9]+$/.test(valores.total)) {
            errores.id = "El total solo puede contener números";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            const res = await axios.put(`${URLCrear}`, valores);
            console.log(res);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarmateriales");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarmateriales");
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <h3 className="mb-3">Nueva orden de compra</h3>
            <hr />
            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="socioCompra" className="form-label">
                    Socio de Negocio:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="socioCompra"
                    name="id_socio_negocio"
                  >
                    <option value="">Seleccionar...</option>
                    {socios.map((item, i) => (
                      <option key={i} value={item.id_socio_negocio}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="fechaCompra" className="form-label">
                    Fecha:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fechaCompra"
                    name="fecha"
                    placeholder="Descripcion del Artículo..."
                  />

                  <ErrorMessage
                    name="fecha"
                    component={() => (
                      <div className="error">{errors.fecha}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="RefCompra" className="form-label">
                    Referencia:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="RefCompra"
                    name="referencia"
                    placeholder="Referencia..."
                  />

                  <ErrorMessage
                    name="referencia"
                    component={() => (
                      <div className="error">{errors.referencia}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Impuesto Total:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="preciou"
                    placeholder="Precio de cada artículo..."
                  />

                  <ErrorMessage
                    name="preciou"
                    component={() => (
                      <div className="error">{errors.precio}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Id Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="total"
                    placeholder="Importe Total..."
                  />

                  <ErrorMessage
                    name="total"
                    component={() => (
                      <div className="error">{errors.total}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Centro de Costo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="total"
                    placeholder="Centro de Costo..."
                  />

                  <ErrorMessage
                    name="total"
                    component={() => (
                      <div className="error">{errors.total}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <hr />
            {/*Mostrar categorias
            <div className="row colorcategorias">
              <div className="col d-grid gap-2 col-3 mx-auto">
                <button
                  className="btn btn-secondary m-1"
                  onClick={() => {
                    getArticulos();
                  }}
                >
                  TODOS
                </button>
              </div>
              {categorias &&
                categorias.map((categ, i) => (
                  <div key={i} className="col d-grid gap-2 col-3 mx-auto">
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => {
                        getArticulosCategoria(categ.id_categoria);
                      }}
                    >
                      {categ.descripcion}
                    </button>
                  </div>
                ))}
            </div>*/}
            <hr />
            {/*Mostrar productos*/}
            <div className="row divCards">
              <br />
              {articulosMostrar &&
                articulosMostrar.map((artic, i) => (
                  <div className="col-sm-4 mb-2" key={i}>
                    <div
                      className="card colorCards"
                      type="button"
                      onClick={() => {
                        {
                          /*abrirModalCantidad();*/
                        }
                        setArticuloClick(artic);
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{artic.descripcion}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {"Código: " + artic.cod_articulo}
                        </h6>
                        <p className="card-text">
                          <span className="badge bg-primary rounded-pill">
                            {"Precio: " + artic.precio}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
            <div className="row">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>TRANSACCION </th>
                    <th>PEDIDO</th>
                    <th>PRODUCTO</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO</th>
                    <th>SUBTOTAL</th>
                    <th>IMPUESTO</th>
                    <th>TOTAL</th>
                    <th>PAGO</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td align="center">1</td>
                    <td>LLEVAR</td>
                    <td>PRODUCTO1</td>
                    <td align="right">1.00</td>
                    <td align="right">60.00</td>
                    <td align="right">60.00</td>
                    <td align="right">9.00</td>
                    <td align="right">69.00</td>
                    <td>EFECTIVO</td>
                  </tr>

                  <tr>
                    <td align="center">1</td>
                    <td>LLEVAR</td>
                    <td>PRODUCTO2</td>
                    <td align="right">1.00</td>
                    <td align="right">70.00</td>
                    <td align="right">70.00</td>
                    <td align="right">10.50</td>
                    <td align="right">80.50</td>
                    <td>EFECTIVO</td>
                  </tr>

                  <tr>
                    <td align="center">1</td>
                    <td>LLEVAR</td>
                    <td>PRODUCTO3</td>
                    <td align="right">1.00</td>
                    <td align="right">50.00</td>
                    <td align="right">50.00</td>
                    <td align="right">7.50</td>
                    <td align="right">57.50</td>
                    <td>EFECTIVO</td>
                  </tr>

                  <tr>
                    <td align="center">1</td>
                    <td>LLEVAR</td>
                    <td>PRODUCTO4</td>
                    <td align="right">1.00</td>
                    <td align="right">70.00</td>
                    <td align="right">70.00</td>
                    <td align="right">10.50</td>
                    <td align="right">80.50</td>
                    <td>EFECTIVO</td>
                  </tr>

                  <tr>
                    <td align="center">1</td>
                    <td>LLEVAR</td>
                    <td>PRODUCTO5</td>
                    <td align="right">2.00</td>
                    <td align="right">60.00</td>
                    <td align="right">120.00</td>
                    <td align="right">18.00</td>
                    <td align="right">138.00</td>
                    <td>EFECTIVO</td>
                  </tr>

                  <tr align="right">
                    <th>TOTALES</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>370.00</th>
                    <th>55.50</th>
                    <th>425.50</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-sm-3">
              <div className="mb-3">
                <label htmlFor="montoCompra" className="form-label">
                  Monto Total:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="montoCompra"
                  name="monto_total"
                  placeholder="Monto a ingresar..."
                  disabled
                />

                <ErrorMessage
                  name="monto_total"
                  component={() => (
                    <div className="error">{errors.monto_total}</div>
                  )}
                />
              </div>
            </div>
            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostraringresomds"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
