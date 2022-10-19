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
          direccion: "",
          telefono: "",
          rtn: "",
          centroCosto: "",
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

          // Validacion dirección
          if (!valores.direccion) {
            errores.direccion = "Por favor ingresa una dirección";
          } 

          // Validacion teléfono
          if (!valores.telefono) {
            errores.telefono = "Por favor ingresa un teléfono";
          } 

          // Validacion teléfono
          if (!valores.telefono) {
            errores.telefono = "Por favor ingresa un teléfono";
          } 

          // Validacion rtn
          if (!valores.rtn) {
            errores.rtn = "Por favor ingresa un rtn";
          } else if (!/^^[0-9]+$/.test(valores.rtn)) {
            errores.id = "El rtn solo puede contener números";
          }

          // Validacion ID de Centro de Costo
          if (!valores.centroCosto) {
            errores.centroCosto = "Por favor ingresa un ID de Centro de Costo";
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
            <h3 className="mb-3">Nueva Sucursal</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idSucursal" className="form-label">
                    ID de Sucursal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idSucursal"
                    name="id"
                    placeholder="ID de Sucursal..."
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
                    placeholder="Descripcion..."
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
                    Dirección:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
                    name="direccion"
                    placeholder="Dirección..."
                  />

                  <ErrorMessage
                    name="direccion"
                    component={() => (
                      <div className="error">{errors.direccion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="telefonoSucursal" className="form-label">
                    Teléfono:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSucursal"
                    name="telefono"
                    placeholder="Teléfono..."
                  />

                  <ErrorMessage
                    name="telefono"
                    component={() => (
                      <div className="error">{errors.telefono}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    RTN:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="rtn"
                    placeholder="RTN..."
                  />

                  <ErrorMessage
                    name="rtn"
                    component={() => <div className="error">{errors.rtn}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    ID de Centro de Costo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="centroCosto"
                    placeholder="ID de Centro Costo..."
                  />

                  <ErrorMessage
                    name="centroCosto"
                    component={() => (
                      <div className="error">{errors.centroCosto}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoSucursal" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoSucursal"
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
            <Link to="/mostrarsucursales" type="button" className='btn btn-danger mb-3 me-2'>Cancelar</Link>

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
