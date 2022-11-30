import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasComentario } from "../../../utils/cambiarAMayusculas";

const URLCrear =
  "http://190.53.243.69:3001/lista_materiales/actualizar-insertar/";
const UrlMostrarInv = "http://190.53.243.69:3001/articulo/getallactiveinv";
const UrlMostrar = "http://190.53.243.69:3001/articulo/getall/";

const Formulario = () => {
  const navigate = useNavigate();
  const [edit] = useGlobalState("registroEdit");

  //procedimineto para obtener los articulos de inventario
  const [articulosInv, setArticulosInv] = useState([]);
  useEffect(() => {
    getArticulosInv();
  }, []);

  //petición a api
  const getArticulosInv = async () => {
    try {
      const res = await axios.get(UrlMostrarInv);
      setArticulosInv(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener los articulos de inventario
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
    getArticulos();
  }, []);

  //petición a api
  const getArticulos = async () => {
    try {
      const res = await axios.get(UrlMostrar);
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
          text: "La receta se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo crear la receta",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "duplicado":
        Swal.fire({
          text: "Ya existe una receta con el material ingresado",
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
          id_articulo_padre: edit.id_articulo,
          id_articulo_hijo: "",
          cantidad: "",
          comentario: "",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/11/27",
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
            const res = await axios.put(`${URLCrear}`, valores);
            console.log(res);
            if (res.status === 200) {
              mostrarAlertas("guardado");
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
            <h3 className="mb-3">Crear Receta</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codPdMaterial" className="form-label">
                    Artículo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="codHjArticulo"
                    name="id_articulo_padre"
                    disabled
                  >
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

              <div className="col-sm-4">
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
                    {articulosInv.map((item, i) => (
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
              <div className="col-sm-4">
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

              <div className="col-sm-4">
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
                    onKeyUp={cambiarAMayusculasComentario(values)}
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
