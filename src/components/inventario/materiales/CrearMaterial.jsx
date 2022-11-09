import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URLCrear =
  "http://190.53.243.69:3001/lista_materiales/actualizar-insertar/";

const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_articulo_padre: "",
          id_articulo_hijo: "",
          cantidad: "",
          comentario: "",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id padre
          if (!valores.id_articulo_padre) {
            errores.id_articulo_padre = "Por favor ingresa un id";
          }

          // Validacion id hijo
          if (!valores.id_articulo_hijo) {
            errores.id_articulo_hijo = "Por favor ingresa un id";
          }

          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingresa una cantidad";
          }

          // Validacion comentario
          if (!valores.comentario) {
            errores.comentario = "Por favor ingresa una comentario";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el nuevo registro
          console.log(valores);
          try {
            const res = await axios.put(
              `${URLCrear}${valores.id_articulo_padre}`,
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
          navigate("/mostrarmateriales");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Nuevo Material</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codPdMaterial" className="form-label">
                    Código Padre:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codPdMaterial"
                    name="id_articulo_padre"
                    placeholder="Código del Material..."
                  />

                  <ErrorMessage
                    name="id_articulo_padre"
                    component={() => (
                      <div className="error">{errors.id_articulo_padre}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codHjArticulo" className="form-label">
                    Código Hijo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codHjArticulo"
                    name="id_articulo_hijo"
                    placeholder="Código Hijo..."
                  />

                  <ErrorMessage
                    name="id_articulo_hijo"
                    component={() => (
                      <div className="error">{errors.id_articulo_hijo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cantidadArticulo" className="form-label">
                    Cantidad:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cantidadArticulo"
                    name="cantidad"
                    placeholder="Cantidad..."
                  />

                  <ErrorMessage
                    name="cantidad"
                    component={() => (
                      <div className="error">{errors.cantidad}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="comentarioArticulo" className="form-label">
                    Comentario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="comentarioArticulo"
                    name="comentario"
                    placeholder="Comentario..."
                  />

                  <ErrorMessage
                    name="comentario"
                    component={() => (
                      <div className="error">{errors.comentario}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarmateriales"
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
