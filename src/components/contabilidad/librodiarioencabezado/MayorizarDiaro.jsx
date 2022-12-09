import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";
import { getCurrentDateShort } from "../../../utils/fechaYhora";
import { Server } from "../../../Server/Server";

const Mayorizar = () => {
  const UrlServer = Server();
  const URLCrear = UrlServer + "categoria/actualizar-insertar/";
  const URLMostrarUno = UrlServer + "categoria/getone/";
  const UrlMayorizar = "http://190.53.243.69:3001/mc_libromayor/mayorizar/";
  const UrlPeriodo = "http://190.53.243.69:3001/mc_periodo/getall/";
  const navigate = useNavigate();

  const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser;

  const [data, setData] = useState([]);

  //procedimineto para obtener los periodos contables
  const [periodo, setPeriodo] = useState([]);
  useEffect(() => {
    getPeriodos();
  }, []);

  //petición a api
  const getPeriodos = async () => {
    try {
      const res = await axios.get(UrlPeriodo);
      setPeriodo(res.data);
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
          text: "El periodo contable se mayorizó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo mayorizar el periodo contable",
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
          id_periodo_contable: null,
          descripcion: "",
          fecha_creacion: fecha,
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id
          if (!valores.id_periodo_contable) {
            errores.id_periodo_contable =
              "Por favor seleccione un periodo contable";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingrese una descripción";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios

          try {
            const res = await axios.post(UrlMayorizar, valores);
            console.log(valores);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              setData(res.data);
              console.log(res.data);
              navigate("/admin/mostrarlibroencabezado");
              //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR POS");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarlibroencabezado");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Mayorizar</h3>
            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="idPeriodo" className="form-label">
                    Periodo Contable a Mayorizar:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idPeriodo"
                    name="id_periodo_contable"
                  >
                    <option value="">Seleccionar...</option>
                    {periodo.map((item, i) => (
                      <option key={i} value={item.id_periodo_contable}>
                        Periodo:{item.id_periodo_contable}
                        Fecha:{item.descripcion_periodo}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_periodo_contable"
                    component={() => (
                      <div className="error">{errors.id_periodo_contable}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="descripcionCategoria" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionCategoria"
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
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarlibroencabezado"
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

export default Mayorizar;
