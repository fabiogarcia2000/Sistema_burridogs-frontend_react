import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCAI } from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/correlativo/actualizar-insertar/";
const UrlMostrarPOS = "http://190.53.243.69:3001/pos/getall";


const Formulario = () => {

  const navigate = useNavigate();

  //procedimineto para obtener todos los pos y mostrarlas en select
  const [pos, setpos] = useState([]);
  useEffect(() => {
    getpos();
  }, []);

    //petición a api
    const getpos = async () => {
      try {
        const res = await axios.get(UrlMostrarPOS);
        setpos(res.data);
      } catch (error) {
        console.log(error);
        mostrarAlertas("errormostrar");
      }
    };

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El correlativo se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el nuevo correlativo',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un correlativo con el código ingresado',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      default: break;
    }
  };


  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
            id_correlativo: 0,
            id_pos: "",
            cai:"",
            sucursal_sar:"",
            terminal_sar: "",
            tipo_documento_sar: "",
            correlativo_inicial:"",
            correlativo_final:"",
            correlativo_actual:"",
            fecha_vencimiento:"",
            activo: "1",
            siguiente:"1",
            creado_por: "autorPrueba",
            fecha_creacion: "2022/10/27",         
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

            // Validacion de código
            if (!valores.id_pos) {
              errores.id_pos = "Por favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.id_pos)) {
              errores.id_pos = "Escribir solo números";
            }

  
            // Validacion cai
            if (!valores.cai) {
              errores.cai = "Por favor ingresa un valor";
            } //else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion)) {
              //errores.descripcion = "Escribir solo en MAYÚSCULAS";
            //}
            
            // Validacion Sucursal
            if (!valores.sucursal_sar) {
              errores.sucursal_sar = "Por favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.sucursal_sar)) {
              errores.sucursal_sar = "Escribir solo números";
            }
            
            // Validacion Terminal
            if (!valores.terminal_sar) {
              errores.terminal_sar = "Por favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.terminal_sar)) {
              errores.terminal_sar = "Escribir solo números";
            }

            // Validacion Tipo Documento
            if (!valores.tipo_documento_sar) {
              errores.tipo_documento_sar = "Por Favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.tipo_documento_sar)) {
              errores.tipo_documento_sar ="Escribir solo números";
            }

            // Validacion Correlativo Inicial
            if (!valores.correlativo_inicial) {
              errores.correlativo_inicial = "Por Favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.correlativo_inicial)) {
              errores.correlativo_inicial ="Escribir solo números";
            }

            // Validacion Correlativo Final
            if (!valores.correlativo_final) {
              errores.correlativo_final = "Por Favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.correlativo_final)) {
              errores.correlativo_final ="Escribir solo números";
            }

            // Validacion Correlativo Actual
            if (!valores.correlativo_actual) {
              errores.correlativo_actual = "Por Favor ingresa un código";
            } else if (!/^[0-9]+$/.test(valores.correlativo_actual)) {
              errores.correlativo_actual ="Escribir solo números";
            }

            // Validacion Siguiente
            if (!valores.siguiente) {
              errores.siguiente = "Por favor selecciona una opción";
            }

            // Validacion estado
            if (!valores.activo) {
              errores.activo = "Por favor selecciona un estado";
            }
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            //procedimineto para guardar el nuevo registro en el caso de que no exista
            console.log(valores)
            const res = await axios.put(`${URLCrear}${valores.id_correlativo}`, valores);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/mostrartalonarioSAR");
          } else {
            mostrarAlertas("error");
          }
                            
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrartalonarioSAR");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Crear Correlativo</h3>
            <div className="row g-3">
            <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="POS" className="form-label">
                    POS:
                  </label>
                  <Field
                  as="select"
                  className="form-select"
                  id="pos"
                  name="id_pos"
                >
                  <option value="">Seleccionar...</option>
                  {pos.map((item, i) =>(
                    <option key={i} value={item.id_pos}>{item.descripcion_pos}</option>
                  ))}
                </Field>

                  <ErrorMessage
                    name="id_pos"
                    component={() => (
                      <div className="error">{errors.id_pos}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="cai" className="form-label">
                    CAI:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cai"
                    name="cai"
                    placeholder="CAI..."
                    onKeyUp={cambiarAMayusculasCAI(values)}
                  />

                  <ErrorMessage
                    name="cai"
                    component={() => (
                      <div className="error">{errors.cai}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="sucursal_sar" className="form-label">
                    Sucursal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="sucursal_sar"
                    name="sucursal_sar"
                    placeholder="Sucursal SAR..."
                  />

                  <ErrorMessage
                    name="sucursal_sar"
                    component={() => (
                      <div className="error">{errors.sucursal_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="terminal_sar" className="form-label">
                    Terminal:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="terminal_sar"
                    name="terminal_sar"
                    placeholder="Terminal SAR..."
                  />

                  <ErrorMessage
                    name="terminal_sar"
                    component={() => (
                      <div className="error">{errors.terminal_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="tipo_documento_sar" className="form-label">
                    Documento:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="tipo_documento_sar"
                    name="tipo_documento_sar"
                    placeholder="Tipo Documento..."
                  />

                  <ErrorMessage
                    name="tipo_documento_sar"
                    component={() => (
                      <div className="error">{errors.tipo_documento_sar}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="correlativo_inicial" className="form-label">
                    Correlativo Inicial:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_inicial"
                    name="correlativo_inicial"
                    placeholder="Correlativo Inicial..."
                  />

                  <ErrorMessage
                    name="correlativo_inicial"
                    component={() => (
                      <div className="error">{errors.correlativo_inicial}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="correlativo_final" className="form-label">
                  Correlativo Final:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_final"
                    name="correlativo_final"
                    placeholder="Correlativo Final..."
                  />

                  <ErrorMessage
                    name="correlativo_final"
                    component={() => (
                      <div className="error">{errors.correlativo_final}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="correlativo_actual" className="form-label">
                  Correlativo Actual:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="correlativo_actual"
                    name="correlativo_actual"
                    placeholder="Correlativo Actual..."
                  />

                  <ErrorMessage
                    name="correlativo_actual"
                    component={() => (
                      <div className="error">{errors.correlativo_actual}</div>
                    )}
                  />
                </div>
              </div>
              
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="Fecha_Vencimiento" className="form-label">
                   Fecha Vencimiento:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="Fecha_Vencimiento"
                    name="fecha_vencimiento"
                    placeholder="Fecha Vencimiento..."
                  />

                  <ErrorMessage
                    name="fecha_vencimiento"
                    component={() => (
                      <div className="error">{errors.fecha_vencimiento}</div>
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

              <div className="row g-3">
                <div className="col-md-4 mb-3">
                  <label htmlFor="Siguiente" className="form-label">
                   Siguiente:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="Siguiente"
                    name="siguiente"
                    
                  >
                    <option value="1">Si</option>
                    <option value="0">No</option>
                  </Field>
                  <ErrorMessage
                    name="siguiente"
                    component={() => (
                      <div className="error">{errors.siguiente}</div>
                    )}
                  />
                </div>
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrartalonarioSAR"
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
