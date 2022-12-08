import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Spinner} from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const URLGuardar = "http://190.53.243.69:3001/backup";

const objeto = "FORM_ARTICULO";



const Restaurar = () => {
  //const [DatosEmpresa] = useGlobalState('datosEmpresa');
  const [loading, setLoading] = useState(false);
  const [archivos, setarchivos] = useState("");
  const subirArchivos =e =>{
    setarchivos(e);
  }

  const navigate = useNavigate();

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
      case "subido":
        Swal.fire({
          title: "¡Se subio el archivo con éxito!",
          text: "Los archivos se subieron con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudieron subir los archivos",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };



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
          
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

           

            return errores;
          }}

          onSubmit={async (valores) => {
            setLoading(true)
            //procedimineto para guardar el los cambios
            try {
              const res = await axios.post(URLGuardar);

              if (res.status === 200) {
                setLoading(false)
                mostrarAlertas("subido");
                //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR DATOS);
                navigate("/admin/restaurar");
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
              <h3 className="mb-3">Restaurar Copia de Seguridad</h3>
              <div className="row g-3">
              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="Archivo" className="form-label">
                      Subir Copia de Seguridad:
                    </label>
                    <input
                      id="imgs"
                      type="file"
                      className="form-control"
                      name="files"
                      onChange={(e) => subirArchivos(e.target.files)}
                    />
                  </div>
                </div>  

                {/**AQUI OTRA */}
              </div>

                              
              </div>
<br />

              <button className="btn btn-success mb-3 me-2" type="submit">
                Subir Archivo
              </button>
              <Link
                to="/admin/restaurar"
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

export default Restaurar;
