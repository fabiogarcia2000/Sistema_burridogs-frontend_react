import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";

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
            id_destino_cuenta: edit.id_destino_cuenta,
            id_cuenta: edit.id_cuenta,
            id_informe_financiero: edit.id_informe_financiero   
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id destino cuenta
          if (!valores.id_destino_cuenta) {
            errores.id_destino_cuenta = "Por favor ingresa un id de destino cuenta";
          } else if (!/^[0-9]+$/.test(valores.id_destino_cuenta)) {
            errores.id_cuenta = "Escribir solo números";
          } 

           // Validacion de id cuenta
           if (!valores.id_cuenta) {
            errores.id_cuenta = "Por favor ingresa un id de cuenta";
          } else if (!/^[0-9]+$/.test(valores.id_cuenta)) {
            errores.id_cuenta = "Escribir solo números";
          }  
          
             // Validacion de id informe financiero
             if (!valores.id_informe_financiero) {
                errores.id_informe_financiero = "Por favor ingresa un id de informe financiero";
              } else if (!/^[0-9]+$/.test(valores.id_informe_financiero)) {
                errores.id_informe_financiero = "Escribir solo números";
              }    

          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.id_destino_cuenta}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrardestino");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrardestino");
              }
        }}
      >
        {({ errors }) => (
          <Form>
          <h3 className="mb-3">Editar Destino de Cuenta</h3>
          <div className="row g-3">   
              <div className="col-sm-6">
                    <div className="mb-3">
                    <label htmlFor="idDestinoCuenta" className="form-label">
                        ID Destino de cuenta:
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="idDestinoCuenta"
                        name="id_destino_cuenta"
                        placeholder="ID del destino de la cuenta..."
                        disabled
                    />

                    <ErrorMessage
                        name="id_destino_cuenta"
                        component={() => (
                        <div className="error">{errors.id_destino_cuenta}</div>
                        )}
                    />
                    </div>
                 </div>

                 <div className="col-sm-6">
                     <div className="mb-3">
                        <label htmlFor="idCuenta" className="form-label">
                        ID Cuenta:
                        </label>
                        <Field
                        type="text"
                        className="form-control"
                        id="idCuenta"
                        name="id_cuenta"
                        placeholder="ID de la cuenta..."
                    />

                    <ErrorMessage
                        name="id_cuenta"
                        component={() => (
                        <div className="error">{errors.id_cuenta}</div>
                        )}
                    />
                 </div>
                </div>                
            </div>


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
                    />

                    <ErrorMessage
                        name="id_informe_financiero"
                        component={() => (
                        <div className="error">{errors.id_informe_financiero}</div>
                        )}
                    />
                    </div>
                </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrardestino"
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
