import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalState } from "../../../globalStates/globalStates";
import { cambiarAMayusculasDescripcionPeriodo } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLCrear = "http://190.53.243.69:3001/mc_periodo/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/mc_periodo/getone/";

const current = new Date();
const date = `${current.getFullYear()}/${
  current.getMonth() + 1
}/${current.getDate()}`;

const objeto = "FORM_PERIODO_CONTABLE";
const PeriodoCrear = () => {
  const [edit] = useGlobalState("registroEdit");
  const navigate = useNavigate();
  //===================Obtener datos del localstorage=====================
  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true);

  const Permisos = () => {
    const newData = temp.filter((item) => item.objeto === objeto);
    setPermisos(newData);
  };

  useEffect(() => {
    let data = localStorage.getItem("permisos");
    if (data) {
      setTemp(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);

  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);

  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar);
  };
  //================================================================

  const userdata = JSON.parse(localStorage.getItem("data"));
  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "El periodo contable se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el periodo contable",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "duplicado":
        Swal.fire({
          text: "Ya existe ese periodo contable",
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
          descripcion_periodo: "",
          fecha_inicial: "",
          fecha_final: "",
          fecha_creacion: date,
          id_usuario: userdata.data.id,
          tipo_periodo: "",
          estado_periodo: "",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion descripción periodo
          if (!valores.descripcion_periodo) {
            errores.descripcion_periodo =
              "Por favor ingresa la descripción del periodo";
          } else if (
            !/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion_periodo)
          ) {
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
          if (!valores.tipo_periodo) {
            errores.tipo_periodo = "Por favor seleccione el tipo de periodo";
          }
          if (!valores.estado_periodo) {
            errores.estado_periodo = "Por favor seleccione una opcion";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          console.log(valores);
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
          try {
            const res = await axios.put(`${URLCrear}`, valores);
            if (res.status === 200) {
              console.log(res);
              mostrarAlertas("guardado");
              RegistroEnVitacora(
                permisos[0].id_objeto,
                "CREAR",
                "CREAR PERIODO CONTABLE"
              ); //Insertar bitacora
              navigate("/admin/mostrarperiodo");
            } else {
              mostrarAlertas("error");
              RegistroEnVitacora(
                permisos[0].id_objeto,
                "CREAR",
                "ERROR AL CREAR PERIODO CONTABLE"
              ); //Insertar bitacora
            }

            // } else {
            //    mostrarAlertas("duplicado");
            //  }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(
              permisos[0].id_objeto,
              "CREAR",
              "ERROR AL CREAR PERIODO CONTABLE"
            ); //Insertar bitacora
            navigate("/admin/mostrarperiodo");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Periodo Contable</h3>
            <div className="row g-3">
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
            </div>

            <div className="row g-3">
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
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idUsuario" className="form-label">
                    Nombre usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idUsuario"
                    name="id_usuario"
                    placeholder="Nombre usuario..."
                    disabled
                  />
                  <ErrorMessage
                    name="id_usuario"
                    component={() => (
                      <div className="error">{errors.id_usuario}</div>
                    )}
                  />
                </div>
              </div>

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
                    <option value="">Seleccionar...</option>
                    <option value="M">Mensual</option>
                    <option value="T">Trimestral</option>
                    <option value="A">Anual</option>
                  </Field>

                  <ErrorMessage
                    name="tipo_periodo"
                    component={() => (
                      <div className="error">{errors.tipo_periodo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="estadoPeriodo" className="form-label">
                    Estado periodo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="estadoPeriodo"
                    name="estado_periodo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="A">Abierto</option>
                    <option value="C">Cerrado</option>
                  </Field>

                  <ErrorMessage
                    name="estado_periodo"
                    component={() => (
                      <div className="error">{errors.estado_periodo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarperiodo"
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

export default PeriodoCrear;
