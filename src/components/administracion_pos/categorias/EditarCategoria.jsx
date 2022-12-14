import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import { getCurrentDateShort } from "../../../utils/fechaYhora"
import { useState, useEffect } from "react";
import { Server } from "../../../Server/Server";


//Identificador del formulario
const objeto = "FORM_CATEGORIA_PDV"

 const FormularioEditar = () => {
  const [edit] = useGlobalState('registroEdit')
  
  const UrlServer = Server();
  const URLEditar = UrlServer+"categoria/actualizar-insertar/";

  const navigate = useNavigate();

  const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser


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
          cod_categoria: edit.cod_categoria,
          descripcion: edit.descripcion,
          activo: edit.activo,
          modificado_por: usuario,
          fecha_modificacion: fecha
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de código
          if (!valores.cod_categoria) {
            errores.cod_categoria = "Por favor ingresa un código";
          } else if (!/^[0-9]+$/.test(valores.cod_categoria)) {
            errores.cod_categoria = "Escribir solo números";
          }


          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor ingresa un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.cod_categoria}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR CATEGORIA"); //Insertar bitacora
                    navigate("/admin/mostrarcategorias");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/admin/mostrarcategorias");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Categoría</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codCategoria" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="codCategoria"
                    name="cod_categoria"
                    placeholder="Código..."
                    disabled
                  />

                  <ErrorMessage
                    name="cod_categoria"
                    component={() => (
                      <div className="error">{errors.cod_categoria}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionCategoria" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionCategoria"
                    name="descripcion"
                    placeholder="Descripción..."
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
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoCategoria" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoCategoria"
                  name="activo"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => <div className="error">{errors.activo}</div>}
                />
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarcategorias"
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
