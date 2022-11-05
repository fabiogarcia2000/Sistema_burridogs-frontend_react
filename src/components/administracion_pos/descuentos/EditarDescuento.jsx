import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";

const URLEditar = "http://190.53.243.69:3001/descuento/actualizar-insertar/";

const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  //Alertas de éxito o error
  //alerta de éxito al editar un registro
  const mostrarAlertaExito = () =>{
    Swal.fire({
      title: '¡Guardado!',
      text: "Los cambios se guardaron con éxito",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
  };

  //alerta de error al guardar los cambios 
  const mostrarAlertaError = () =>{
    Swal.fire({
      title: 'Error',
      text:  'No se pudieron guardar los cambios',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
  };

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_descuento: edit.cod_descuento,
          descripcion: edit.descripcion,
          porcentaje: edit.porcentaje,
          activo: edit.activo,
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.cod_descuento) {
            errores.cod_descuento = "Por favor ingresa un código";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } 

          // Validacion porcentaje
          if (!valores.porcentaje) {
            errores.porcentaje = "Por favor ingresa un porcentaje";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingresar un estado";
          } 


          return errores;
        }}
        onSubmit={async (valores) => {
         //procedimineto para guardar el nuevo registro
         try {
          const res = await axios.put(`${URLEditar}${valores.cod_descuento}`, valores);

             if (res.status === 200) {
              mostrarAlertaExito();
            } else {
              mostrarAlertaError();
            }


        } catch (error) {
          console.log(error);
          mostrarAlertaError();
        }

        console.log("Formulario enviado");
        setFormularioEnviado(true);
        navigate("/mostrardescuentos");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Nuevo Descuento</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idDescuento" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idDescuento"
                    name="cod_descuento"
                    placeholder="ID de Descuento..."
                    disabled readonly
                  />

                  <ErrorMessage
                    name="cod_descuento"
                    component={() => <div className="error">{errors.cod_descuento}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionDescuento" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionDescuento"
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
                  <label htmlFor="poorcentajeDescuento" className="form-label">
                    Porcentaje:
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="poorcentajeDescuento"
                    name="porcentaje"
                    placeholder="Dirección..."
                  />

                  <ErrorMessage
                    name="porcentaje"
                    component={() => (
                      <div className="error">{errors.porcentaje}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="estadoDescuento" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoDescuento"
                  name="activo"
                > 
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
                />
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">Guardar</button>
            <Link to="/mostrardescuentos" type="button" className='btn btn-danger mb-3 me-2'>Cancelar</Link>

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
