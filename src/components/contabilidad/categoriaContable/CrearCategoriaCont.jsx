import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreCategoria } from "../../../utils/cambiarAMayusculas";

const URLCrear = "";
const URLMostrarUno = "";


const Formulario = () => {

  const navigate = useNavigate();


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "La categoría contable se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear la nueva categoría contable',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe una categoría contable con el código ingresado',
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
          id_categoria: "", //NO SÉ SI SE DEBE PONER EL ID
          nombre_categoria: ""        
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

            // Validacion de nombre de categoría
            if (!valores.nombre_categoria) {
              errores.nombre_categoria = "Por favor ingresa el nombre de la categoría";
            }

  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el nombre ingresado
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.nombre_categoria}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.nombre_categoria}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarcategoriacont");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarcategoriacont");
              }
        }}
      >
        {({ errors , values }) => (
          <Form>
            <h3 className="mb-3">Nueva Categoría Contable</h3>
            <div className="row g-3">

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="nombreCategoria" className="form-label">
                    Nombre de categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreCategoria"
                    name="nombre_categoria"
                    placeholder="Nombre de la categoria contable..."
                    onKeyUp={cambiarAMayusculasNombreCategoria(values)}
                  />

                  <ErrorMessage
                    name="nombre_categoria"
                    component={() => (
                      <div className="error">{errors.nombre_categoria}</div>
                    )}
                  />
                </div>
              </div>
            </div>


            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarcategoriacont"
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
