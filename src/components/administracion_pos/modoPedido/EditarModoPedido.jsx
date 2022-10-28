import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditarModoPedido = () => {
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
          id_modo_pedido: id,
          descripcion: "",
          creado_por: "",
          fecha_creacion: "",
          modificado_por: "",
          fecha_modificacion: "",
          estado: "Activo",
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.id_modo_pedido) {
            errores.id_modo_pedido = "Por favor ingresa un id";
          } else if (!/^^[0-9]+$/.test(valores.id_modo_pedido)) {
            errores.id_modo_pedido = "El id solo puede contener números";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } 

          // Validacion estado
          if (!valores.estado) {
            errores.estado = "Por favor ingresa un estado";
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
            <h3 className="mb-3">Nuevo Modo Pedido</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idModoPedido" className="form-label">
                    ID de Modo Pedido:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idModoPedido"
                    name="id"
                    placeholder="ID de ModoPedido..."
                  />

                  <ErrorMessage
                    name="id"
                    component={() => (
                      <div className="error">{errors.id_modo_pedido}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionModoPedido" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionModoPedido"
                    name="descripcion"
                    placeholder="Descripcion..."
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
                <label htmlFor="estadoModoPedido" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoMetodoPedido"
                  name="estado"
                > 
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="estado"
                  component={() => (
                    <div className="error">{errors.estado}</div>
                  )}
                />
              </div>
              <hr />
            </div>


            <button className="btn btn-success mb-3 me-2" type="submit">Guardar</button>
            <Link to="/mostrarmodopedido" type="button" className='btn btn-danger mb-3 me-2'>Cancelar</Link>

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

export default EditarModoPedido;
