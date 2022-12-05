import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLEditar = "http://190.53.243.69:3001/mc_subcuenta/actualizar-insertar/";
const UrlMostrar = "http://190.53.243.69:3001/mc_catalogo/getall/";

//Identificador del formulario
const objeto = "FORM_SUBCUENTA";

const EditarSubCuenta = () => {
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

  //procedimineto para obtener todos las sucursales y mostrarlas en select
  const [cuenta, setcuenta] = useState([]);
  useEffect(() => {
    getcuenta();
  }, []);

  //petición a api
  const getcuenta = async () => {
    try {
      const res = await axios.get(UrlMostrar);
      setcuenta(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "Los cambios se guardaron con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudieron guardar los cambios",
          icon: "error",
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
          id_subcuenta: edit.id_subcuenta,
          id_cuenta: edit.nombre_cuenta,
          nombre_subcuenta: edit.nombre_subcuenta,
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion nombre cuenta
          if (!valores.id_cuenta) {
            errores.id_cuenta = "Por favor seleccione una cuenta";
          }


          // Validacion nombre subcuenta
          if (!valores.nombre_subcuenta) {
            errores.nombre_subcuenta =
              "Por favor ingresa un nombre de subcuenta";
          }
          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(
              `${URLEditar}${valores.id_subcuenta}`,
              valores
            );

            if (res.status === 200) {
              mostrarAlertas("guardado");
              RegistroEnVitacora(permisos[0].id_objeto,"EDITAR","EDITAR SUBCUENTA"); //Insertar bitacora
              navigate("/admin/mostrarsubcuenta");
            } else {
              mostrarAlertas("error");
              RegistroEnVitacora(permisos[0].id_objeto,"EDITAR","ERROR AL EDITAR SUBCUENTA"); //Insertar bitacora
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(permisos[0].id_objeto,"EDITAR","ERROR AL EDITAR SUBCUENTA"); //Insertar bitacora
            navigate("/admin/mostrarsubcuenta");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar SubCuenta</h3>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="Idsubcuenta" className="form-label">
                    Id SubCuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Idsubcuenta"
                    name="id_subcuenta"
                    disabled
                  />

                  <ErrorMessage
                    name="id_subcuenta"
                    component={() => (
                      <div className="error">{errors.id_subcuenta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idCuenta" className="form-label">
                    Nombre Cuenta:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="id_cuenta"
                    name="id_cuenta"
                  >
                    <option value="">Seleccionar...</option>
                    {cuenta.map((item, i) => (
                      <option key={i} value={item.id_cuenta}>
                        {item.nombre_cuenta}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_cuenta"
                    component={() => (
                      <div className="error">{errors.id_cuenta}</div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="nombreSubCuenta" className="form-label">
                  Nombre SubCuenta:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="nombreSubCuenta"
                  name="nombre_subcuenta"
                  placeholder="Nombre subcuenta..."
                  onKeyUp={cambiarAMayusculasNombreSubcuenta(values)}
                />

                <ErrorMessage
                  name="nombre_subcuenta"
                  component={() => (
                    <div className="error">{errors.nombre_subcuenta}</div>
                  )}
                />
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarsubcuenta"
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

export default EditarSubCuenta;
