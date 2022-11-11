import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";

const URLEditar =
  "http://190.53.243.69:3001/lista_materiales/actualizar-insertar/";

const FormularioEditar = () => {
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();

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

          // Validacion id
          if (!valores.id_articulo_padre) {
            errores.id_articulo_padre = "Por favor ingresa un id";
          } else if (!/^^[0-9]+$/.test(valores.id_articulo_padre)) {
            errores.id_articulo_padre = "El id solo puede contener números";
          }

          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingresa una cantidad";
          }

          // Validacion comentario
          if (!valores.comentario) {
            errores.comentario = "Por favor ingresa una comentario";
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
                    Código Padre:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codPdMaterial"
                    name="id_articulo_padre"
                    placeholder="Código del Material..."
                  />

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
                    Código Hijo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codHjArticulo"
                    name="id_articulo_hijo"
                    placeholder="Código Hijo..."
                  />

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
