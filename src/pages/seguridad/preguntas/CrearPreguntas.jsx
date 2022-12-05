import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasPregunta } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../../components/seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLCrear = "http://190.53.243.69:3001/ms_pregunta/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const objeto = "FORM_PREGUNTAS_SEGURIDAD"

const CrearPregunta = () => {
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
          text: "La pregunta de seguridad se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la pregunta de seguridad',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe la pregunta de seguridad ingresada',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'errormostrar':
        Swal.fire({
          title: 'Error al Cargar',
          text: 'En este momento no se pueden mostrar los datos, puede ser por un error de red o con el servidor. Intente más tarde.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      default: break;
    }
  };


  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_pregunta: "",
          pregunta: "",
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};


          // Validacion descripción
          if (!valores.pregunta) {
            errores.pregunta = "Por favor ingrese una pregunta";
          }


          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            /*const res = await axios.get(${URLMostrarUno}${valores.id_permiso});
            console.log(res)
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista*/
              const res = await axios.put(`${URLCrear}`, valores);
              if (res.status === 200) {
                mostrarAlertas("guardado");
                RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "CREAR PREGUNTA SEGURIDAD"); //Insertar bitacora
                navigate("/admin/questions");
              } else {
                mostrarAlertas("error");
                RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "ERROR AL CREAR PREGUNTA SEGURIDAD"); //Insertar bitacora
              }
            /*} else {
              mostrarAlertas("duplicado");
            }*/
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "ERROR AL CREAR PREGUNTA SEGURIDAD"); //Insertar bitacora
            navigate("/admin/questions");
          };
        }}
        >
          {({ errors, values }) => (
            <Form >
              <h3 className="mb-3">Nueva pregunta</h3>
              <div className="row g-3">
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

export default CrearPregunta;