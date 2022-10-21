import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id: "",
          descripcion: "",
          porcentaje: "",
          tipo: "",
          estado: "Activo",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.id) {
            errores.id = "Por favor ingresa un id";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.id = "El id solo puede contener números";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion porcentaje
          if (!valores.porcentaje) {
            errores.porcentaje = "Por favor ingresar un porcentaje";
          }

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor ingresar un tipo de Impuesto";
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
            <h3 className="mb-3">Nuevo Impuesto</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idImpuesto" className="form-label">
                    ID de Impuesto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idImpuesto"
                    name="id"
                    placeholder="ID de Impuesto..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionImpuesto" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionImpuesto"
                    name="descripcion"
                    placeholder="Descripción..."
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
                  <label htmlFor="porcentajeImpuesto" className="form-label">
                    Porcentaje:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="porcentajeImpuesto"
                    name="porcentaje"
                    placeholder="Porcentaje..."
                  />

                  <ErrorMessage
                    name="porcentaje"
                    component={() => (
                      <div className="error">{errors.porcentaje}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="tipoImpuesto" className="form-label">
                    Tipo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoImpuesto"
                    name="tipo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Inclusivo">Inclusivo</option>
                    <option value="Exclusivo">Exclusivo</option>
                  </Field>

                  <ErrorMessage
                    name="tipo"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoImpuesto" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoImpuesto"
                  name="estado"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="estado"
                  component={() => <div className="error">{errors.estado}</div>}
                />
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarimpuestos"
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

export default Formulario;
