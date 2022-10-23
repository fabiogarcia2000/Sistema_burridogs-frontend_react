import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams();
  const { type } = useParams();
  console.log(id);
  console.log(type);

  //Configurar los hooks
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  if (type === "new") {
    console.log("Crear Nuevo registro");
  } else if (type === "edit") {
    console.log("Editar un registro");
  }

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id: id,
          nombre_usuario: "",
          estado_usuario: "",
          id_rol: "",
          correo_electronico: "",
          modificado_por: "",
          fecha_modificacion: "",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion nombre usuario
          if (!valores.nombre_usuario) {
            errores.nombre_usuario = "Por favor ingrese un nombre de usuario";
          }

          // Validacion estado usuario
          if (!valores.estado_usuario) {
            errores.estado_usuario = "Por favor ingresa un estado";
          }

          // Validacion rol
          if (!valores.id_rol) {
            errores.id_rol = "Por favor ingrese un rol";
          }

          // Validacion correo
          if (!valores.correo_electronico) {
            errores.correo_electronico = "Por favor ingrese un correo electrónico";
          }

          // Validacion modificado
          if (!valores.modificado_por) {
            errores.modificado_por = "Por favor ingresa el nombre por quien fue modificado";
          }

          // Validacion fecha de modificacion
          if (!valores.fecha_modificacion) {
            errores.fecha_modificacion = "Por favor ingrese la fecha de modificación";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          //Enviar los datos (petición Post)
          console.log("Formulario enviado");

          resetForm();
          setFormularioEnviado(true);
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Editar Usuario</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idSucursal" className="form-label">
                    Id Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idSucursal"
                    name="id"
                    placeholder="Id usuario..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionSucursal" className="form-label">
                    Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionSucursal"
                    name="Tipo"
                    placeholder="Usuario.."
                    disable = ""
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => <div className="error">{errors.usuario}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="direccionSucursal" className="form-label">
                    Nombre usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
                    name="descripcion"
                    placeholder="Nombre usuario..."
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.nombre_usuario}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="telefonoSucursal" className="form-label">
                    Estado usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSucursal"
                    name="descripcion_corta"
                    placeholder="Estado usuario..."
                  />

                  <ErrorMessage
                    name="descripcion_corta"
                    component={() => (
                      <div className="error">{errors.estado_usuario}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Contraseña:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="impuesto"
                    placeholder="Contraseña..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="impuesto"
                    component={() => (
                      <div className="error">{errors.contrasena}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Id rol:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="categoria"
                    placeholder="Id rol..."
                  />

                  <ErrorMessage
                    name="categoria"
                    component={() => (
                      <div className="error">{errors.id_rol}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Fecha de última conexión:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="unidadventa"
                    placeholder="Fecha de última conexión..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="unidadventa"
                    component={() => (
                      <div className="error">{errors.fecha_ultima_conexion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Preguntas contestadas:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Preguntas contestadas..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.preguntas_contestadas}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Primer ingreso:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="unidadventa"
                    placeholder="Primer ingreso..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="unidadventa"
                    component={() => (
                      <div className="error">{errors.primer_ingreso}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Fecha vencimiento:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Fecha vencimiento..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.fecha_vencimiento}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Correo electrónico:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="unidadventa"
                    placeholder="Correo electrónico..."
                  />

                  <ErrorMessage
                    name="unidadventa"
                    component={() => (
                      <div className="error">{errors.correo_electronico}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Creado por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Creado por..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.creado_por}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Fecha de creación:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="unidadventa"
                    placeholder="Fecha de creación..."
                    disable = ""
                  />

                  <ErrorMessage
                    name="unidadventa"
                    component={() => (
                      <div className="error">{errors.fecha_creacion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Modificado por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Modificado por..."
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.modificado_por}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Fecha de modificación:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Fecha de modificación..."
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.fecha_modificacion}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrararticulos"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>

            {/*Mostrar mensaje de exito al enviar formulario */}
            {formularioEnviado && (
              <p className="exito">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditarUsuario;
