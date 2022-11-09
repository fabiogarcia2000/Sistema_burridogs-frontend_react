import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URLCrear = "http://190.53.243.69:3001/correlativo/actualizar-insertar/";


const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_pos: "",
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
            if (!valores.id_pos) {
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
          //Enviar los datos (petición Post)
          //procedimineto para guardar el nuevo registro
          try {
            const res = await axios.put(`${URLCrear}${valores.id_pos}`, valores);
            console.log(valores);
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
          navigate("/mostrartalonarioSAR");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Crear Correlativo</h3>
            <div className="row g-3">
            <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="id_Pos" className="form-label">
                    POS:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="id_Pos"
                    name="id_Pos"
                    placeholder="id_Pos..."
                  />

                  <ErrorMessage
                    name="id_Pos"
                    component={() => (
                      <div className="error">{errors.id_Pos}</div>
                    )}
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cai" className="form-label">
                    CAi:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cai"
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

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="sucursal_sar" className="form-label">
                    Sucursal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="sucursal_sar"
                    name="sucursal_sar"
                    placeholder="sucursal_sar..."
                  />

                  <ErrorMessage
                    name="sucursal_sar"
                    component={() => (
                      <div className="error">{errors.sucursal_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="terminal_sar" className="form-label">
                    Terminal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="terminal_sar"
                    name="terminal_sar"
                    placeholder="terminal_sar..."
                  />

                  <ErrorMessage
                    name="terminal_sar"
                    component={() => (
                      <div className="error">{errors.terminal_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="tipo_documento_sar" className="form-label">
                    Documento:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="tipo_documento_sar"
                    name="tipo_documento_sar"
                    placeholder="tipo_documento_sar..."
                  />

                  <ErrorMessage
                    name="tipo_documento_sar"
                    component={() => (
                      <div className="error">{errors.tipo_documento_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="correlativo_inicial" className="form-label">
                    Correlativo Inicial:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_inicial"
                    name="correlativo_inicial"
                    placeholder="correlativo_inicial..."
                  />

                  <ErrorMessage
                    name="correlativo_inicial"
                    component={() => (
                      <div className="error">{errors.correlativo_inicial}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="correlativo_final" className="form-label">
                  Correlativo Final:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_final"
                    name="correlativo_final"
                    placeholder="correlativo_final..."
                  />

                  <ErrorMessage
                    name="correlativo_final"
                    component={() => (
                      <div className="error">{errors.correlativo_final}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="correlativo_actual" className="form-label">
                  Correlativo Actual:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_actual"
                    name="correlativo_actual"
                    placeholder="correlativo_actual..."
                  />

                  <ErrorMessage
                    name="correlativo_actual"
                    component={() => (
                      <div className="error">{errors.correlativo_actual}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="terminal_sar" className="form-label">
                    Terminal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="terminal_sar"
                    name="terminal_sar"
                    placeholder="terminal_sar..."
                  />

                  <ErrorMessage
                    name="terminal_sar"
                    component={() => (
                      <div className="error">{errors.terminal_sar}</div>
                    )}
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="Fecha_Vencimiento" className="form-label">
                   Fecha Vencimiento:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Fecha_Vencimiento"
                    name="Fecha_Vencimiento"
                    placeholder="Fecha Vencimiento..."
                  />

                  <ErrorMessage
                    name="Fecha_Vencimiento"
                    component={() => (
                      <div className="error">{errors.fecha_vencimiento}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="Siguiente" className="form-label">
                   Siguiente:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Siguiente"
                    name="Siguiente"
                    placeholder="Siguiente..."
                  />

                  <ErrorMessage
                    name="Siguiente"
                    component={() => (
                      <div className="error">{errors.siguiente}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoCai" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoCai"
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
