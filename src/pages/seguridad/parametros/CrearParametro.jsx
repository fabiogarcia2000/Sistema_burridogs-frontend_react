import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import { cambiarAMayusculasCreadoPor, cambiarAMayusculasParametro, cambiarAMayusculasValor } from "../../../utils/cambiarAMayusculas";


const URLCrear = "http://190.53.243.69:3001/ms_parametros/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/ms_parametros/getone/";

//Para mostrar la fecha en formato DD/MM/AAAA
let date = new Date()
let dia = `${(date.getDate())}`.padStart(2,'0');
let mes = `${(date.getMonth()+1)}`.padStart(2,'0');
let anio = date.getFullYear();

//Parametros que se deben obtener
var fecha = (`${anio}/${mes}/${dia}`);

const CrearParametro = () => {

  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem('data'))

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El parámetro se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el parámetro',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe el parámetro ingresado',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'errormostrar':
        Swal.fire({
          title: 'Error al Cargar',
          text: 'En este momento no se pueden mostrar los datos, puede ser por un error de red o con el servidor. Intente más tarde.',
          icon: 'error',
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
          id_parametro: "",
          parametro: "",
          valor: "",
          creado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
          fecha_creacion: fecha,
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};


          // Validacion parametro
          if (!valores.parametro) {
            errores.parametro = "Por favor ingrese un parámetro";
          }

          // Validacion valor
          if (!valores.valor) {
            errores.valor = "Por favor ingrese una valor";
          }

          // Validacion creado por
          if (!valores.creado_por) {
            errores.creado_por = "Por favor ingrese el campo";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            /*const res = await axios.get(`${URLMostrarUno}${valores.parametro}`);
            console.log(res)
            if (res.data === "") {*/
              //procedimineto para guardar el nuevo registro en el caso de que no exista*/
              const res = await axios.put(`${URLCrear}`, valores);
              if (res.status === 200) {
                mostrarAlertas("guardado");
                navigate("/admin/params");
              } else {
                mostrarAlertas("error");
              }
            /*} else {
              mostrarAlertas("duplicado");
            }*/
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/params");
          }
        }}
        >
          {({ errors, values }) => (
            <Form >
              <h3 className="mb-3">Nuevo parámetro</h3>
              <div className="row g-3">
                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="parametroS" className="form-label">
                            Parámetro:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="parametroS"
                            name="parametro"
                            placeholder= "Parámetro"
                            onKeyUp={cambiarAMayusculasParametro(values)}
                        />

                        <ErrorMessage
                            name="parametro"
                            component={() => (
                            <div className="error">{errors.parametro}</div>
                            )}
                        />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="valorP" className="form-label">
                            Valor:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="valorP"
                            name="valor"
                            placeholder= "Valor..."
                            onKeyUp={cambiarAMayusculasValor(values)}
                        />

                        <ErrorMessage
                            name="valor"
                            component={() => (
                            <div className="error">{errors.valor}</div>
                            )}
                        />
                        </div>
                    </div>
              </div>
            
              <div className="row g-3">
                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="creadoPor" className="form-label">
                            Creado por:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="creadoPor"
                            name="creado_por"
                            placeholder= "Creado por..."
                            onKeyUp={cambiarAMayusculasCreadoPor(values)}
                            disabled
                        />

                        <ErrorMessage
                            name="creado_por"
                            component={() => (
                            <div className="error">{errors.creado_por}</div>
                            )}
                        />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="fechaCreacion" className="form-label">
                            Fecha de creación:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="fechaCreacion"
                            name="fecha_creacion"
                            placeholder= "Fecha de creación..."
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

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/params"
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

export default CrearParametro;