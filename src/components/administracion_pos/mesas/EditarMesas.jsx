import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditarMesas = () => {
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
              id_mesa: "",
              id_mapa:"",
              descripcion: "",
              pos_x: "",
              pos_y: "",
              creado_por: "",
              fecha_creacion: "",
              modificado_por: "",
              fecha_modificacion: "",
              estado:"",
            }}
            //Funcion para validar
            validate={(valores) => {
              let errores = {};
    
              // Validacion id
              if (!valores.id) {
                errores.id = "Por favor ingresa un código";
              } else if (!/^^[0-9]+$/.test(valores.id)) {
                errores.id = "El código solo puede contener números";
              }
    
              // Validacion id mapa
              if (!valores.id_mapa) {
                errores.tipo = "Por favor ingresa un codigo";
              }
    
              // Validacion descripcion
              if (!valores.descripcion) {
                errores.descripcion = "Por favor ingresa una descripcion";
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
                <h3 className="mb-3">Nueva Mesa</h3>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="idpos" className="form-label">
                        Id:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="idpos"
                        name="id"
                        placeholder="id de la mesa..."
                      />
    
                      <ErrorMessage
                        name="id"
                        component={() => <div className="error">{errors.id}</div>}
                      />
                    </div>
                  </div>
    
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="idMapa" className="form-label">
                        ID Mapa:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="idMapa"
                        name="Tipo"
                        placeholder="id Mapa..."
                      />
    
                      <ErrorMessage
                        name="descripcion"
                        component={() => <div className="error">{errors.id_mapa}</div>}
                      />
                    </div>
                  </div>
                </div>
    
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripcion:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="direccionSucursal"
                        name="descripcion"
                        placeholder="Ingrese..."
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
                      <label htmlFor="posx" className="form-label">
                        Posicion x:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="posx"
                        name="posicionx"
                        placeholder="Ingrese..."
                      />
    
                      <ErrorMessage
                        name="posicion x"
                        component={() => (
                          <div className="error">{errors.pos_x}</div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-sm-6">
                    <div className="mb-3">
                        <label htmlFor="posy" className="form label">
                            Posicion Y
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="posy"
                        name="posicion y"
                        placeholder="Ingrese"
                        />
    
                        <ErrorMessage
                        name="posicion y"
                        component={() => (
                            <div classname="error">{errors.pos_y}</div>
                        )}
                        />
                    </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="estadoMesas" className="form-label">
                      Estado:
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="estadoMesas"
                      name="estado"
                    > 
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </Field>
    
                    <ErrorMessage
                      name="estado"
                      component={() => (
                        <div className="error">{errors.activo}</div>
                      )}
                    />
                  </div>
                  <hr />
                </div>
                
    
                <button className="btn btn-success mb-3 me-2" type="submit">
                  Guardar
                </button>
                <Link
                  to="/MostrarMesas"
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
    
export default EditarMesas;