import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripcion,
  cambiarAMayusculasDirección,
  cambiarAMayusculasCodigoSocio,
  cambiarAmayusculasContacto,
  cambiarAMayusculasCorreo,
} from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/socio_negocio/actualizar-insertar/";
const URLMostrarUno = "http://190.53.243.69:3001/socio_negocio/getone/";

const Formulario = () => {
  const navigate = useNavigate();

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "La categoría se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo crear la nueva categoría",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "duplicado":
        Swal.fire({
          text: "Ya existe una categoría con el código ingresado",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_socio_negocio: "",
          tipo: "",
          descripcion: "",
          direccion: "",
          telefono: "",
          contacto: "",
          correo: "",
          rtn: "",
          balance: "",
          cuenta_contable: "",
          activo: "",
          creado_por: "eaplicano",
          fecha_creacion: "now()",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de código
          if (!valores.cod_socio_negocio) {
            errores.cod_socio_negocio = "Por favor ingresa un código";
          }else if (!/^^(?=[A-Za-z]+[0-9])[A-Za-z0-9]{2,12}$/.test(valores.cod_socio_negocio)) {
            errores.cod_socio_negocio = "Escribir números y letras sin espacios. Ejemplo: C001";
          }


          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor seleccione una opción";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } //else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion)) {
          //errores.descripcion = "Escribir solo en MAYÚSCULAS";
          //}

          // Validacion dirección
          if (!valores.direccion) {
            errores.direccion = "Por favor ingrese una dirección";
          }

          // Validacion teléfono
          if (!valores.telefono) {
            errores.telefono = "Por favor ingrese un numero teléfonico";
          } else if (!/^[0-9]+$/.test(valores.telefono)) {
            errores.telefono = " Porfavor solo escriba números";
          }

          // Validacion contacto
          if (!valores.contacto) {
            errores.contacto = "Por favor ingrese un contacto";
          }

          // Validacion correo
          if (!valores.correo) {
            errores.correo = "Por favor ingrese un correo";
          }else if (! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
            errores.correo = "Ingrese un correo válido";
          }

          // Validacion rtn
          if (!valores.rtn) {
            errores.rtn = "Por favor ingrese un rtn";
          } else if (!/^[0-9]+$/.test(valores.rtn)) {
            errores.rtn = "Ingrese un R.T.N válido";
          }

          // Validacion balance
          if (!valores.balance) {
            errores.balance = "Por favor ingrese el balance";
          } else if (!/^[0-9]+$/.test(valores.balance)) {
            errores.balance = " Porfavor solo escriba números";
          }

          // Validacion cuenta contable
          if (!valores.cuenta_contable) {
            errores.cuenta_contable = "Por favor ingrese la cuenta contable";
          } else if (!/^[0-9]+$/.test(valores.cuenta_contable)) {
            errores.cuenta_contable = " Porfavor solo escriba números";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingrese un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            const res = await axios.get(
              `${URLMostrarUno}${valores.cod_socio_negocio}`
            );
            console.log(res);
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista
              const res = await axios.put(
                `${URLCrear}${valores.cod_socio_negocio}`,
                valores
              );
              if (res.status === 200) {
                mostrarAlertas("guardado");
                navigate("/mostrarsocios");
              } else {
                mostrarAlertas("error");
              }
            } else {
              mostrarAlertas("duplicado");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrarsocios");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Socio de Negocio</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codSocio" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codSocio"
                    name="cod_socio_negocio"
                    placeholder="Código del Socio..."
                    onKeyUp={cambiarAMayusculasCodigoSocio(values)}
                  />

                  <ErrorMessage
                    name="cod_socio_negocio"
                    component={() => (
                      <div className="error">{errors.cod_socio_negocio}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="tipoSocio" className="form-label">
                    Tipo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoSocio"
                    name="tipo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="C">Cliente</option>
                    <option value="P">Proveedor</option>
                  </Field>

                  <ErrorMessage
                    name="tipo"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcionSocio" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionSocio"
                    name="descripcion"
                    placeholder="Descripción..."
                    onKeyUp={cambiarAMayusculasDescripcion(values)}
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
                  <label htmlFor="direcciónSocio" className="form-label">
                    Dirección:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="direcciónSocio"
                    name="direccion"
                    placeholder="Dirección del Socio..."
                    onKeyUp={cambiarAMayusculasDirección(values)}
                  />

                  <ErrorMessage
                    name="direccion"
                    component={() => (
                      <div className="error">{errors.direccion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="telefonoSocio" className="form-label">
                    Teléfono:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="telefonoSocio"
                    name="telefono"
                    placeholder="Número de Teléfono..."
                  />

                  <ErrorMessage
                    name="telefono"
                    component={() => (
                      <div className="error">{errors.telefono}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="contactoSocio" className="form-label">
                    Contacto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="contactoSocio"
                    name="contacto"
                    placeholder="Contacto..."
                    onKeyUp={cambiarAmayusculasContacto(values)}
                  />

                  <ErrorMessage
                    name="contacto"
                    component={() => (
                      <div className="error">{errors.contacto}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="correoSocio" className="form-label">
                    Correo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correoSocio"
                    name="correo"
                    placeholder="Correo del Socio..."
                    
                  />

                  <ErrorMessage
                    name="correo"
                    component={() => (
                      <div className="error">{errors.correo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="rtnSocio" className="form-label">
                    RTN:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSocio"
                    name="rtn"
                    placeholder="RTN del Socio..."
                  />

                  <ErrorMessage
                    name="rtn"
                    component={() => <div className="error">{errors.rtn}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="balanceSocio" className="form-label">
                    Balance:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigobarraArticulo"
                    name="balance"
                    placeholder="Balance..."
                  />

                  <ErrorMessage
                    name="balance"
                    component={() => (
                      <div className="error">{errors.balance}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="cuentaSocio" className="form-label">
                    Cuenta Contable:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cuentaSocio"
                    name="cuenta_contable"
                    placeholder="Cuenta Contable..."
                  />

                  <ErrorMessage
                    name="cuenta_contable"
                    component={() => (
                      <div className="error">{errors.cuenta_contable}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="estadoSocio" className="form-label">
                    Estado:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="estadoSocio"
                    name="activo"
                  >
                    <option value="">Seleccionar...</option>
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
              to="/mostrarsocios"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
