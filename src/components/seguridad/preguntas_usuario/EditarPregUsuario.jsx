import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasResppuesta } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLEditar = "http://190.53.243.69:3001/ms_pregunta_usuario/actualizar/0";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

//Identificador del formulario
const objeto = "FORM_PREGUNTAS_USUARIO"

const PregUsuarioEditar = () => {
  const [edit] = useGlobalState('registroEdit')
  const navigate = useNavigate();

//===================Obtener datos del localstorage=====================
  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true)

  const Permisos = () =>{
    const newData = temp.filter(
      (item) => item.objeto === objeto
    );
    setPermisos(newData);
  }

  useEffect(() => {
    let data = localStorage.getItem('permisos')
    if(data){
      setTemp(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);


  useEffect(() => {
    if(permisos.length > 0){
      TienePermisos();
    }
  }, [permisos]);


  const TienePermisos = () =>{
    setPermitido(permisos[0].permiso_consultar)
  }
//================================================================


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
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
          text: 'No se pudieron guardar los cambios',
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
          id_preguntas_usuario: edit.id_preguntas_usuario,
          respuesta: edit.respuesta,
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
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR PREGUNTA USUARIO"); //Insertar bitacora
              navigate("/admin/MostrarPregUsuario");
            } else {
              mostrarAlertas("error");
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/MostrarPregUsuario");
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
                    <label htmlFor="respuesta" className="form-label">
                      Respuesta:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="respuesta"
                      name="respuesta"
                      placeholder="Respuesta..."
                      onKeyUp={cambiarAMayusculasResppuesta(values)}

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
              to="/admin/MostrarPregUsuario"
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