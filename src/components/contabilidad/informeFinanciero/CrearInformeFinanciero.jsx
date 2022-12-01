import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLCrear = "http://190.53.243.69:3001/mc_informefinanciero/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/mc_informefinanciero/getone/";


//Identificador del formulario
const objeto = "FORM_INFORME_FINANCIERO"

const CrearInformeFinanciero = () => {
  const navigate = useNavigate();



//===================Obtener datos del localstorage=====================
  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true)

  const Permisos = () =>{
    const newData = temp.filter(
      (item) => item.objeto === objeto
    );
    setPermisos(newData);
  }

  useEffect(() => {
    let data = localStorage.getItem('permisos')
    if(data){
      setTemp(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);


  useEffect(() => {
    if(permisos.length > 0){
      TienePermisos();
    }
  }, [permisos]);


  const TienePermisos = () =>{
    setPermitido(permisos[0].permiso_consultar)
  }
//================================================================




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
          text:  'Ya existe ese informe financiero',
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

           // Validacion de descripcion
           if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa la descripcion";
          } 
              
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado 
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.descripcion}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.id_informe_financiero}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "CREAR INFORME FINANCIERO"); //Insertar bitacora
                        navigate("/admin/mostrarinformefinanciero");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/admin/mostrarinformefinanciero");
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
              to="/admin/mostrarinformefinanciero"
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

export default CrearInformeFinanciero;