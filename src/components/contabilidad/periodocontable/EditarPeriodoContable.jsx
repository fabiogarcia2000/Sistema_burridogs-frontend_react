import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcionPeriodo } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreUsuario } from "../../../utils/cambiarAMayusculas";


const URLEditar = "http://190.53.243.69:3001/mc_periodo/actualizar-insertar/";

const PeriodoEditar = () => {
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "Los cambios se guardaron con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron guardar los cambios',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        break;

      default: break;
    }
  };

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_periodo_contable: "",
          descripcion_periodo: "",
          fecha_inicial: "",
          fecha_final: "",
          fecha_creacion: edit.fecha_creacion,
          nombre_usuario: edit.nombre_usuario,
          tipo_periodo: "",
          estado_periodo: "",
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id periodo contable
          if (!valores.id_periodo_contable) {
            errores.id_periodo_contable = "Por favor ingresa id periodo contable";
          } else if (!/^[0-9]+$/.test(valores.id_periodo_contable)) {
            errores.id_periodo_contable = "Escribir solo números";
          }

          // Validacion descripción periodo
          if (!valores.descripcion_periodo) {
            errores.descripcion_periodo = "Por favor ingresa la descripción del periodo";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion_periodo)) {
            errores.descripcion_periodo = "Escribir solo en MAYÚSCULAS";
          }

          // Validacion fecha inicial
          if (!valores.fecha_inicial) {
            errores.fecha_inicial = "Por favor seleccione fecha inicial";
          }

          // Validacion fecha final
          if (!valores.fecha_final) {
            errores.fecha_final = "Por favor seleccione fecha final";
          }

          // Validacion fecha creación
          if (!valores.fecha_creacion) {
            errores.fecha_creacion = "Por favor seleccione fecha creación";
          }

          // Validacion de id usuario
          if (!valores.id_usuario) {
            errores.id_usuario = "Por favor ingresa id usuario";
          } else if (!/^[0-9]+$/.test(valores.id_usuario)) {
            errores.id_usuario = "Escribir solo números";
          }

          // Validacion nombre usuario
          if (!valores.nombre_usuario) {
            errores.nombre_usuario = "Por favor ingresa nombre usuario";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.nombre_usuario)) {
            errores.nombre_usuario = "Escribir solo en MAYÚSCULAS";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}${valores.id_periodo_contable}`, valores);

            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/mostrarperiodo");
            } else {
              mostrarAlertas("error");
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrarperiodo");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Periodo Contable</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="IdPeriodo" className="form-label">
                    Id Periodo Contable:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="IdPeriodo"
                    name="id_periodo_contable"
                    placeholder="Id Periodo Contable..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_periodo_contable"
                    component={() => (
                      <div className="error">{errors.id_periodo_contable}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="DescripcionPeriodo" className="form-label">
                    Descripción Periodo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="DescripcionPeriodo"
                    name="descripcion_periodo"
                    placeholder="Descripción Periodo..."
                    onKeyUp={cambiarAMayusculasDescripcionPeriodo(values)}

                  />

                  <ErrorMessage
                    name="descripcion_periodo"
                    component={() => (
                      <div className="error">{errors.descripcion_periodo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="fechainicial" className="form-label">
                    Fecha Inicial:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fechainicial"
                    name="fecha_inicial"
                    placeholder="Fecha Inicial"
                  />

                  <ErrorMessage
                    name="fecha_inicial"
                    component={() => (
                      <div className="error">{errors.fecha_inicial}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="fechafinal" className="form-label">
                    Fecha Final:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fechafinal"
                    name="fecha_final"
                  />

                  <ErrorMessage
                    name="fecha_final"
                    component={() => (
                      <div className="error">{errors.fecha_final}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="fechacreacion" className="form-label">
                    Fecha Creación:
                  </label>
                  <Field
                    className="form-control"
                    id="fechacreacion"
                    name="fecha_creacion"
                    disabled
                  />


                  <ErrorMessage
                    name="fecha_creacion"
                    component={() => (
                      <div className="error">{errors.fecha_creacion}</div>
                    )}
                  />
                </div>
              </div>

          
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="NombreUsuario" className="form-label">
                      Nombre Usuario:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="NombreUsuario"
                      name="nombre_usuario"
                      placeholder="Nombre usuario..."
                      disabled
                      onKeyUp={cambiarAMayusculasNombreUsuario(values)}

                    />

                    <ErrorMessage
                      name="nombre_usuario"
                      component={() => (
                        <div className="error">{errors.nombre_usuario}</div>
                      )}
                    />
                  </div>
                </div>
              
              </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="tipoPeriodo" className="form-label">
                    Tipo Periodo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoPeriodo"
                    name="tipo_periodo"
                    placeholder="Tipo Periodo..."
                  >
                    <option value="1">Mensual</option>
                    <option value="0">Trimestral</option>
                    <option value="0">Anual</option>
                  </Field>


                  <ErrorMessage
                    name="tipo_periodo"
                    component={() => (
                      <div className="error">{errors.tipo_periodo}</div>
                    )}
                  />
                </div>
              </div>


              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="estadoPeriodo" className="form-label">
                    Estado periodo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="estadoPeriodo"
                    name="abierto"
                  >
                    <option value="1">Abierto</option>
                    <option value="0">Cerrado</option>
                  </Field>

                  <ErrorMessage
                    name="abierto"
                    component={() => (
                      <div className="error">{errors.abierto}</div>
                    )}
                  />
                </div>
              </div>

            </div>


            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarperiodo"
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

export default PeriodoEditar;
