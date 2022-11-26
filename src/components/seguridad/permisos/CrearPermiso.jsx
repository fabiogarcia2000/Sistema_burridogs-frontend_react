import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalState } from "../../../globalStates/globalStates";

const URLCrear = "http://190.53.243.69:3001/ms_permisos/actualizar-insertar/0";

const Urlrol = "http://190.53.243.69:3001/ms_rol/getall/";
const Urlobjetos = "http://190.53.243.69:3001/ms_objetos/getall/";

//Para mostrar la fecha en formato DD/MM/AAAA
const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const CrearPermiso = () => {

  const navigate = useNavigate();

  //procedimineto para obtener todos las sucursales y mostrarlas en select
  /* const [roles, setrol] = useState([]);
   useEffect(() => {
     getrol();
   }, []);
  
   //petición a api
   const getrol = async () => {
     try {
       const res = await axios.get(Urlrol);
       setrol(res.data);
     } catch (error) {
       console.log(error);
       mostrarAlertas("errormostrar");
     }
   };*/

  //procedimineto para obtener todos las sucursales y mostrarlas en select
  const [objeto, setobjeto] = useState([]);
  useEffect(() => {
    getobjeto();
  }, []);

  //petición a api
  const getobjeto = async () => {
    try {
      const res = await axios.get(Urlobjetos);
      setobjeto(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El permiso se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el permiso',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe ese permiso ingresado',
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
          id_permiso: "",
          permiso_insercion: "1",
          permiso_eliminacion: "1",
          permiso_actualizacion: "1",
          permiso_consultar: "1",
          activo: "1",
          creado_por: "",
          fecha_creacion: date,
          id_rol: "",
          id_objeto: "",

        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};
          // Validacion descripción
          if (!valores.creado_por) {
            errores.creado_por = "Por favor ingrese un nombre";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }
          // Validacion estado
          if (!valores.id_objeto) {
            errores.activo = "Por favor seleccione una opcion";
          }
          // Validacion estado
          if (!valores.id_rol) {
            errores.activo = "Por favor seleccione una opcion";
          }

          return errores;
        }}
        onSubmit={async (valores) => {

          console.log("entro hasta aqui")
          //validar si existe un registro con el codigo ingresado
          try {
            /*const res = await axios.get(${URLMostrarUno}${valores.id_permiso});
            console.log(res)
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista*/
            const res = await axios.put(`${URLCrear}`, valores);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarpermiso");
            } else {
              mostrarAlertas("error");
            }
          } /*else {
              mostrarAlertas("duplicado");
            }
          }*/ catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarpermisos");
          };
        }}
      >
        {({ errors, values }) => (
          <Form >
            <h3 className="mb-3">Nuevo permiso</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permisoinsercion" className="form-label">
                    Permiso Inserción:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoinsercion"
                    name="permiso_insercion"
                  >

                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>
                  <ErrorMessage
                    name="permiso_insercion"
                    component={() => (
                      <div className="error">{errors.permiso_insercion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permisoeliminacion" className="form-label">
                    Permiso Eliminacion:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoeliminacion"
                    name="permiso_eliminacion"
                  >

                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>

                  <ErrorMessage
                    name="permiso_eliminacion"
                    component={() => (
                      <div className="error">{errors.permiso_eliminacion}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permisoactualizacion" className="form-label">
                    Permiso Actualizacion:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoactualizacion"
                    name="permiso_actualizacion"
                  >

                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>

                  <ErrorMessage
                    name="permiso_actualizacion"
                    component={() => (
                      <div className="error">{errors.permiso_actualizacion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permisoconsultar" className="form-label">
                    Permiso Consultar:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoconsultar"
                    name="permiso_consultar"
                  >

                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>

                  <ErrorMessage
                    name="permiso_consulta"
                    component={() => (
                      <div className="error">{errors.permiso_consultar}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="creadoPor" className="form-label">
                    Creado Por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="creadoPor"
                    name="creado_por"
                    placeholder="Creado por..."
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
                  <label htmlFor="fecha_creacion" className="form-label">
                    Fecha Creacion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fecha_creacion"
                    name="fecha_creacion"
                    disabled
                  />
                  <ErrorMessage
                    name="fecha_creacion"
                    component={() => (
                      <div className="error">{errors.fecha_creacion}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="id_objeto" className="form-label">
                    Objeto:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="id_objeto"
                    name="id_objeto"
                  >
                    <option value="">Seleccionar...</option>
                    {objeto.map((item, i) => (
                      <option key={i} value={item.id_objeto}>{item.objeto}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="id_objeto"
                    component={() => (
                      <div className="error">{errors.id_objeto}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="id_rol" className="form-label">
                    Rol:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="id_rol"
                    name="id_rol"
                  />
                  {/*<option value="">Seleccionar...</option>
                    {roles.map((item, i) => (
                      <option key={i} value={item.id_rol}>{item.rol}</option>
                    ))}
                    </Field>*/}
                  <ErrorMessage
                    name="id_objeto"
                    component={() => (
                      <div className="error">{errors.id_objeto}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarpermiso"
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

export default CrearPermiso;