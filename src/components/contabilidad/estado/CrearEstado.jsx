import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasTipoEstado } from "../../../utils/cambiarAMayusculas";

const URLCrear = "https://jsonplaceholder.typicode.com/comments";
const URLMostrarUno = "https://jsonplaceholder.typicode.com/comments";


const EstadoCrear = () => {

  const navigate = useNavigate();


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El estado se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el nuevo estado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un estado con el mismo nombre',
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
            id_estado: "",
            tipo_estado: ""       
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

        // Validacion de id estado
          if (!valores.id_estado) {
            errores.id_estado = "Por favor ingresa id estado";
          } else if (!/^[0-9]+$/.test(valores.id_estado)) {
            errores.id_estado = "Escribir solo números";
          }  

        // Validacion tipo estado
        if (!valores.tipo_estado) {
          errores.tipo_estado = "Por favor ingresa un nombre de tipo estado";
        } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.tipo_estado)) {
          errores.tipo_estado = "Escribir solo en MAYÚSCULAS";
        }

  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.tipo_estado}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.tipo_estado}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarestado");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarestado");
              }
        }}
      >
       {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Estado Libro Diario</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="IdEstado" className="form-label">
                    Id Estado:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="IdEstado"
                    name="id_estado"
                    placeholder="Id estado..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_estado"
                    component={() => (
                      <div className="error">{errors.id_estado}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="TipoEstado" className="form-label">
                    Tipo Estado:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="TipoEstado"
                    name="tipo_estado"
                    placeholder="Tipo Estado..."
                    onKeyUp={cambiarAMayusculasTipoEstado(values)}

                  />

                  <ErrorMessage
                    name="tipo_estado"
                    component={() => (
                      <div className="error">{errors.tipo_estado}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarestado"
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

export default EstadoCrear;