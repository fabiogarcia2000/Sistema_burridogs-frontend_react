import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";


import { InsertarBitacora } from "../seguridad/bitacora/InsertarBitacora";

const URLGuardar = "http://190.53.243.69:3001/empresa/actualizar-insertar/";


const objeto = "FORM_ARTICULO";

const FormularioEmpresa = () => {
  //const [DatosEmpresa] = useGlobalState('datosEmpresa');
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"))

      const navigate = useNavigate();

  

    /*****Obtener y corroborar Permisos*****/
    const [img, setImg]=useState();
    console.log(img)

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
  <>

    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_empresa: DatosEmpresa.id_empresa,
          descripcion: DatosEmpresa.descripcion,
          direccion: DatosEmpresa.direccion,
          telefono: DatosEmpresa.telefono,
          correo: DatosEmpresa.correo,
          rtn: DatosEmpresa.rtn,
          //logo1: DatosEmpresa.logo1,
          logo2: DatosEmpresa.logo2,
          logo3: DatosEmpresa.logo3,
          logo4: DatosEmpresa.logo4,
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
          modificado_por: "autorPrueba",
          fecha_modificacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.descripcion) {
            errores.descripcion = "Requerido";
          }

          // Validacion descripción articulo
          if (!valores.direccion) {
            errores.direccion =
              "Requerido";
          }

          // Validacion descripción corta
          if (!valores.telefono) {
            errores.telefono =
              "Requerido";
          }

          // Validacion impuesto
          if (!valores.correo) {
            errores.correo = "Requerido";
          }

          // Validacion categoria
          if (!valores.rtn) {
            errores.rtn = "Requerido";
          }

          /**   // Validacion logo1
          if (!valores.logo1) {
            errores.logo1 = "Requerido";
          }  */
             
          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
        
          try {
            const res = await axios.put(
              `${URLGuardar}${valores.id_empresa}`,
              valores
            );

            if (res.status === 200) {
              mostrarAlertas("guardado");
              //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR DATOS EMPRESA");
              navigate("/admin/home");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Datos de Empresa</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codArticulo" className="form-label">
                    Nombre:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codArticulo"
                    name="descripcion"
                    placeholder="Nombre o descripción..."
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="tipoArticulo" className="form-label">
                    Dirección:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codArticulo"
                    name="direccion"
                    placeholder="Dirección de la empresa..."
                  />

                  <ErrorMessage
                    name="direccion"
                    component={() => <div className="error">{errors.direccion}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcionArticulo" className="form-label">
                   Telefono:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionArticulo"
                    name="telefono"
                    placeholder="Telefono de la empresa..."
                  />

                  <ErrorMessage
                    name="telefono"
                    component={() => (
                      <div className="error">{errors.telefono}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcortaArticulo" className="form-label">
                    R.T.N:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcortaArticulo"
                    name="rtn"
                    placeholder="R.T.N..."
                  />

                  <ErrorMessage
                    name="rtn"
                    component={() => (
                      <div className="error">{errors.rtn}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="impuestoArticulo" className="form-label">
                    Correo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcortaArticulo"
                    name="correo"
                    placeholder="Correo de la empresa..."
                  />

                  <ErrorMessage
                    name="correo"
                    component={() => (
                      <div className="error">{errors.correo}</div>
                    )}
                  />
                </div>
              </div>

              {/**AQUI OTRA */}
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="logo1Articulo" className="form-label">
                    Logo 1 (Principal):
                  </label>
                  <input id="imgs" type="file" className="form-control" name="logo1" accept="image/png, image/jpeg" onChange={(e)=>setImg(e.target.files)} />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="invMinArticulo" className="form-label">
                    Logo 2:
                  </label>
                  <Field
                    type="file"
                    className="form-control"
                    id="invMinArticulo"
                    name="logo2"
                  />

                  <ErrorMessage
                    name="logo2"
                    component={() => (
                      <div className="error">{errors.logo2}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="invMaxArticulo" className="form-label">
                    Logo 3:
                  </label>
                  <Field
                    type="file"
                    className="form-control"
                    id="invMaxArticulo"
                    name="logo3"
                  />

                  <ErrorMessage
                    name="logo3"
                    component={() => (
                      <div className="error">{errors.logo3}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="codigobarraArticulo" className="form-label">
                    Logo 4:
                  </label>
                  <Field
                    type="file"
                    className="form-control"
                    id="codigobarraArticulo"
                    name="logo4"
  
                  />

                  <ErrorMessage
                    name="logo4"
                    component={() => (
                      <div className="error">{errors.logo4}</div>
                    )}
                  />
                </div>
              </div>

            </div>
            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/home"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>

    </div>

  </>
  );
};

export default FormularioEmpresa;
