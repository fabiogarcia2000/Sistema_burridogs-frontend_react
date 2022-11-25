import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCodigo, cambiarAMayusculasDescripArticulo } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";
import { useState } from "react";
import { cambiarAMayusculasRol } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";


const URLCrear = "http://190.53.243.69:3001/ms_rol/actualizar-insertar/0";
const UrlMostrar = "http://190.53.243.69:3001/ms_rol/getall/";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;


const CrearRol = () => {

  const navigate = useNavigate();
  const [cuenta, setCuenta ] = useState();

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El rol se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el rol',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un rol con ese nombre ingresado',
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
            id_rol: "",
            rol: "",
            descripcion: "",
            creado_por: "SYSTEMUSER",
            fecha_creacion: date,
            modificado_por: "SYSTEMUSER",
            fecha_modificacion: date,
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

        
            
        

  
            // Validacion nombre cuenta
            if (!valores.rol) {
              errores.rol = "Por favor ingresa el nombre de rol";
            } 

            
            // Validacion nombre cuenta
            if (!valores.descripcion) {
                errores.descripcion = "Por favor ingresa descripción de rol";
              } 
  
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado  
              try {
                /*const res = await axios.get(`${UrlMostrar}`);
                setCuenta(res.data)
                console.log(cuenta) 
                cuenta &&
                cuenta.map(async (item) =>{
                  if(item.nombre_cuenta === valores.nombre_cuenta){
                    mostrarAlertas("duplicado");
                  }else{
                  }
            });*/
            //procedimineto para guardar el nuevo registro en el caso de que no exista
           await axios.put(`${URLCrear}`, valores);
            //if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/roles");
          /*} else {
            mostrarAlertas("error");
          }       */

              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/admin/roles");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nueva Rol</h3>
            <div className="row g-3">
           
              <div className="col-sm-6">
              <div className="mb-3">
                  <label htmlFor="rol" className="form-label">
                    Rol:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rol"
                    name="rol"
                    placeholder="Nombre de rol..."
                    onKeyUp={cambiarAMayusculasRol(values)}
                  />

                  <ErrorMessage
                    name="rol"
                    component={() => (
                      <div className="error">{errors.rol}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción de rol..."
                    onKeyUp={cambiarAMayusculasDescripcion(values)}
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="creadopor" className="form-label">
                    Creado por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="creadopor"
                    name="creado_por"
                    placeholder="Nombre de la cuenta..."
                    onKeyUp={cambiarAMayusculasNombreCuenta(values)}
                  />

                  <ErrorMessage
                    name="creado_por"
                    component={() => (
                      <div className="error">{errors.creado_por}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idCategoria" className="form-label">
                    Categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idCategoria"
                    name="id_categoria"
                    placeholder="ID de la categoría..."
                  />

                  <ErrorMessage
                    name="id_categoria"
                    component={() => (
                      <div className="error">{errors.id_categoria}</div>
                    )}
                  />
                </div>
              </div>
            </div>
            

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idDestinoCuenta" className="form-label">
                    Destino de cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idDestinoCuenta"
                    name="id_destino_cuenta"
                    placeholder="ID del destino de la cuenta..."
                  />

                  <ErrorMessage
                    name="id_destino_cuenta"
                    component={() => (
                      <div className="error">{errors.id_destino_cuenta}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarcatalogo"
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

export default CrearRol;
