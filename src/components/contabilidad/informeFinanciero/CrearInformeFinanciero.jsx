import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";


const URLCrear = "https://jsonplaceholder.typicode.com/comments";
const URLMostrarUno = "https://jsonplaceholder.typicode.com/comments";


const Formulario = () => {

  const navigate = useNavigate();


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El informe financiero se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el nuevo informe financiero',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un informe financiero con el código ingresado',
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
            id_informe_financiero: "",
            descripcion: ""
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
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.descripcion}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.descripcion}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarinformefinanciero");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarinformefinanciero");
              }
        }}
      >
        {({ errors, values}) => (
          <Form>
            <h3 className="mb-3">Nuevo Informe Financiero</h3>
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

export default Formulario;
