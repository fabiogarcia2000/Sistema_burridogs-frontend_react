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
          tipo: "",
          cuentaContable: "",
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
            errores.descripcion = "Por favor ingresar una descripción";
          } 

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor seleccionar un tipo";
          } 

          // Validacion cuenta Contable
          if (!valores.cuentaContable) {
            errores.cuentaContable = "Por favor seleccionar una cuenta contable";
          } 

          // Validacion estado
          if (!valores.estado) {
            errores.estado = "Por favor seleccione un estado";
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
            <h3 className="mb-3">Nuevo Método de Pago</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idMetodoPago" className="form-label">
                    ID:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idMetodoPago"
                    name="id"
                    placeholder="ID de Método de Pago..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionMetodoPago" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionMetodoPago"
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
                  <label htmlFor="tipoMetodoPago" className="form-label">
                    Tipo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="tipoMetodoPago"
                    name="tipo"
                    placeholder="Tipo..."
                  />

                  <ErrorMessage
                    name="tipo"
                    component={() => (
                      <div className="error">{errors.tipo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cuenta" className="form-label">
                    Cuenta Contable:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cuenta"
                    name="cuentaContable"
                    placeholder="Cuenta Contable..."
                  />

                  <ErrorMessage
                    name="cuentaContable"
                    component={() => (
                      <div className="error">{errors.cuentaContable}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoMetodoPago" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoMetodoPago"
                  name="estado"
                > 
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="estado"
                  component={() => (
                    <div className="error">{errors.estado}</div>
                  )}
                />
              </div>
              <hr />
            </div>


            <button className="btn btn-success mb-3 me-2" type="submit">Guardar</button>
            <Link to="/mostrarmetodopago" type="button" className='btn btn-danger mb-3 me-2'>Cancelar</Link>

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
