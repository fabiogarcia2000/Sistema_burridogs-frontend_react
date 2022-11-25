import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalState } from "../../../globalStates/globalStates"; 

import { cambiarAMayusculasDescripcion, cambiarAMayusculasDirección } from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/ms_permisos/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;


const CrearPermiso = () => {

  const navigate = useNavigate();


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
          activo: "1",
          creado_por: "",
          fecha_creacion: date,
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

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            /*const res = await axios.get(${URLMostrarUno}${valores.id_permiso});
            console.log(res)
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista*/
              const res = await axios.put(`${URLCrear}${valores.id_permiso}`, valores);
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
                    <label htmlFor="permisoInsercion" className="form-label">
                      Permiso Inserción:
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
              </div>
  
              <div className="row g-3">
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
                  <label htmlFor="fechaCreacion" className="form-label">
                    Fecha Creacion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fechaCreacion"
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