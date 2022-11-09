import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URLCrear = "http://190.53.243.69:3001/pos/actualizar-insertar/";


const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_pos: "",
          descripcion: "",
          id_sucursal: "",
          activo: "1",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",         
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

            // Validacion de código no vacio
            if (!valores.cod_pos) {
              errores.cod_pos = "Por favor ingresa un código";
            }

            // Validacion descripción
            if (!valores.descripcion) {
              errores.descripcion = "Por favor ingresa una descripción";
            }
            //validacion Id sucursal
            if (!valores.id_sucursal) {
              errores.cod_pos = "Por favor ingresa un código";
            }
            // Validacion estado
            if (!valores.activo) {
              errores.activo = "Por favor ingresa un estado";
            }
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el nuevo registro
          try {
              const res = await axios.put(`${URLCrear}${valores.cod_pos}`, valores);
              console.log(res.data);

              console.log("Guardando....");
                if (res.status === 200) {
                  alert("Guardado!");
                } else {
                  alert("ERROR al Guardar :(");
                }

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
          navigate("/mostrarPOS");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Nuevo POS</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codPOS" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codPOS"
                    name="cod_POS"
                    placeholder="Código..."
                  />

                  <ErrorMessage
                    name="cod_POS"
                    component={() => (
                      <div className="error">{errors.cod_pos}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionPOS" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionPOS"
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
                  <label htmlFor="sucursalPOS" className="form-label">
                    Sucursal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="sucursalPOS"
                    name="sucursal"
                    placeholder="Sucursal..."
                  />

                  <ErrorMessage
                    name="sucursal"
                    component={() => (
                      <div className="error">{errors.id_sucursal}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoPOS" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoCategoria"
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
              to="/mostrarPOS"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>

            {/*Mostrar mensaje de éxito al enviar formulario */}
            {formularioEnviado && (
              <p className="exito">Formulario enviado con éxito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
