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
const URLMostrarUno = "http://190.53.243.69:3001/articulo/getone/";

const UrlMostrarUnidades = "http://190.53.243.69:3001/unidad_medida/getall/";
const UrlMostrarCategorias = "http://190.53.243.69:3001/categoria/getall/";
const UrlMostrarImpuestos = "http://190.53.243.69:3001/impuesto/getall/";
const UrlMostrarSocios = "http://190.53.243.69:3001/socio_negocio/getall";

const Formulario = () => {
  const navigate = useNavigate();

  //procedimineto para obtener las unidades de medida
  const [unidades, setUnidades] = useState([]);
  useEffect(() => {
    getUnidades();
  }, []);

  //petición a api
  const getUnidades = async () => {
    try {
      const res = await axios.get(UrlMostrarUnidades);
      setUnidades(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener las categorias
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    getCategorias();
  }, []);

  //petición a api
  const getCategorias = async () => {
    try {
      const res = await axios.get(UrlMostrarCategorias);
      setCategorias(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener las categorias
  const [impuestos, setImpuestos] = useState([]);
  useEffect(() => {
    getImpuestos();
  }, []);

  //petición a api
  const getImpuestos = async () => {
    try {
      const res = await axios.get(UrlMostrarImpuestos);
      setImpuestos(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

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
          cod_articulo: "",
          tipo: "",
          descripcion_articulo: "",
          descripcion_corta: "",
          id_impuesto: "",
          //descripcion_impuesto: "",
          id_categoria: "",
          //descripcion_categoria: "",
          precio: "",
          //id_unidad_venta: "",
          //descripcion_unidad_venta: "",
          id_socio_negocio: "",
          //descripcion_socio_negocio: "",
          //id_unidad_compra: "",
          //descripcion_unidad_compra: "",
          codigo_barra: "",
          id_unidad_medida: "",
          //descripcion_unidad_medida: "",
          activo: "",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/11/05",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.cod_articulo) {
            errores.cod_articulo = "Por favor ingrese un código";
          }

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor seleccione una opción";
          }

          // Validacion descripción articulo
          if (!valores.descripcion_articulo) {
            errores.descripcion_articulo =
              "Por favor ingrese una descripción para el artículo";
          }

          // Validacion descripción corta
          if (!valores.descripcion_corta) {
            errores.descripcion_corta =
              "Por favor ingrese una descripción corta";
          }

          // Validacion impuesto
          if (!valores.id_impuesto) {
            errores.id_impuesto = "Por favor seleccione una opción";
          }

          // Validacion categoria
          if (!valores.id_categoria) {
            errores.id_categoria = "Por favor seleccione una opción";
          }

          // Validacion precio
          if (!valores.precio) {
            errores.precio = "Por favor ingrese el precio";
          } else if (!/^^[0-9]+$/.test(valores.precio)) {
            errores.precio = "El precio solo puede contener números";
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
            errores.id_unidad_medida = "Por favor seleccione una opción";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione una opción";
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
                navigate("/admin/mostrararticulos");
              } else {
                mostrarAlertas("error");
              }
            } else {
              mostrarAlertas("duplicado");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrararticulos");
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
                    as="select"
                    className="form-select"
                    id="tipoArticulo"
                    name="tipo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="V">Venta</option>
                    <option value="I">Inventario</option>
                  </Field>

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
                    name="descripcion_articulo"
                    placeholder="Descripción..."
                    onKeyUp={cambiarAMayusculasDescripArticulo(values)}
                  />

                  <ErrorMessage
                    name="descripcion_articulo"
                    component={() => (
                      <div className="error">{errors.descripcion_articulo}</div>
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
                    Impuesto:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="impuestoArticulo"
                    name="id_impuesto"
                  >
                    <option value="">Seleccionar...</option>
                    {impuestos.map((item, i) => (
                      <option key={i} value={item.id_impuesto}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>

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
                    Categoría:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="categoriaArticulo"
                    name="id_categoria"
                  >
                    <option value="">Seleccionar...</option>
                    {categorias.map((item, i) => (
                      <option key={i} value={item.id_categoria}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>

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
                    as="select"
                    className="form-select"
                    id="unidadmedidaArticulo"
                    name="id_unidad_medida"
                  >
                    <option value="">Seleccionar...</option>
                    {unidades.map((item, i) => (
                      <option key={i} value={item.id_unidad_medida}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>

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
                    <option value="">Seleccionar...</option>
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
              to="/admin/mostrararticulos"
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
