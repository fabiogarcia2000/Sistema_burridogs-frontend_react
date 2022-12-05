import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../globalStates/globalStates";
import {
  cambiarAMayusculasDescripcion,
  cambiarAMayusculasDirección,
} from "../../utils/cambiarAMayusculas";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles.css";
import { getCurrentDateShort } from "../../utils/fechaYhora";
import { InsertarBitacora } from "../seguridad/bitacora/InsertarBitacora";
import {Spinner} from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const URLGuardar = "http://190.53.243.69:3001/empresa/actualizar-insertar/";

const objeto = "FORM_ARTICULO";



const FormularioEmpresa = () => {
  //const [DatosEmpresa] = useGlobalState('datosEmpresa');
  const [loading, setLoading] = useState(false);
  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 =DatosEmpresa.logo1;
  const logo2 =DatosEmpresa.logo2;
  

  const navigate = useNavigate();

  const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser;

  /*****Obtener y corroborar Permisos*****/
 // const [img, setImg] = useState();


  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true);

  const Permisos = () => {
    const newData = temp.filter((item) => item.objeto === objeto);
    setPermisos(newData);
  };

  useEffect(() => {
    let data = localStorage.getItem("permisos");
    if (data) {
      setTemp(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);

  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);

  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar);
  };
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

  const ConvertirImgBase64 = (archivos) =>{
    Array.from(archivos).forEach(archivo =>{
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function(){
        var arrayAuxiliar = [];
        var base64 = reader.result;
        arrayAuxiliar = base64.split(',')
        setImagen1(arrayAuxiliar[1])
      }
    })
  }

  const ConvertirImg2Base64 = (archivos) =>{
    Array.from(archivos).forEach(archivo =>{
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function(){
        var arrayAuxiliar = [];
        var base64 = reader.result;
        arrayAuxiliar = base64.split(',')
        setImagen2(arrayAuxiliar[1])
      }
    })
  }

  //Ventana modal de confirmación de eliminar
 

  return (
    <>
    
      {
        loading?
          <Modal size="sm" isOpen={loading} centered>
            <ModalBody>
             <div className="text-center">
              <Spinner color="secondary" centered/>
             </div>
            </ModalBody>
          </Modal>
        
        : 
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
            //logo2: DatosEmpresa.logo2,
            logo3: DatosEmpresa.logo3,
            logo4: DatosEmpresa.logo4,
            creado_por: usuario,
            fecha_creacion: fecha,
            modificado_por: usuario,
            fecha_modificacion: fecha,
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

           

            return errores;
          }}

          onSubmit={async (valores) => {
            setLoading(true)
            //procedimineto para guardar el los cambios
            const datosEnviar = {
              id_empresa:valores.id_empresa,
              descripcion:valores.descripcion,
              direccion: valores.direccion,
              telefono: valores.telefono,
              correo: valores.correo,
              rtn: valores.rtn,
              logo1: imagen1? imagen1:logo1,
              logo2: imagen2? imagen2:logo2,
              creado_por: valores.creado_por,
              fecha_creacion: valores.fecha_creacion,
              modificado_por: valores.modificado_por,
              fecha_modificacion: valores.fecha_modificacion
            }

            console.log(datosEnviar)

            try {
              const res = await axios.put(
                `${URLGuardar}${valores.id_empresa}`,
                datosEnviar
              );

              if (res.status === 200) {
                setLoading(false)
                mostrarAlertas("guardado");
                //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR DATOS);
                navigate("/admin/home");
                //window.location.reload();
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
                      onKeyUp={cambiarAMayusculasDirección(values)}
                    />

                    <ErrorMessage
                      name="direccion"
                      component={() => (
                        <div className="error">{errors.direccion}</div>
                      )}
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
                    <label
                      htmlFor="descripcortaArticulo"
                      className="form-label"
                    >
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
                    <input
                      id="imgs"
                      type="file"
                      className="form-control"
                      name="logo1"
                      accept="image/png"
                      onChange={(e) => ConvertirImgBase64(e.target.files)}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="logo1Articulo" className="form-label">
                      Logo 2 (Login):
                    </label>
                    <input
                      id="imgs2"
                      type="file"
                      className="form-control"
                      name="logo2"
                      accept="image/png"
                      onChange={(e) => ConvertirImg2Base64(e.target.files)}
                    />
                  </div>
                </div>
                
              </div>


                  <div className="row">
                    <div className="col-sm-4">
                      {
                        imagen1?
                        <picture>
                          <img src={`data:image/png;base64,${imagen1}`} className="imglogos" alt="Logo 1" style={{ width: "200px", height: "100px" }}/>
                        </picture>
                        :
                        <picture>
                          <img src={`data:image/png;base64,${logo1}`} className="imglogos" alt="Logo 1" style={{ width: "200px", height: "100px" }}/>
                        </picture>
                      }
                    </div>
                    <div className="col-sm-4">
                    {
                        imagen2?
                        <picture>
                          <img src={`data:image/png;base64,${imagen2}`} className="imglogos" alt="Logo 1" style={{ width: "200px", height: "100px" }}/>
                        </picture>
                        :
                        <picture>
                          <img src={`data:image/png;base64,${logo2}`} className="imglogos" alt="Logo 1" style={{ width: "200px", height: "100px" }}/>
                        </picture>
                      }
                    </div>
                  </div>
<br />

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
      }


      
    </>
  );
};

export default FormularioEmpresa;
