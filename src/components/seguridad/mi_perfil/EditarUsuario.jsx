import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreUsuario, cambiarAMayusculasUsuario } from "../../../utils/cambiarAMayusculas";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";


 const UsuarioEditar = () => {
  const [edit] = useGlobalState('registroEdit')
  const navigate = useNavigate();


  //TRAER INFORMACI[ON DEL USUARIO]
  const userdata = JSON.parse(localStorage.getItem('data'))
  
  const [registro, setRegistro] = useState({});

  
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
            id_usuario: userdata.data.id,
            usuario: userdata.data.username,
            nombre_usuario: userdata.data.nameUser.replace('"', "").replace('"', ""),
            correo_electronico: userdata.data.correo_electronico,
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

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
                    navigate("/admin/home");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/admin/home");
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
                    disabled
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
                    disabled
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
              to="/admin/home"
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
