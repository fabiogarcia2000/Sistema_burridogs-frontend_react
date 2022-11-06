import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const URLCrear = "http://190.53.243.69:3001/descuento/actualizar-insertar/";
const URLMostrarUno = "http://190.53.243.69:3001/descuento/getone/";

const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const navigate = useNavigate();

  //Alertas de éxito o error
  //alerta de éxito al insertar un registro
  const mostrarAlertaExito = () =>{
    Swal.fire({
      title: '¡Guardado!',
      text: "El descuento se creó con éxito",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
  };

  //alerta de error al crear un registro 
  const mostrarAlertaError = () =>{
    Swal.fire({
      title: 'Error',
      text:  'No se pudo crear el nuevo descuento',
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
          cod_descuento: "",
          descripcion: "",
          porcentaje: "",
          activo: "1",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion código
          if (!valores.cod_descuento) {
            errores.cod_descuento = "Por favor ingresa un código";
          } else if (!/^[0-9]+$/.test(valores.cod_descuento)) {
            errores.cod_descuento = "Escribir solo números";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#*% ]+$/.test(valores.descripcion)) {
            errores.descripcion = "Escribir solo en MAYÚSCULAS";
          } 

          // Validacion porcentaje
          if (!valores.porcentaje) {
            errores.porcentaje = "Por favor ingresa un porcentaje";
          } else if (!/^^\d*\.\d+$/.test(valores.porcentaje)) {
            errores.porcentaje = "Escribir el porcentaje en decimal. Ejemplo: 0.10";
          } else if (!/^^[0-9-.]+$/.test(valores.porcentaje)) {
            errores.porcentaje = "Solo números";
          } 

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingresar un estado";
          } 


          return errores;
        }}
        onSubmit={async (valores) => {
          //Corroborar que el registro crear no exista
          try {
            const res = await axios.get(`${URLMostrarUno}${valores.cod_descuento}`);
            console.log(res);
            console.log("One")
            if (res.data){

            }
          } catch (error) {

          }

         //procedimineto para guardar el nuevo registro
         try {
          const res = await axios.put(`${URLCrear}${valores.cod_descuento}`, valores);
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
                    placeholder="Código..."
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
                    type="text"
                    className="form-control"
                    id="poorcentajeDescuento"
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
