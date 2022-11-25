import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
//import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/mc_subcuenta/actualizar-insertar/0";
const UrlMostrar = "http://190.53.243.69:3001/mc_subcuenta/getall";

const CrearSubCuenta = () => {

  const navigate = useNavigate();

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
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "La subcuenta se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la nueva subcuenta',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe una subcuenta con el mismo nombre',
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
          id_cuenta: "",
          nombre_cuenta: "",
          nombre_subcuenta: "",

        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion nombre cuenta
          if (!valores.id_cuenta) {
            errores.id_cuenta = "Por favor ingresa un nombre de cuenta";
          }

          // Validacion nombre subcuenta
          if (!valores.nombre_subcuenta) {
            errores.nombre_subcuenta = "Por favor ingresa un nombre de subcuenta";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.nombre_subcuenta)) {
            errores.nombre_subcuenta = "Escribir solo en MAYÚSCULAS";
          }

          return errores;

        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
          try {
            /* const res = await axios.get(`${URLMostrarUno}${valores.nombre_subcuenta}`);
             console.log(res)*/
            // if (res.data === ""){
            //procedimineto para guardar el nuevo registro en el caso de que no exista
            const res = await axios.put(`${URLCrear}`, valores);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarsubcuenta");
            } else {
              mostrarAlertas("error");
            }

            //}else{ 
            //   mostrarAlertas("duplicado");
            //  }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarsubcuenta");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nueva SubCuenta</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="id_cuenta" className="form-label">
                    Cuenta:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="id_cuenta"
                    name="id_cuenta"
                  >
                    <option value="">Seleccionar...</option>
                    {cuenta.map((item, i) => (
                      <option key={i} value={item.id_cuenta}>{item.nombre_cuenta}</option>
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

export default CrearSubCuenta;