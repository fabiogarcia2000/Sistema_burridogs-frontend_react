import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";

const URLEditar = "http://190.53.243.69:3001/centro_costo/actualizar-insertar/";


 const FormularioEditar = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_centro_costo: edit.cod_centro_costo,
          descripcion: edit.descripcion,
          activo: edit.activo,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27"
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de código
          if (!valores.cod_centro_costo) {
            errores.cod_centro_costo = "Por favor ingresar un código";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
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
            const res = await axios.put(`${URLEditar}${valores.cod_centro_costo}`, valores);
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
          navigate("/MostrarCentroCosto");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Editar Centro de Costo</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codCentroCosto" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codCentroCosto"
                    name="cod_centro_costo"
                    placeholder="Código..."
                    
                  />

                  <ErrorMessage
                    name="cod_centro_costo"
                    component={() => (
                      <div className="error">{errors.cod_centro_costo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionCentroCosto" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionCentroCosto"
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
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoCentroCosto" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoCentroCosto"
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
              to="/MostrarCentroCosto"
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
