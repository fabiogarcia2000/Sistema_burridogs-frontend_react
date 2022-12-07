import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

function index() {
  return (
    <div className='container'>
        <Formik
          //valores iniciales
          initialValues={{
            nombre: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion id
            if (!valores.nombre) {
              errores.nombre = "Nombre requerido";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            alert("PRINCIPAL")
          }}
        >
          {({ errors, values }) => (
            <Form>
                <div className="row">
                  <div className="input-group mb-2">
                    <span className="input-group-text">Nombre: </span>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Nombre del Cliente..."
                      aria-label="Recipient's username"
                      //aria-describedby="button-addon2"
                      name="nombre"
                    />
                  </div>
                  <div className="row">
                    <ErrorMessage
                      name="nombre"
                      component={() => (
                        <div className="error">{errors.nombre}</div>
                      )}
                    />
                  </div>
                </div>
                <button type='submit'  className="btn btn-secondary m-1">HIJO</button>

                <div className='row'>
        <Formik
          //valores iniciales
          initialValues={{
            apellido: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion id
            if (!valores.apellido) {
              errores.apellido = "apellido requerido";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            alert("HIJO")
          }}
        >
          {({ errors, values }) => (
            <Form>
                <div className="row">
                  <div className="input-group mb-2">
                    <span className="input-group-text">apellido: </span>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="apellido del Cliente..."
                      aria-label="Recipient's username"
                      //aria-describedby="button-addon2"
                      name="apellido"
                    />
                  </div>
                  <div className="row">
                    <ErrorMessage
                      name="apellido"
                      component={() => (
                        <div className="error">{errors.apellido}</div>
                      )}
                    />
                  </div>
                </div>
                <button  className="btn btn-primary m-1" type='submit'>PRINCIPAL</button>

            </Form>
          )}
        </Formik>
                </div>

            </Form>
          )}
        </Formik>
    </div>
  )
}

export default index