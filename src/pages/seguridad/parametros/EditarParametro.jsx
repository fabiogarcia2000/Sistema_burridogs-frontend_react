import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasParametro } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasValor } from "../../../utils/cambiarAMayusculas";
//import { cambiarAMayusculasCreadoPor } from "../../../utils/cambiarAMayusculas";

const URLEditar = "http://190.53.243.69:3001/ms_parametros/actualizar-insertar/";


 const EditarParametro = () => {
const [edit] = useGlobalState('registroEdit')

const navigate = useNavigate();
const userdata = JSON.parse(localStorage.getItem('data'))

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
            id_parametro: edit.id_parametro,
            parametro: edit.parametro,
            valor: edit.valor,
            modificado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
            fecha_modificacion: edit.fecha_modificacion
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

              // Validacion valor
              if (!valores.valor) {
                errores.valor = "Por favor ingrese una valor";
              }
    
              // Validacion modificado por
              if (!valores.modificado_por) {
                errores.modificado_por = "Por favor ingrese el campo";
              }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}${valores.id_parametro}`, valores);

            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/params");
            } else {
              mostrarAlertas("error");
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/params");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Parámetros</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="idParametro" className="form-label">
                            Id Parámetro:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="idParametro"
                            name="id_parametro"
                            disabled
                        />

                        <ErrorMessage
                            name="id_parametro"
                            component={() => (
                            <div className="error">{errors.id_parametro}</div>
                            )}
                        />
                        </div>
                    </div>
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
                            disabled
                        />

                        <ErrorMessage
                            name="parametro"
                            component={() => (
                            <div className="error">{errors.parametro}</div>
                            )}
                        />
                        </div>
                    </div>
              </div>
            
              <div className="row g-3">
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
                    <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="modificadoPor" className="form-label">
                            Modificado por:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="modificadoPor"
                            name="modificado_por"
                            placeholder= "Modificado por..."
                           disabled
                           // onKeyUp={cambiarAMayusculasCreadoPor(values)}
                        />

                        <ErrorMessage
                            name="modificado_por"
                            component={() => (
                            <div className="error">{errors.modificado_por}</div>
                            )}
                        />
                        </div>
                    </div>
              </div>
              
              <div className="row g-3">
              <div className="col-sm-6">
                        <div className="mb-3">
                        <label htmlFor="fechaModi" className="form-label">
                            Fecha modificación:
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="fechaModi"
                            name="fecha_modificacion"
                            placeholder= "Fecha..."
                           disabled
                           // onKeyUp={cambiarAMayusculasCreadoPor(values)}
                        />

                        <ErrorMessage
                            name="fecha_modificacion"
                            component={() => (
                            <div className="error">{errors.fecha_modificacion}</div>
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

export default EditarParametro;