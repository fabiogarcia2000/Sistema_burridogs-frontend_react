import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { setGlobalState } from "../../../globalStates/globalStates";
import Swal from "sweetalert2";
import {Spinner} from "reactstrap";


const UrlCrearCopia="http://190.53.243.69:3001/backup";
const CopiaSeguridad = () => {
  const [loading, setLoading] = useState(false);
  const [copia, setcopia] = useState();

  const navigate = useNavigate();


//Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
  switch (alerta) {
    case "creado":
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
        <Formik>
        onSubmit={async (valores) => {
          setLoading(true)
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.get(UrlCrearCopia);
            setcopia(res.data);
            if (res.status === 200) {
              setLoading(false)
              mostrarAlertas("creado");
              //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR DATOS);
              //navigate("/admin/copiaseguridad");
              //window.location.reload();
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
          }   
        }}
        
          <Form>
          <div>
          <h3>Copia de Seguridad</h3>
            <div className="col-sm-4">
              <div className="mb-3">  
                  <button className="btn btn-success mb-3 me-2" type="submit">
                    Crear Copia de Seguridad
                  </button>
              </div>
            </div>
        </div>
        </Form>
        
        
      </Formik>
      }
      
    </>    
  );
};

export default CopiaSeguridad;
