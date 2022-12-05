import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasPregunta } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../../components/seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLEditar = "http://190.53.243.69:3001/ms_pregunta/actualizar/";

const objeto = "FORM_PREGUNTAS_SEGURIDAD"

const EditarPregunta = () => {
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
          id_pregunta: edit.id_pregunta,
          pregunta: edit.pregunta,
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion pregunta
          if (!valores.pregunta) {
            errores.pregunta = "Por favor ingrese una pregunta";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}${valores.id_pregunta}`, valores);

            if (res.status === 200) {
              mostrarAlertas("guardado");
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR PREGUNTA SEGURIDAD"); //Insertar bitacora
              navigate("/admin/questions");
            } else {
              mostrarAlertas("error");
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "ERROR AL EDITAR PREGUNTA SEGURIDAD"); //Insertar bitacora
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "ERROR AL EDITAR PREGUNTA SEGURIDAD"); //Insertar bitacora
            navigate("/admin/questions");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Pregunta</h3>
            <div className="row g-3">
                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="idPreguntaSeguridad" className="form-label">
                            Id Pregunta:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="idPreguntaSeguridad"
                            name="id_pregunta"
                            placeholder= "Pregunta"
                            disabled
                        />

                        <ErrorMessage
                            name="id_pregunta"
                            component={() => (
                            <div className="error">{errors.id_pregunta}</div>
                            )}
                        />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="preguntaSeguridad" className="form-label">
                            Pregunta:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="preguntaSeguridad"
                            name="pregunta"
                            placeholder= "Pregunta"
                            onKeyUp={cambiarAMayusculasPregunta(values)}
                        />

                        <ErrorMessage
                            name="pregunta"
                            component={() => (
                            <div className="error">{errors.pregunta}</div>
                            )}
                        />
                        </div>
                    </div>
              </div>


            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/questions"
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

export default EditarPregunta;