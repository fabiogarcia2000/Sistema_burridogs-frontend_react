import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";


 const FormularioEditar = () => {
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
            id_informe_financiero: edit.id_informe_financiero,
            descripcion: edit.descripcion  
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id informe financiero
          if (!valores.id_informe_financiero) {
            errores.id_informe_financiero = "Por favor ingresa un id de informe financiero";
          } else if (!/^[0-9]+$/.test(valores.id_informe_financiero)) {
            errores.id_informe_financiero = "Escribir solo números";
          }  

            // Validacion de descripcion
            if (!valores.descripcion) {
                errores.descripcion = "Por favor ingresa la descripcion";
            } 

          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.id_informe_financiero}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarinformefinanciero");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarinformefinanciero");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
          <h3 className="mb-3">Editar Informe Financiero</h3>
          <div className="row g-3">   
                <div className="col-sm-6">
                    <div className="mb-3">
                    <label htmlFor="id_informe_financiero" className="form-label">
                        ID informe financiero:
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="idInformeFinanciero"
                        name="id_informe_financiero"
                        placeholder="ID del informe financiero..."
                        disabled
                    />

                    <ErrorMessage
                        name="id_informe_financiero"
                        component={() => (
                        <div className="error">{errors.id_informe_financiero}</div>
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
                        placeholder="Descripcion de informe financiero..."
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

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarinformefinanciero"
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

export default FormularioEditar;
