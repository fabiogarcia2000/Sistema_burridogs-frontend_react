import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripcion,
  cambiarAMayusculasCodigoUND,
} from "../../../utils/cambiarAMayusculas";
import { useState, useEffect } from "react";
import { InsertarBitacora } from "../../seguridad/bitacora/InsertarBitacora";

const URLEditar =
  "http://190.53.243.69:3001/unidad_medida/actualizar-insertar/";

const objeto = "FORM_UNIDADES_MEDIDA";


const FormularioEditar = () => {
  const [edit] = useGlobalState("registroEdit");

  const navigate = useNavigate();





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
/*******************/








  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "Los cambios se guardaron con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudieron guardar los cambios",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_unidad_medida: edit.cod_unidad_medida,
          descripcion: edit.descripcion,
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion código
          if (!valores.cod_unidad_medida) {
            errores.cod_unidad_medida = "Por favor ingresa un código";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(
              `${URLEditar}${valores.cod_unidad_medida}`,
              valores
            );

            if (res.status === 200) {
              mostrarAlertas("guardado");
              InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR UNIDAD DE MEDIDA");
              navigate("/admin/mostrarunidadesmedida");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarunidadesmedida");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Unidad de Medida</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codMedida" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codMedida"
                    name="cod_unidad_medida"
                    placeholder="Código de la medida..."
                    disabled
                    onKeyUp={cambiarAMayusculasCodigoUND(values)}
                  />

                  <ErrorMessage
                    name="cod_unidad_medida"
                    component={() => (
                      <div className="error">{errors.cod_unidad_medida}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionMedida" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionMedida"
                    name="descripcion"
                    placeholder="Descripcion de la unidad de medida..."
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
              to="/admin/mostrarunidadesmedida"
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
