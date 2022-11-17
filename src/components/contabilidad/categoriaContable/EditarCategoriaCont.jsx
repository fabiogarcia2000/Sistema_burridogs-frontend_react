import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreCategoria } from "../../../utils/cambiarAMayusculas";


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
            id_categoria: edit.id_categoria,
            nombre_categoria: edit.nombre_categoria    
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
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.nombre_categoria}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarcategoriacont");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarcategoriacont");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Categoría Contable</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idCategoria" className="form-label">
                    ID de categoría:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idCategoria"
                    name="id_categoria"
                    placeholder="ID de la categoria contable..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_categoria"
                    component={() => (
                      <div className="error">{errors.id_categoria}</div>
                    )}
                  />
                </div>
              </div>

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

export default FormularioEditar;
