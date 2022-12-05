import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLEditar = "http://190.53.243.69:3001/ms_permisos/actualizar-insertar/";


const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const objeto = "FORM_PERMISOS"

const PermisoEditar = () => {
  const [edit] = useGlobalState('registroEdit')

  //===================Obtener datos del localstorage=====================
  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true)

  const Permisos = () => {
    const newData = temp.filter(
      (item) => item.objeto === objeto
    );
    setPermisos(newData);
  }

  useEffect(() => {
    let data = localStorage.getItem('permisos')
    if (data) {
      setTemp(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);


  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);


  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar)
  }
  //================================================================


  const navigate = useNavigate();
  //TRAER NOMBRE DE USUARIO PARA EL CREADO POR 
  const userdata = JSON.parse(localStorage.getItem('data'))

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
         id_permiso: edit.id_permiso,
          id_rol: edit.rol,
          id_objeto: edit.objeto,
          permiso_insercion: "1",
          permiso_eliminacion: "1",
          permiso_actualizacion: "1",
          permiso_consultar: "1",
          activo: "1",
          modificado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
          fecha_modificacion: date
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion descripción
          if (!valores.modificado_por) {
            errores.modificado_por = "Por favor ingresa un nombre";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }

          return errores;
        }}

        onSubmit={async (valores) => {
          //procedimineto para guardar el nuevo registro
          try {
            const res = await axios.put(`${URLEditar}${valores.id_permiso}`, valores);

            if (res.status === 200) {
              console.log(valores)
              mostrarAlertas("guardado");
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR PERMISO"); //Insertar bitacora
              navigate("/admin/mostrarpermiso");
            } else {
              mostrarAlertas("error");
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "ERROR AL EDITAR PERMISO"); //Insertar bitacora
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "ERROR AL EDITAR PERMISO"); //Insertar bitacora
            navigate("/admin/mostrarpermiso");
          }
        }}
      >
        {({ errors, values }) => (
          <Form >
            <h3 className="mb-3">Editar Permisos</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idPermiso" className="form-label">
                    Id Permiso:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idPermiso"
                    name="id_permiso"
                    placeholder="Id Permiso..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_permiso"
                    component={() => <div className="error">{errors.id_permiso}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idRol" className="form-label">
                    Id Rol:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idRol"
                    name="id_rol"
                    placeholder="Nombre Rol..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_rol"
                    component={() => <div className="error">{errors.id_rol}</div>}
                  />
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idObjeto" className="form-label">
                    Id Objeto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idObjeto"
                    name="id_objeto"
                    placeholder="Nombre objeto..."
                    disabled
                  />
                  <ErrorMessage
                    name="id_objeto"
                    component={() => <div className="error">{errors.id_objeto}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permisoinsercion" className="form-label">
                    Permiso Inserción:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoinsercion"
                    name="permisoinsercion"
                  >
                    <option value="">Seleccionar...</option>
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
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permiso_eliminacion" className="form-label">
                    Permiso Eliminacion:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permiso_eliminacion"
                    name="permiso_eliminacion"
                  >
                    <option value="">Seleccionar...</option>
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

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="permiso_actualizacion" className="form-label">
                    Permiso Actualizacion:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permiso_actualizacion"
                    name="permiso_actualizacion"
                  >
                    <option value="">Seleccionar...</option>
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
            </div>

            <div className="row g-3">
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
                    <option value="">Seleccionar...</option>
                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>

                  <ErrorMessage
                    name="permiso_consultar"
                    component={() => (
                      <div className="error">{errors.permiso_consultar}</div>
                    )}
                  />
                </div>
              </div> 
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="modificado_por" className="form-label">
                    Modificado Por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="modificado_por"
                    name="modificado_por"
                    placeholder="Modificado por..."
                    disabled
                  />

                  <ErrorMessage
                    name="modificado_por"
                    component={() => (
                      <div className="error">{errors.modificado_por}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="fechaModificacion" className="form-label">
                  Fecha Modificacion:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="fechaModificacion"
                  name="fecha_modificacion"
                  disabled
                />

                <ErrorMessage
                  name="fecha_modificacion"
                  component={() => (
                    <div className="error">{errors.fecha_modificacion}</div>
                  )}
                />
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

export default PermisoEditar;