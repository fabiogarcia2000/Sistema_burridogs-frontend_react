import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";

 const CambioContraseña = () => {
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
            contrasena_actual: edit.contrasena_actual,
            contrasena_nueva: edit.contrasena_nueva,
            contrasena_nueva_conf: edit.contrasena_nueva_conf, 
        }}

       /* //Funcion para validar
        validate={(valores) => {
          let errores = {};

        // Validacion de id usuario
          if (!valores.id_usuario) {
            errores.id_usuario = "Por favor ingresa id usuario";
          } else if (!/^[0-9]+$/.test(valores.id_usuario)) {
            errores.id_usuario = "Escribir solo números";
          }  

        // Validacion usuario
        if (!valores.usuario) {
          errores.usuario = "Por favor ingresa un usuario";
        } 

         // Validacion nombre usuario
         if (!valores.nombre_usuario) {
            errores.nombre_usuario = "Por favor ingresa un nombre de usuario";
          } 

        // Validacion correo electrónico
        if (!valores.correo_electronico) {
            errores.correo_electronico = "Por favor ingresa un correo electrónico";
          } 

          return errores;
        }}*/

        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.contrasena_actual}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarestado");
                  } else {
                    mostrarAlertas("error");
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
            <h3 className="mb-3">Cambiar Contraseña</h3>
            
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="contraActual" className="form-label">
                    Contraseña actual:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="contraActual"
                    name="contrasena_actual"
                    placeholder="Contraseña actual..."
                  />
                  <ErrorMessage
                    name="contrasena_actual"
                    component={() => (
                      <div className="error">{errors.contrasena_actual}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="contraNueva" className="form-label">
                    Contraseña nueva:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="contraNueva"
                    name="contrasena_nueva"
                    placeholder="Contraseña nueva..."
                  />
                  <ErrorMessage
                    name="contrasena_nueva"
                    component={() => (
                      <div className="error">{errors.contrasena_nueva}</div>
                    )}
                  />
                </div>
              </div>
           
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="contraNuevaConf" className="form-label">
                    Confirmar contraseña nueva:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="contraNuevaConf"
                    name="contrasena_nueva_conf"
                    placeholder="Confirmar contraseña nueva..."
                  />
                  <ErrorMessage
                    name="contrasena_nueva_conf"
                    component={() => (
                      <div className="error">{errors.contrasena_nueva_conf}</div>
                    )}
                  />
                </div>
              </div>
           


       
            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/"
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

export default CambioContraseña;
