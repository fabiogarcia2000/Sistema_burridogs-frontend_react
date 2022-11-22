import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripCorta,
  cambiarAMayusculasDescripArticulo,
} from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const UrlMostrarSocios = "http://190.53.243.69:3001/socio_negocio/getall";

const Formulario = () => {
  const navigate = useNavigate();

  //procedimineto para obtener los socios de negocio
  const [socios, setSocios] = useState([]);
  useEffect(() => {
    getSocios();
  }, []);

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

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "El artículo se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el nuevo artículo",
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
              navigate("/mostrarmateriales");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrarmateriales");
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
                  <label htmlFor="montoCompra" className="form-label">
                    Monto Total:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="montoCompra"
                    name="monto_total"
                    placeholder="Monto a ingresar..."
                  />

                  <ErrorMessage
                    name="monto_total"
                    component={() => (
                      <div className="error">{errors.monto_total}</div>
                    )}
                  />
                </div>
              </div>
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

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostraringresomds"
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
