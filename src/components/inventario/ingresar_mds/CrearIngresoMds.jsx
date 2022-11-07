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
          unidad: "",
          cantidad: "",
          preciou: "",
          total: "",
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

          // Validacion unidad
          if (!valores.unidad) {
            errores.unidad = "Por favor ingrese una unidad";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.unidad = "La unidad solo pueden contener números";
          }
          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingrese la cantidad";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.cantidad = "La cantidad solo puede contener números";
          }
          // Validacion precio unitario
          if (!valores.preciou) {
            errores.preciou = "Por favor ingrese un precio";
          }

          // Validacion total
          if (!valores.total) {
            errores.total = "Por favor ingrese el total";
          } else if (!/^^[0-9]+$/.test(valores.total)) {
            errores.id = "El total solo puede contener números";
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
          <Form >
            <h3 className="mb-3">Nuevo Ingreso de Mercadería</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idSucursal" className="form-label">
                    ID Artículo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idSucursal"
                    name="id"
                    placeholder="ID del Artículo..."
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
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionSucursal"
                    name="descripcion"
                    placeholder="Descripcion del Artículo..."
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
                  <label htmlFor="direccionSucursal" className="form-label">
                    Unidad:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
                    name="unidad"
                    placeholder="Unidad..."
                  />

                  <ErrorMessage
                    name="unidad"
                    component={() => (
                      <div className="error">{errors.unidad}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="telefonoSucursal" className="form-label">
                    Cantidad:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSucursal"
                    name="cantidad"
                    placeholder="Cantidad a ingresar..."
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

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Precio Unitario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="preciou"
                    placeholder="Precio de cada artículo..."
                  />

                  <ErrorMessage
                    name="preciou"
                    component={() => (
                      <div className="error">{errors.preciou}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Total:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="total"
                    placeholder="Importe Total..."
                  />

                  <ErrorMessage
                    name="total"
                    component={() => (
                      <div className="error">{errors.total}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostraringresomds"
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
