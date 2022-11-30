import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasRol } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";


const URLCrear = "http://190.53.243.69:3001/ms_rol/actualizar-insertar/0";
const UrlMostrar = "http://190.53.243.69:3001/ms_rol/getone/";

//Para mostrar la fecha en formato DD/MM/AAAA
let date = new Date()
let dia = `${(date.getDate())}`.padStart(2,'0');
let mes = `${(date.getMonth()+1)}`.padStart(2,'0');
let anio = date.getFullYear();

//Parametros que se deben obtener
var fecha = (`${anio}/${mes}/${dia}`);

const CrearRol = () => {

  const navigate = useNavigate();
  const [cuenta, setCuenta] = useState();

//TRAER NOMBRE DE USUARIO PARA EL CREADO POR 
const userdata = JSON.parse(localStorage.getItem('data'))

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El rol se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el rol',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe un rol con ese nombre ingresado',
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
          rol: "",
          descripcion: "",
          creado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
          fecha_creacion: fecha,
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};


          // Validacion nombre cuenta
          if (!valores.rol) {
            errores.rol = "Por favor ingresa el nombre de rol";
          }

          // Validacion nombre cuenta
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa descripción de rol";
          }
          return errores;

        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado  
          try {
            
            //procedimineto para guardar el nuevo registro en el caso de que no exista
            const res = await axios.put(`${URLCrear}`, valores);
            //await axios.put(`${URLCrear}`, valores);
            if (res.status === 200) {
            mostrarAlertas("guardado");
            navigate("/admin/roles");

          } else {
            mostrarAlertas("error");
          }
        //}else{ 
         // mostrarAlertas("duplicado");
        //}
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/roles");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Rol</h3>
            <div className="row g-3">

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="rol" className="form-label">
                    Rol:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rol"
                    name="rol"
                    placeholder="Nombre de rol..."
                    onKeyUp={cambiarAMayusculasRol(values)}
                  />

                  <ErrorMessage
                    name="rol"
                    component={() => (
                      <div className="error">{errors.rol}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción de rol..."
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
                  <label htmlFor="creadopor" className="form-label">
                    Creado por:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="creadopor"
                    name="creado_por"
                    disabled
                  />

                  <ErrorMessage
                    name="creado_por"
                    component={() => (
                      <div className="error">{errors.creado_por}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="fechacreacion" className="form-label">
                    Fecha Creacion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fechacreacion"
                    name="fecha_creacion"
                    disabled
                  />

                  <ErrorMessage
                    name="fecha_creacion"
                    component={() => (
                      <div className="error">{errors.fecha_creacion}</div>
                    )}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/roles"
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

export default CrearRol;