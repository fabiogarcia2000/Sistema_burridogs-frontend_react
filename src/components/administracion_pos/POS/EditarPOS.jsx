import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditarPOS = () => {
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
          id_pos: id,
          descripcion: "",
          id_sucursal: "",
          id_correlativo: "",
          creado_por: "",
          fecha_creacion: "",
          modificado_por: "",
          fecha_modificacion: "",
          activo:"",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.id) {
            errores.id = "Por favor ingresa un código";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.id = "El código solo puede contener números";
          }

          // Validacion descripcion
          if (!valores.descripcion) {
            errores.tipo = "Por favor ingresa una descripcion";
          }

          // Validacion id sucursal
          if (!valores.id_sucursal) {
            errores.descripcion = "Por favor ingresa un codigo";
          }

          // Validacion id correlativo
          if (!valores.id_correlativo) {
            errores.id_correlativo =
              "Por favor ingresa un codigo";
          }
          // Validacion estado
          if (!valores.estado) {
            errores.estado = "Por favor ingresa un estado";
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
            <h3 className="mb-3">Nuevo POS</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idpos" className="form-label">
                    Id:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idpos"
                    name="id"
                    placeholder="id del POS..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionpos" className="form-label">
                    Descripcion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionpos"
                    name="Tipo"
                    placeholder="Descripcion POS..."
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => <div className="error">{errors.descripcion}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="id_sucursal" className="form-label">
                    id sucursal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
                    name="descripcion"
                    placeholder="Ingrese..."
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.id_sucursal}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idcorrelaivo" className="form-label">
                    id correlativo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idcorrelativo"
                    name="id correlativo"
                    placeholder="Ingrese..."
                  />

                  <ErrorMessage
                    name="id correlativo"
                    component={() => (
                      <div className="error">{errors.id_correlativo}</div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoModoPedido" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoMetodoPedido"
                  name="estado"
                > 
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="estado"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
                />
              </div>
              <hr />
            </div>
            

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarPOS"
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

export default EditarPOS;