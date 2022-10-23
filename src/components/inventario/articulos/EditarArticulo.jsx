import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditarArticulo = () => {
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
          tipo: "",
          descripcion: "",
          descripcion_corta: "",
          impuesto: "",
          categoria: "",
          unidadventa: "",
          codigobarra: "",
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

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor ingresa el tipo";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion descripción corta
          if (!valores.descripcion_corta) {
            errores.descripcion_corta =
              "Por favor ingresa una descripción corta";
          }

          // Validacion impuesto
          if (!valores.impuesto) {
            errores.impuesto = "Por favor ingrese un impuesto";
          }

          // Validacion categoría
          if (!valores.categoria) {
            errores.categoria = "Por favor ingresa la categoría";
          }

          // Validacion unidad de venta
          if (!valores.unidadventa) {
            errores.unidadventa = "Por favor ingrese unidades";
          } else if (!/^^[0-9]+$/.test(valores.unidadventa)) {
            errores.id = "Las unidades de venta solo puede contener números";
          }

          // Validacion código de barra
          if (!valores.codigobarra) {
            errores.codigobarra = "Por favor ingresa el código de barra";
          } else if (!/^^[0-9]+$/.test(valores.codigobarra)) {
            errores.id = "El código de barra solo puede contener números";
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
            <h3 className="mb-3">Editar Artículo</h3>
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
                    placeholder="Código del Artículo..."
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
                    Tipo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionSucursal"
                    name="Tipo"
                    placeholder="Tipo de artículo..."
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="direccionSucursal" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direccionSucursal"
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

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="telefonoSucursal" className="form-label">
                    Descripción corta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSucursal"
                    name="descripcion_corta"
                    placeholder="Descripción corta..."
                  />

                  <ErrorMessage
                    name="descripcion_corta"
                    component={() => (
                      <div className="error">{errors.descripcion_corta}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Impuesto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
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

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="categoria"
                    placeholder="Categoría del artículo..."
                  />

                  <ErrorMessage
                    name="categoria"
                    component={() => (
                      <div className="error">{errors.categoria}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Unidad de Venta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="unidadventa"
                    placeholder="Unidad de Venta..."
                  />

                  <ErrorMessage
                    name="unidadventa"
                    component={() => (
                      <div className="error">{errors.unidadventa}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Código de Barra:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="codigobarra"
                    placeholder="Código de barra del artículo..."
                  />

                  <ErrorMessage
                    name="codigobarra"
                    component={() => (
                      <div className="error">{errors.codigobarra}</div>
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

export default EditarArticulo;
