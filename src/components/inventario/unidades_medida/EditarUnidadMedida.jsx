import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";

const URLEditar =
  "http://190.53.243.69:3001/unidad_medida/actualizar-insertar/";

const FormularioEditar = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_unidad_medida: edit.cod_unidad_medida,
          descripcion: edit.descripcion,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion código
          if (!valores.cod_unidad_medida) {
            errores.cod_unidad_medida = "Por favor ingresa un código";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(
              `${URLEditar}${valores.cod_unidad_medida}`,
              valores
            );
            console.log("Insertando....");
            if (res.status === 200) {
              alert("Guardado!");
            } else {
              alert("ERROR al Guardar :(");
            }
          } catch (error) {
            console.log(error);
            alert("ERROR - No se ha podido insertar :(");
          }

          console.log("Formulario enviado");
          setFormularioEnviado(true);
          navigate("/mostrarunidadesmedida");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Editar Unidad de Medida</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codMedida" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codMedida"
                    name="cod_unidad_medida"
                    placeholder="Código de la medida..."
                  />

                  <ErrorMessage
                    name="cod_unidad_medida"
                    component={() => (
                      <div className="error">{errors.cod_unidad_medida}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionMedida" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionMedida"
                    name="descripcion"
                    placeholder="Descripcion de la unidad de medida..."
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

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarunidadesmedida"
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
