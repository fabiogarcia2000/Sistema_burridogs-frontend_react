import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";


const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const PregUsuarioEditar = () => {
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "Los cambios se guardaron con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudieron guardar los cambios',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
      break;

      default: break;
    }
  };

return (
  <div className="container">
    <Formik
      //valores iniciales
      initialValues={{
        id_permiso: edit.id_preguntas_usuario,
        id_usuario: edit.nombre_usuario,
        id_pregunta: edit.pregunta,
        respuesta:"" ,
      }}
      //Funcion para validar
      validate={(valores) => {
        let errores = {};

        // Validacion descripción
        if (!valores.respuesta) {
          errores.respuesta = "Por favor ingresa una respuesta";
        }

        return errores;
      }}

      onSubmit={async (valores) => {
            //procedimineto para guardar el nuevo registro
          try {
            const res = await axios.put(`${URLEditar}${valores.id_preguntas_usuario}`, valores);

              if (res.status === 200) {
                mostrarAlertas("guardado");
                navigate("/admin/mostrarpreguntasusuario");
              } else {
                mostrarAlertas("error");
              }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarpreguntasusuario");
          }
      }}
    >
      {({ errors, values }) => (
        <Form >
        <h3 className="mb-3">Editar Preguntas Usuario</h3>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="mb-3">
              <label htmlFor="idPreguntaUsuario" className="form-label">
                Id Preguntas Usuario:
              </label>
              <Field
                type="text"
                className="form-control"
                id="idPreguntaUsuario"
                name="id_preguntas_usuario"
                placeholder="Id preguntas usuario..."
                disabled
              />

              <ErrorMessage
                name="id_pregunta_usuario"
                component={() => <div className="error">{errors.id_preguntas_usuario}</div>}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="idUsuario" className="form-label">
                Usuario:
              </label>
              <Field
                type="text"
                className="form-control"
                id="idUsuario"
                name="id_usuario"
                placeholder="Nombre usuario..."
                disabled
              />

              <ErrorMessage
                name="id_usuario"
                component={() => <div className="error">{errors.id_usuario}</div>}
              />
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="idPregunta" className="form-label">
                Pregunta:
              </label>
              <Field
                type="text"
                className="form-control"
                id="idPregunta"
                name="id_pergunta"
                placeholder="Pregunta..."
                disabled
              />
              <ErrorMessage
                name="id_pregunta"
                component={() => <div className="error">{errors.id_pregunta}</div>}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="respuesta" className="form-label">
                    Respuesta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="respuesta"
                    name="respuesta"
                    placeholder="Respuesta..."
                  />

                  <ErrorMessage
                    name="respuesta"
                    component={() => (
                      <div className="error">{errors.respuesta}</div>
                    )}
                  />
            </div>
          </div>
        </div>

        <button className="btn btn-success mb-3 me-2" type="submit">
          Guardar
        </button>
        <Link
          to="admin//mostrarpreguntasusuario"
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

export default PregUsuarioEditar;