import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCorreo, cambiarAMayusculasCorreoUsuario, cambiarAMayusculasNombreUsuario, cambiarAMayusculasUsuario } from "../../../utils/cambiarAMayusculas";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";


 const UsuarioEditar = () => {
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
            id_usuario: edit.id_usuario,
            usuario: edit.usuario,
            nombre_usuario: edit.nombre_usuario,
            correo_electronico: edit.correo_electronico   
        }}

        //Funcion para validar
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
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.id_usuario}`, valores);

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
            <h3 className="mb-3">Editar Usuario</h3>
            
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="idUsuario" className="form-label">
                    Id Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idUsuario"
                    name="id_usuario"
                    placeholder="Id usuario..."
                  />
                  <ErrorMessage
                    name="id_usuario"
                    component={() => (
                      <div className="error">{errors.id_usuario}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                    Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="usuario"
                    placeholder="Usuario..."
                    onKeyUp={cambiarAMayusculasUsuario(values)}
                  />
                  <ErrorMessage
                    name="usuario"
                    component={() => (
                      <div className="error">{errors.usuario}</div>
                    )}
                  />
                </div>
              </div>
           

           
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="nombreUsuario" className="form-label">
                    Nombre Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreUsuario"
                    name="nombre_usuario"
                    placeholder="Nombre usuario..."
                    onKeyUp={cambiarAMayusculasNombreUsuario(values)}
                  />
                  <ErrorMessage
                    name="nombre_usuario"
                    component={() => (
                      <div className="error">{errors.nombre_usuario}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="correoElectronico" className="form-label">
                    Correo electrónico:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correoElectronico"
                    name="correo_electronico"
                    placeholder="Correo electronico..."
                    onKeyUp={cambiarAMayusculasCorreoUsuario(values)}
                  />
                  <ErrorMessage
                    name="correo_electronico"
                    component={() => (
                      <div className="error">{errors.correo_electronico}</div>
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

export default UsuarioEditar;
