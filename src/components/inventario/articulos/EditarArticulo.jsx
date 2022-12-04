import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripCorta,
  cambiarAMayusculasDescripArticulo,
  cambiarAMayusculasDescripcion,
} from "../../../utils/cambiarAMayusculas";
import { InsertarBitacora } from "../../seguridad/bitacora/InsertarBitacora";
import { getCurrentDateShort } from "../../../utils/fechaYhora"

const URLEditar = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const UrlMostrarUnidades = "http://190.53.243.69:3001/unidad_medida/getall/";
const UrlMostrarCategorias = "http://190.53.243.69:3001/categoria/getall/";
const UrlMostrarImpuestos = "http://190.53.243.69:3001/impuesto/getall/";
const UrlMostrarSocios = "http://190.53.243.69:3001/socio_negocio/getall";

const objeto = "FORM_ARTICULO";

const FormularioEditar = () => {
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();

  const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser;


  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true);

  const Permisos = () => {
    const newData = temp.filter((item) => item.objeto === objeto);
    setPermisos(newData);
  };

  useEffect(() => {
    let data = localStorage.getItem("permisos");
    if (data) {
      setTemp(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);

  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);

  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar);
  };
  /*******************/

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
          text: "Los cambios se guardaron con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudieron guardar los cambios",
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
      <Formik
        //valores iniciales
        initialValues={{
          cod_articulo: edit.cod_articulo,
          tipo: edit.tipo,
          descripcion_articulo: edit.descripcion_articulo,
          descripcion_corta: edit.descripcion_corta,
          id_impuesto: edit.id_impuesto,
          id_categoria: edit.id_categoria,
          precio: edit.precio,
          inventario_minimo: edit.inventario_minimo,
          inventario_maximo: edit.inventario_maximo,
          //id_unidad_venta: edit.id_unidad_venta,
          //id_unidad_compra: edit.id_unidad_compra,
          codigo_barra: edit.codigo_barra,
          id_unidad_medida: edit.id_unidad_medida,
          activo: edit.activo,
          modificado_por: usuario,
          fecha_modificacion: fecha,
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
            errores.precio = "Por favor ingresa un precio";
          } else if (!/^^\d*\.\d+$/.test(valores.precio)) {
            errores.precio = "Solo números";
          } else if (!/^^[0-9-.]+$/.test(valores.precio)) {
            errores.precio = "Solo números";
          }
          // Validacion inventario minimo
          if (!valores.inventario_minimo) {
            errores.inventario_minimo = "Por favor ingresa una cantidad mínima";
          } else if (!/^^\d*\.\d+$/.test(valores.inventario_minimo)) {
            errores.inventario_minimo = "Solo números";
          } else if (!/^^[0-9-.]+$/.test(valores.inventario_minimo)) {
            errores.inventario_minimo = "Solo números";
          }
          // Validacion inventario maximo
          if (!valores.inventario_maximo) {
            errores.inventario_maximo = "Por favor ingresa una cantidad máxima";
          } else if (!/^^\d*\.\d+$/.test(valores.inventario_maximo)) {
            errores.inventario_maximo = "Solo números";
          } else if (!/^^[0-9-.]+$/.test(valores.inventario_maximo)) {
            errores.inventario_maximo = "Solo números";
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
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(
              `${URLEditar}${valores.cod_articulo}`,
              valores
            );

            if (res.status === 200) {
              mostrarAlertas("guardado");
              InsertarBitacora(
                permisos[0].id_objeto,
                "EDITAR",
                "EDITAR ARTICULO"
              );
              navigate("/admin/mostrararticulos");
            } else {
              mostrarAlertas("error");
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
            <h3 className="mb-3">Editar Artículo</h3>
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
                  <label htmlFor="invMinArticulo" className="form-label">
                    Inventario Mínimo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="invMinArticulo"
                    name="inventario_minimo"
                    placeholder="Unidades mínimas..."
                  />

                  <ErrorMessage
                    name="inventario_minimo"
                    component={() => (
                      <div className="error">{errors.inventario_minimo}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="invMaxArticulo" className="form-label">
                    Inventario Máximo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="invMaxArticulo"
                    name="inventario_maximo"
                    placeholder="Unidades máximas..."
                  />

                  <ErrorMessage
                    name="inventario_maximo"
                    component={() => (
                      <div className="error">{errors.inventario_maximo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
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

export default FormularioEditar;
