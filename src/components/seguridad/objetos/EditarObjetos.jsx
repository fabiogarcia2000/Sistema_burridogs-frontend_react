import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasTipoObjeto } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasObjeto } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";

const URLEditar = "http://190.53.243.69:3001/categoria/actualizar-insertar/";


 const EditarObjeto = () => {
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
          id_objeto: edit.id_objeto,
          objeto: edit.objeto,
          descripcion: edit.descripcion,
          tipo_objeto: edit.tipo_objeto
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};



          // Validacion de objeto
          if (!valores.objeto) {
            errores.objeto = "Por favor ingresa un nombre de objeto";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.objeto)) {
            errores.objeto = "Escribir solo en MAYÚSCULAS";
          }


          // Validacion descripcion
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripcion";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion)) {
            errores.descripcion = "Escribir solo en MAYÚSCULAS";
          }

          // Validacion tipo objeto
          if (!valores.tipo_objeto) {
            errores.tipo_objeto = "Por favor ingresa el tipo de objeto";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.tipo_objeto)) {
            errores.tipo_objeto = "Escribir solo en MAYÚSCULAS";
          }


          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}${valores.id_objeto}`, valores);

            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarobjetos");
            } else {
              mostrarAlertas("error");
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarobjetos");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Objeto</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="Idobjeto" className="form-label">
                    Id Objeto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Idobjeto"
                    name="id_objeto"
                    disabled
                  />

                  <ErrorMessage
                    name="id_objeto"
                    component={() => (
                      <div className="error">{errors.id_objeto}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="Objeto" className="form-label">
                    Objeto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Objeto"
                    name="objeto"
                    placeholder="Objeto..."
                    onKeyUp={cambiarAMayusculasObjeto(values)}
                  />

                  <ErrorMessage
                    name="objeto"
                    component={() => (
                      <div className="error">{errors.objeto}</div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripcion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion..."
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



              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="TipoObjeto" className="form-label">
                    Tipo Objeto:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="TipoObjeto"
                    name="tipo_objeto"
                    placeholder="Tipo Objeto..."
                    onKeyUp={cambiarAMayusculasTipoObjeto(values)}
                  />

                  <ErrorMessage
                    name="tipo_objeto"
                    component={() => (
                      <div className="error">{errors.tipo_objeto}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarobjetos"
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

export default EditarObjeto;