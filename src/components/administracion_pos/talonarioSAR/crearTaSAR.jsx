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
          cai: "",
          sucursal_sar: "",
          terminal_sar: "",
          tipo_documento_sar:"",
          correlativo_inicial:"",
          correlativo_final:"",
          correlativo_actual:"",
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

          // Validacion cai
          if (!valores.cai) {
            errores.descripcion = "Por favor ingresar el cai";
          } 

          // Validacion sucursal sar
          if (!valores.sucursal_sar) {
            errores.tipo = "Por favor ingresar sucursal";
          } 

          // Validacion terminal sar
          if (!valores.terminal_sar) {
            errores.cuentaContable = "Por favor ingresar una terminal";
          } 

          // Validacion tipo doumento
          if (!valores.tipo_documento_sar) {
            errores.cuentaContable = "Por favor ingresar tipo documento";
          }
          
          // Validacion correlativo inicial
          if (!valores.correlativo_inicial) {
            errores.cuentaContable = "Por favor ingresar correlativo";
          }

          
          // Validacion correlativo final
          if (!valores.correlativo_final) {
            errores.cuentaContable = "Por favor ingresar correlativo";
          }

          
          // Validacion correlativo actual
          if (!valores.correlativo_actual) {
            errores.cuentaContable = "Por favor ingresar correlativo";
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
          <Form >
            <h3 className="mb-3">Nuevo Talonario SAR</h3>
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
                    placeholder="ID de Talonario..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="CAI" className="form-label">
                    CAI:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="CAI"
                    name="CAI"
                    placeholder="CAI..."
                  />

                  <ErrorMessage
                    name="CAI"
                    component={() => (
                      <div className="error">{errors.cai}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="SucursalSAR" className="form-label">
                  Sucursal SAR:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="SucursalSAR"
                    name="SucursalSAR"
                    placeholder="Sucursal..."
                  />

                  <ErrorMessage
                    name="SucursalSAR"
                    component={() => (
                      <div className="error">{errors.sucursal_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="terminal_sar" className="form-label">
                  Terminal SAR:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="terminal_sar"
                    name="terminal_sar"
                    placeholder="terminal..."
                  />

                  <ErrorMessage
                    name="terminal_sar"
                    component={() => (
                      <div className="error">{errors.terminal_sar}</div>
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
