import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URLCrear = "http://190.53.243.69:3001/unidad_medida/actualizar-insertar/";

const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_unidad_medida: "",
          descripcion: "",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
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
          //procedimineto para guardar el nuevo registro
          console.log(valores);
          try {
            const res = await axios.put(
              `${URLCrear}${valores.cod_unidad_medida}`,
              valores
            );

            if (res.status === 200) {
              alert("Guardado!");
            } else {
              alert("Error al guardar");
            }
          } catch (error) {
            console.log(error);
          }

          console.log("Formulario enviado");
          setFormularioEnviado(true);
          navigate("/mostrarunidadesmedida");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Nueva Unidad de Medida</h3>
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

export default Formulario;
