import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLEditar = "http://190.53.243.69:3001/ms_permisos/actualizar-insertar/";


const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const PermisoEditar = () => {
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
        id_permiso: edit.id_permiso,
        id_rol: edit.rol,
        id_objeto: edit.objeto,
        activo:edit.activo ,
        modificado_por:"" ,
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
                mostrarAlertas("guardado");
                navigate("/admin/mostrarpermiso");
              } else {
                mostrarAlertas("error");
              }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
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
                name="id-Permiso"
                placeholder="Id Permiso..."
                disabled
              />

              <ErrorMessage
                name="id-permiso"
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
              <label htmlFor="permisoInsercion" className="form-label">
              Permiso Insercion:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="permisoInsercion"
                  name="activo"
                >

                  <option value="1">Permitir</option>
                  <option value="0">No permitir</option>
                </Field>
                <ErrorMessage
                  name="activo"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
              />
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="permisoEliminacion" className="form-label">
                  Permiso Eliminacion:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="permisoEliminacion"
                  name="activo"
                >

                  <option value="1">Permitir</option>
                  <option value="0">No permitir</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
                />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="permisoActualizacion" className="form-label">
                  Permiso Actualizacion:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="permisoActualizacion"
                  name="activo"
                >

                  <option value="1">Permitir</option>
                  <option value="0">No permitir</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
                />
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="permisoConsultar" className="form-label">
                    Permiso Consultar:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="permisoConsultar"
                    name="activo"
                  >

                    <option value="1">Permitir</option>
                    <option value="0">No permitir</option>
                  </Field>

                  <ErrorMessage
                    name="activo"
                    component={() => (
                      <div className="error">{errors.activo}</div>
                    )}
                  />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-3">
            <label htmlFor="modificadoPor" className="form-label">
                    Modificado Por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="modificadoPor"
                    name="modificado_por"
                    placeholder="Modificado por..."
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
          to="/admin/mostrarpermisos"
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