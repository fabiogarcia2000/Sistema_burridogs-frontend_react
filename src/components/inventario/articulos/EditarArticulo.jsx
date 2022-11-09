import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";

const URLEditar = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const FormularioEditar = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_articulo: edit.cod_articulo,
          tipo: edit.tipo,
          descripcion: edit.descripcion,
          descripcion_corta: edit.descripcion_corta,
          id_impuesto: edit.id_impuesto,
          id_categoria: edit.id_categoria,
          precio: edit.precio,
          id_unidad_venta: edit.id_unidad_venta,
          id_socio_negocio: edit.id_socio_negocio,
          id_unidad_compra: edit.id_unidad_compra,
          codigo_barra: edit.codigo_barra,
          id_unidad_medida: edit.id_unidad_medida,
          activo: edit.activo,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.cod_articulo) {
            errores.cod_articulo = "Por favor ingresa un código";
          }

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor ingresa el tipo";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion descripción corta
          if (!valores.descripcion_corta) {
            errores.descripcion_corta =
              "Por favor ingresa una descripción corta";
          }

          // Validacion impuesto
          if (!valores.id_impuesto) {
            errores.id_impuesto = "Por favor ingrese un impuesto";
          }

          // Validacion categoría
          if (!valores.id_categoria) {
            errores.id_categoria = "Por favor ingresa la categoría";
          }

          // Validacion precio
          if (!valores.precio) {
            errores.precio = "Por favor ingrese el precio";
          }

          // Validacion unidad de venta
          if (!valores.id_unidad_venta) {
            errores.id_unidad_venta = "Por favor ingrese unidades";
          } else if (!/^^[0-9]+$/.test(valores.id_unidad_venta)) {
            errores.id_unidad_venta =
              "Las unidades de venta solo puede contener números";
          }

          // Validacion socio negocio
          if (!valores.id_socio_negocio) {
            errores.id_socio_negocio = "Por favor ingrese el precio";
          }

          // Validacion unidad de compra
          if (!valores.id_unidad_compra) {
            errores.id_unidad_compra = "Por favor ingrese el precio";
          }

          // Validacion código de barra
          if (!valores.codigo_barra) {
            errores.codigo_barra = "Por favor ingresa el código de barra";
          } else if (!/^^[0-9]+$/.test(valores.codigo_barra)) {
            errores.codigo_barra =
              "El código de barra solo puede contener números";
          }

          // Validacion unidad medida
          if (!valores.id_unidad_medida) {
            errores.id_unidad_medida = "Por favor ingrese el precio";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingresa un estado";
          }
          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar los cambios
          try {
            const res = await axios.put(
              `${URLEditar}${valores.cod_articulo}`,
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
          navigate("/mostrararticulos");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Editar Artículo</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codArticulo" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codArticulo"
                    name="cod_articulo"
                    placeholder="Código del Artículo..."
                  />

                  <ErrorMessage
                    name="cod_articulo"
                    component={() => (
                      <div className="error">{errors.cod_articulo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="tipoArticulo" className="form-label">
                    Tipo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="tipoArticulo"
                    name="tipo"
                    placeholder="Tipo de artículo..."
                  />

                  <ErrorMessage
                    name="tipo"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcionArticulo" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionArticulo"
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
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcortaArticulo" className="form-label">
                    Descripción corta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcortaArticulo"
                    name="descripcion_corta"
                    placeholder="Descripción corta..."
                  />

                  <ErrorMessage
                    name="descripcion_corta"
                    component={() => (
                      <div className="error">{errors.descripcion_corta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="impuestoArticulo" className="form-label">
                    ID Impuesto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="impuestoArticulo"
                    name="id_impuesto"
                    placeholder="Impuesto..."
                  />

                  <ErrorMessage
                    name="id_impuesto"
                    component={() => (
                      <div className="error">{errors.id_impuesto}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="categoriaArticulo" className="form-label">
                    ID Categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="categoriaArticulo"
                    name="id_categoria"
                    placeholder="Categoría del artículo..."
                  />

                  <ErrorMessage
                    name="id_categoria"
                    component={() => (
                      <div className="error">{errors.id_categoria}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="precioArticulo" className="form-label">
                    Precio:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="precioArticulo"
                    name="precio"
                    placeholder="Precio de venta..."
                  />

                  <ErrorMessage
                    name="precio"
                    component={() => (
                      <div className="error">{errors.precio}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadventaArticulo" className="form-label">
                    ID Unidad Venta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadventaArticulo"
                    name="id_unidad_venta"
                    placeholder="ID Unidad Venta.."
                  />

                  <ErrorMessage
                    name="id_unidad_venta"
                    component={() => (
                      <div className="error">{errors.id_unidad_venta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="socionegocioArticulo" className="form-label">
                    ID Socio Negocio:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="socionegocioArticulo"
                    name="id_socio_negocio"
                    placeholder="ID Socio de Negocio..."
                  />

                  <ErrorMessage
                    name="id_socio_negocio"
                    component={() => (
                      <div className="error">{errors.id_socio_negocio}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadcompraArticulo" className="form-label">
                    ID Unidad Compra:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadcompraArticulo"
                    name="id_unidad_compra"
                    placeholder="ID Unidad Compra..."
                  />

                  <ErrorMessage
                    name="id_unidad_compra"
                    component={() => (
                      <div className="error">{errors.id_unidad_compra}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codigobarraArticulo" className="form-label">
                    Código de Barra:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigobarraArticulo"
                    name="codigo_barra"
                    placeholder="Código de Barra..."
                  />

                  <ErrorMessage
                    name="codigo_barra"
                    component={() => (
                      <div className="error">{errors.codigo_barra}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="unidadmedidaArticulo" className="form-label">
                    ID Unidad Medida:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="unidadmedidaArticulo"
                    name="id_unidad_medida"
                    placeholder="ID Unidad Medida..."
                  />

                  <ErrorMessage
                    name="id_unidad_medida"
                    component={() => (
                      <div className="error">{errors.id_unidad_medida}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="estadoArticulo" className="form-label">
                    Estado:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="estadoArticulo"
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
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrararticulos"
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
