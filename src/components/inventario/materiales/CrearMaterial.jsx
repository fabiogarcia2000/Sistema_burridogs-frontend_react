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
          impuesto: "",
          categoria: "",
          unidadmedida: "",
          socionegocio: "",
          cantidad: "",
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

          // Validacion impuesto
          if (!valores.impuesto) {
            errores.impuesto = "Por favor ingresa un impuesto";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.impuesto = "El impuesto solo puede contener números";
          }

          // Validacion categoria
          if (!valores.categoria) {
            errores.categoria = "Por favor ingresa una categoria";
          }

          // Validacion unidad medida
          if (!valores.unidadmedida) {
            errores.unidadmedida = "Por favor ingresa una unidad de medida";
          }

          // Validacion socio de negocio
          if (!valores.socionegocio) {
            errores.socionegocio =
              "Por favor ingresa el nombre del socio de negocio";
          }

          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingresa la cantidad";
          } else if (!/^^[0-9]+$/.test(valores.cantidad)) {
            errores.cantidad = "La cantidad solo puede contener números";
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
            <h3 className="mb-3">Nuevo Material</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idSucursal" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idSucursal"
                    name="id"
                    placeholder="Código del Material..."
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
                    Impuesto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionSucursal"
                    name="impuesto"
                    placeholder="Impuesto..."
                  />

                  <ErrorMessage
                    name="impuesto"
                    component={() => (
                      <div className="error">{errors.impuesto}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="direccionSucursal" className="form-label">
                    Categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
                    name="categoria"
                    placeholder="Categoría del material..."
                  />

                  <ErrorMessage
                    name="categoria"
                    component={() => (
                      <div className="error">{errors.categoria}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="telefonoSucursal" className="form-label">
                    Unidad de Medida:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSucursal"
                    name="unidadmedida"
                    placeholder="Medida de la Unidad"
                  />

                  <ErrorMessage
                    name="unidadmedida"
                    component={() => (
                      <div className="error">{errors.unidadmedida}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Socio de Negocio:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="socionegocio"
                    placeholder="Nombre del Socio de Negocio..."
                  />

                  <ErrorMessage
                    name="socionegocio"
                    component={() => (
                      <div className="error">{errors.socionegocio}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Cantidad:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="cantidad"
                    placeholder="Cantidad del material..."
                  />

                  <ErrorMessage
                    name="cantidad"
                    component={() => (
                      <div className="error">{errors.cantidad}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarmateriales"
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
