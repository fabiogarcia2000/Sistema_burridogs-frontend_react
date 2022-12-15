import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import imagen from "../../../assets/img/img-restore.png";
import "./styles.css";
import { Spinner } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";

const URLGuardar = "http://190.53.243.69:3001/upload";

const objeto = "FORM_RESTAURAR";

const Restaurar = () => {
  //const [DatosEmpresa] = useGlobalState('datosEmpresa');
  const [loading, setLoading] = useState(false);
  const [archivos, setArchivos] = useState(null);

  const SubirArchivos = (archivo) => {
    setArchivos(archivo[0]);
  };

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

      case "vacio":
        Swal.fire({
          title: "Seleccione un Archivo",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };

  const EnviarBackup = async () => {
    if (archivos) {
      setLoading(true);

      try {
        const fil = new FormData();

        fil.append("file", archivos);
        console.log(fil);

        axios
          .post(URLGuardar, fil, {
            headers: { "Content-Type": "multipart/form-data" },
            
          })
          
          .then((res) => {
            console.log(res);
            mostrarAlertas("subido");
            setLoading(false);
           
          });

        //InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR DATOS);
        //window.location.reload();
      } catch (error) {
        console.log(error);
        mostrarAlertas("error");
        setLoading(false);
        RegistroEnVitacora(
          permisos[0].id_objeto,
          "RESTAURAR",
          "ERROR AL RESTAURAR COPIA DE SEGURIDAD"
        ); //Insertar bitacora
      }
    } else {
      mostrarAlertas("vacio");
    }
  };

  //Ventana modal para subir archivo
  const [modalArchivo, setModalArchivo] = useState(false);
  const abrirModalArchivo = () => setModalArchivo(!modalArchivo);

  return (
    <div className="container principal">
      <h3 className="mb-3">Restaurar con Copia de Seguridad</h3>

      {permitido ? (
      <div className="secundario">
        <div className="row">
          <img src={imagen} className="img-backup" alt="Img" />
        </div>
        <br />
        <br />
        <div className="row">
          <button
            className="btn btn-success mb-3 me-2"
            onClick={() => {
              abrirModalArchivo();
             
            }}
          >
            Restaurar
          </button>
        </div>
      </div>
            ) : (
              <p className="text-center text-danger">
                Lo siento, no tienes permisos para realizar esta acción.
              </p>
            )}
      

      <Modal size="sm" isOpen={loading} centered>
        <ModalBody>
          <div className="text-center">
            <Spinner color="secondary" centered />
            <p>Subiendo...</p>
          </div>
        </ModalBody>
      </Modal>

      {/* Ventana Modal subir archivo*/}
      <Modal isOpen={modalArchivo} centered>
        <ModalHeader>Subir Copia de Seguridad</ModalHeader>
        <ModalBody>
          <div className="col-sm-12">
            <div className="mb-3">
              <label htmlFor="Archivo" className="form-label">
                Seleccione una Copia de Seguridad:
              </label>
              <input
                id="files"
                type="file"
                className="form-control"
                name="files"
                accept=".tar"
                
                onChange={(e) => SubirArchivos(e.target.files)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              abrirModalArchivo();
              EnviarBackup();
            }}
          >
            Subir
          </Button>
          <Button color="secondary" onClick={abrirModalArchivo}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Restaurar;
