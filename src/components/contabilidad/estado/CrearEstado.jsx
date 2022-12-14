import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasTipoEstado } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const URLCrear = "http://190.53.243.69:3001/mc_estado/actualizar-insertar/0";
const URLMostrarUno = "http://190.53.243.69:3001/mc_estado/getone/";


//Identificador del formulario
const objeto = "FORM_EST_DIARIO"

const CrearEstado = () => {
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
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El estado se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el nuevo estado',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe un estado con el mismo nombre',
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
          id_estado: "",
          tipo_estado: ""
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion tipo estado
          if (!valores.tipo_estado) {
            errores.tipo_estado = "Por favor ingresa un nombre de tipo estado";
          }
          return errores;

        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
          try {
            const res = await axios.get(`${URLMostrarUno}${valores.tipo_estado}`);
            console.log(res)
            if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista
              const res = await axios.put(`${URLCrear}${valores.id_estado}`, valores);
              if (res.status === 200) {
                mostrarAlertas("guardado");
                RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "CREAR ESTADO DIARIO"); //Insertar bitacora
                navigate("/admin/mostrarestado");
              } else {
                mostrarAlertas("error");
                RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "ERROR AL CREAR ESTADO DIARIO"); //Insertar bitacora
              }

            } else {
              mostrarAlertas("duplicado");
              RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "ERROR AL CREAR ESTADO DIARIO"); //Insertar bitacora
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "ERROR AL CREAR ESTADO DIARIO"); //Insertar bitacora
            navigate("/admin/mostrarestado");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Estado Libro Diario</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="TipoEstado" className="form-label">
                    Tipo Estado:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="TipoEstado"
                    name="tipo_estado"
                    placeholder="Tipo Estado..."
                    onKeyUp={cambiarAMayusculasTipoEstado(values)}

                  />

                  <ErrorMessage
                    name="tipo_estado"
                    component={() => (
                      <div className="error">{errors.tipo_estado}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarestado"
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

export default CrearEstado;