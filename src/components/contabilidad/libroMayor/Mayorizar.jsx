import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const URLCrear = "http://190.53.243.69:3001/mc_libromayor/mayorizar/";

const Mayorizar = () => {

  const [edit] = useGlobalState('registroEdit')
  const navigate = useNavigate();

   //Alertas de éxito o error
   const mostrarAlertas = (alerta) =>{
    switch (alerta){
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
        text:  'No se pudieron guardar los cambios',
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
          id_libro_mayor:edit.id_libro_mayor,
          id_periodo_contable: "",
          descripcion:"",
          fecha: date,
       
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de usuario
          if (!valores.id_periodo_contable) {
            errores.id_periodo_contable = "Por favor ingresa el periodo contable";
          } else if (!/^[0-9]+$/.test(valores.id_periodo_contable)) {
            errores.id_periodo_contable = "Escribir solo números";
          }  

        // Validacion de descripcion
        if (!valores.descripcion) {
          errores.descripcion = "Por favor ingresa una descripcion";
        } 

          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.post(`${URLCrear}`, valores);
                console.log(valores)
                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarlibromayor");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarlibromayor");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
          <h3 className="mb-3">Mayorizar</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="IdPeriodo" className="form-label">
                    Periodo Contable:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="IdPeriodo"
                    name="id_periodo_contable"
                    placeholder="Numero del periodo contable..."
                  />

                  <ErrorMessage
                    name="id_periodo_contable"
                    component={() => (
                      <div className="error">{errors.id_libro_mayor}</div>
                    )}
                  />
                </div>
              </div>
            
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
                    placeholder="descripcion..."
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
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="fecha" className="form-label">
                    Fecha:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    disabled
                  />

                  <ErrorMessage
                    name="fecha"
                    component={() => (
                      <div className="error">{errors.fecha}</div>
                    )}
                  />
                </div>
              </div>

             
       
          
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarlibromayor"
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
