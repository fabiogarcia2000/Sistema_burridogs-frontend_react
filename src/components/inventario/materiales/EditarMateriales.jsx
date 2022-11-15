import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";

const URLEditar =
  "http://190.53.243.69:3001/lista_materiales/actualizar-insertar/";

const UrlMostrarArticulos = "http://190.53.243.69:3001/articulo/getall";

const FormularioEditar = () => {
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();

  //procedimineto para obtener las unidades de medida
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
    getArticulos();
  }, []);

  //petición a api
  const getArticulos = async () => {
    try {
      const res = await axios.get(UrlMostrarArticulos);
      setArticulos(res.data);
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
          id_articulo_padre: edit.id_articulo_padre,
          id_articulo_hijo: edit.id_articulo_hijo,
          cantidad: edit.cantidad,
          comentario: edit.comentario,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id padre
          if (!valores.id_articulo_padre) {
            errores.id_articulo_padre = "Por favor seleccione una opción";
          }

          // Validacion id hijo
          if (!valores.id_articulo_hijo) {
            errores.id_articulo_hijo = "Por favor seleccione una opción";
          }

          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingrese una cantidad";
          }

          // Validacion comentario
          if (!valores.comentario) {
            errores.comentario = "Por favor ingrese una comentario";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}`, valores);

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
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Material</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codPdMaterial" className="form-label">
                    Artículo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="codPdMaterial"
                    name="id_articulo_padre"
                  >
                    <option value="">Seleccionar...</option>
                    {articulos.map((item, i) => (
                      <option key={i} value={item.id_articulo}>
                        {item.descripcion_corta}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_articulo_padre"
                    component={() => (
                      <div className="error">{errors.id_articulo_padre}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codHjArticulo" className="form-label">
                    Material:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="codHjArticulo"
                    name="id_articulo_hijo"
                  >
                    <option value="">Seleccionar...</option>
                    {articulos.map((item, i) => (
                      <option key={i} value={item.id_articulo}>
                        {item.descripcion_corta}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_articulo_hijo"
                    component={() => (
                      <div className="error">{errors.id_articulo_hijo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cantidadArticulo" className="form-label">
                    Cantidad:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cantidadArticulo"
                    name="cantidad"
                    placeholder="Cantidad..."
                  />

                  <ErrorMessage
                    name="cantidad"
                    component={() => (
                      <div className="error">{errors.cantidad}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="comentarioArticulo" className="form-label">
                    Comentario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="comentarioArticulo"
                    name="comentario"
                    placeholder="Comentario..."
                    onKeyUp={cambiarAMayusculasDescripcion(values)}
                  />

                  <ErrorMessage
                    name="comentario"
                    component={() => (
                      <div className="error">{errors.comentario}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarmateriales"
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
