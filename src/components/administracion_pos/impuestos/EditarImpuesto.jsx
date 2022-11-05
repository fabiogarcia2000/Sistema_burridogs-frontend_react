import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";

const URLEditar = "http://190.53.243.69:3001/impuesto/actualizar-insertar/";

const FormularioEditar = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_impuesto:edit.cod_impuesto ,
          descripcion:edit.descripcion,
          porcentaje:edit.porcentaje,
          tipo:edit.tipo,
          activo:edit.activo,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.cod_impuesto) {
            errores.cod_impuesto = "Por favor ingrese un código";
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
            errores.tipo = "Por favor seleccione un tipo de Impuesto";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el nuevo registro
          console.log(valores)
          try {
              const res = await axios.put(`${URLEditar}${valores.cod_impuesto}`, valores);
              console.log("Insertando....");
                if (res.status === 200) {
                  alert("Guardado!");
                } else{
                  alert("Error al guardar");
                }
          } catch (error) {
            console.log(error);
          }

          console.log("Formulario enviado");
          setFormularioEnviado(true);
          navigate("/mostrarimpuestos");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Editar Impuesto</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idImpuesto" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idImpuesto"
                    name="cod_impuesto"
                    placeholder="Código..."
                    disabled readonly
                  />

                  <ErrorMessage
                    name="cod_impuesto"
                    component={() => <div className="error">{errors.cod_impuesto}</div>}
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
                    type="number"
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
                    Tipo de Impuesto:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoImpuesto"
                    name="tipo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="I">Inclusivo</option>
                    <option value="E">Exclusivo</option>
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
                  name="activo"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => <div className="error">{errors.activo}</div>}
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

export default FormularioEditar;
