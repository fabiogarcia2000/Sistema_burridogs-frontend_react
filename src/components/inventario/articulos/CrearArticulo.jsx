import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripCorta,
  cambiarAMayusculasDescripArticulo,
  cambiarAMayusculasDescripcion,
} from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/articulo/actualizar-insertar/";
const URLMostrarUno = "http://190.53.243.69:3001/articulo/getone/";

const Formulario = () => {
  const navigate = useNavigate();

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
          cod_articulo: "",
          tipo: "",
          descripcion: "",
          descripcion_corta: "",
          id_impuesto: "",
          id_categoria: "",
          precio: "",
          id_unidad_venta: "",
          id_socio_negocio: "",
          id_unidad_compra: "",
          codigo_barra: "",
          id_unidad_medida: "",
          activo: "1",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/11/05",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.cod_articulo) {
            errores.cod_articulo = "Por favor ingresa un código";
          }

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor ingresa el tipo";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Ingrese una descripción para el artículo";
          }

          // Validacion descripción corta
          if (!valores.descripcion_corta) {
            errores.descripcion_corta =
              "Por favor ingresa una descripción corta";
          }

          // Validacion impuesto
          if (!valores.id_impuesto) {
            errores.id_impuesto = "Por favor ingrese un impuesto";
          }

          // Validacion categoría
          if (!valores.id_categoria) {
            errores.id_categoria = "Por favor ingresa la categoría";
          }

          // Validacion precio
          if (!valores.precio) {
            errores.precio = "Por favor ingrese el precio";
          } else if (!/^^[0-9]+$/.test(valores.precio)) {
            errores.precio = "El precio solo puede contener números";
          }

          // Validacion unidad de venta
          if (!valores.id_unidad_venta) {
            errores.id_unidad_venta = "Por favor ingrese id unidad venta";
          } else if (!/^^[0-9]+$/.test(valores.id_unidad_venta)) {
            errores.id_unidad_venta =
              "Las unidades de venta solo puede contener números";
          }

          // Validacion socio negocio
          if (!valores.id_socio_negocio) {
            errores.id_socio_negocio = "Por favor ingrese el id socio negocio";
          }

          // Validacion unidad de compra
          if (!valores.id_unidad_compra) {
            errores.id_unidad_compra = "Por favor ingrese el id unidad compra";
          }

          // Validacion código de barra
          if (!valores.codigo_barra) {
            errores.codigo_barra = "Por favor ingresa el código de barra";
          } else if (!/^^[0-9]+$/.test(valores.codigo_barra)) {
            errores.codigo_barra =
              "El código de barra solo puede contener números";
          }

          // Validacion unidad medida
          if (!valores.id_unidad_medida) {
            errores.id_unidad_medida = "Por favor ingrese el id unidad medida";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingresa un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            const res = await axios.get(
              `${URLMostrarUno}${valores.cod_articulo}`
            );
            console.log(res);
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista
              const res = await axios.put(
                `${URLCrear}${valores.cod_articulo}`,
                valores
              );
              if (res.status === 200) {
                mostrarAlertas("guardado");
                navigate("/mostrararticulos");
              } else {
                mostrarAlertas("error");
              }
            } else {
              mostrarAlertas("duplicado");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrararticulos");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Artículo</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codArticulo" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codArticulo"
                    name="cod_articulo"
                    placeholder="Código del Artículo..."
                  />

                  <ErrorMessage
                    name="cod_articulo"
                    component={() => (
                      <div className="error">{errors.cod_articulo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="tipoArticulo" className="form-label">
                    Tipo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="tipoArticulo"
                    name="tipo"
                    placeholder="Tipo de artículo..."
                  />

                  <ErrorMessage
                    name="tipo"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcionArticulo" className="form-label">
                    Descripción del Articulo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionArticulo"
                    name="descripcion"
                    placeholder="Descripción..."
                    onKeyUp={cambiarAMayusculasDescripcion(values)}
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcortaArticulo" className="form-label">
                    Descripción corta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcortaArticulo"
                    name="descripcion_corta"
                    placeholder="Descripción corta..."
                    onKeyUp={cambiarAMayusculasDescripCorta(values)}
                  />

                  <ErrorMessage
                    name="descripcion_corta"
                    component={() => (
                      <div className="error">{errors.descripcion_corta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="impuestoArticulo" className="form-label">
                    ID Impuesto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="impuestoArticulo"
                    name="id_impuesto"
                    placeholder="Impuesto..."
                  />

                  <ErrorMessage
                    name="id_impuesto"
                    component={() => (
                      <div className="error">{errors.id_impuesto}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="categoriaArticulo" className="form-label">
                    ID Categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="categoriaArticulo"
                    name="id_categoria"
                    placeholder="Categoría del artículo..."
                  />

                  <ErrorMessage
                    name="id_categoria"
                    component={() => (
                      <div className="error">{errors.id_categoria}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="precioArticulo" className="form-label">
                    Precio:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="precioArticulo"
                    name="precio"
                    placeholder="Precio de venta..."
                  />

                  <ErrorMessage
                    name="precio"
                    component={() => (
                      <div className="error">{errors.precio}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadventaArticulo" className="form-label">
                    ID Unidad Venta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadventaArticulo"
                    name="id_unidad_venta"
                    placeholder="ID Unidad Venta.."
                  />

                  <ErrorMessage
                    name="id_unidad_venta"
                    component={() => (
                      <div className="error">{errors.id_unidad_venta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="socionegocioArticulo" className="form-label">
                    ID Socio Negocio:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="socionegocioArticulo"
                    name="id_socio_negocio"
                    placeholder="ID Socio de Negocio..."
                  />

                  <ErrorMessage
                    name="id_socio_negocio"
                    component={() => (
                      <div className="error">{errors.id_socio_negocio}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadcompraArticulo" className="form-label">
                    ID Unidad Compra:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadcompraArticulo"
                    name="id_unidad_compra"
                    placeholder="ID Unidad Compra..."
                  />

                  <ErrorMessage
                    name="id_unidad_compra"
                    component={() => (
                      <div className="error">{errors.id_unidad_compra}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codigobarraArticulo" className="form-label">
                    Código de Barra:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigobarraArticulo"
                    name="codigo_barra"
                    placeholder="Código de Barra..."
                  />

                  <ErrorMessage
                    name="codigo_barra"
                    component={() => (
                      <div className="error">{errors.codigo_barra}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadmedidaArticulo" className="form-label">
                    ID Unidad Medida:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadmedidaArticulo"
                    name="id_unidad_medida"
                    placeholder="ID Unidad Medida..."
                  />

                  <ErrorMessage
                    name="id_unidad_medida"
                    component={() => (
                      <div className="error">{errors.id_unidad_medida}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="estadoArticulo" className="form-label">
                    Estado:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="estadoArticulo"
                    name="activo"
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </Field>

                  <ErrorMessage
                    name="activo"
                    component={() => (
                      <div className="error">{errors.activo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrararticulos"
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
