import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreCategoria } from "../../../utils/cambiarAMayusculas";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


const URLCrear = "http://190.53.243.69:3001/mc_libromayor/mayorizar/";
const URLMostrarUno = "";


 
  

const Formulario = () => {
    
  const navigate = useNavigate();
  const [edit] = useGlobalState('registroEdit');

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "Se mayorizo",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se mayorizo',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe ese mayor',
          icon: 'warning',
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
          id_libro_mayor:edit.id_libro_mayor, 
          id_periodo_contable: "",
          descripcion:"",
          fecha: date
        }}

        //Funcion para validar
        validate={(valores) => {
            let errores = {};

           

          // Validacion de descripcion
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa la descripcion";
          }

          
          
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el nombre ingresado
              try {
              
                
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.post(`${URLCrear}${valores.id_libro_mayor}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarlibromayor");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarlibromayor");
              }
        }}
      >
        {({ errors , values }) => (
          <Form>
            <h3 className="mb-3">Mayorizar Libro Diario</h3>
            <div className="row g-3">

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idperiodo" className="form-label">
                    Id periodo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idperiodo"
                    name="id_periodo_contable"
                    placeholder=""
                   
                  />
                  <ErrorMessage
                    name="id_periodo_contable"
                    component={() => (
                      <div className="error">{errors.id_periodo_contable}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idmayor" className="form-label">
                    Id mayor:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idmayor"
                    name="id_libro_mayor"
                    placeholder=""
                    disabled
                  />
                  <ErrorMessage
                    name="id_libro_mayor"
                    component={() => (
                      <div className="error">{errors.id_libro_mayor}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
            <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción de libro mayor:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion de mayor"
                    onKeyUp={cambiarAMayusculasNombreCategoria(values)}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>

                <div className="col-sm-6">
                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">
                        Fecha de creación:
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="fecha"
                        name="fecha"
                        placeholder=""
                        disabled
                        />
                        <ErrorMessage
                        name="fecha"
                        component={() => (
                            <div className="error">{errors.fecha}</div>
                        )}
                        />
                    </div>
                </div>

            </div>
            
            

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarlibromayor"
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
