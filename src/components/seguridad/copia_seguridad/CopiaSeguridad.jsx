import { useNavigate } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";
import Swal from "sweetalert2";
import imagen from "../../../assets/img/img-backup.png";
import "./styles.css";
import { Spinner } from "reactstrap";
import {  useEffect } from "react";

//Para nombrar el archivo
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const backupFile = `pg-backup-${today}.tar`;

const UrlCrearCopia = "http://190.53.243.69:3001/backup";

const objeto = "FORM_COPIA_SEGURIDAD";

const CopiaSeguridad = () => {
  const [loading, setLoading] = useState(false);
  const [copia, setcopia] = useState();

  const navigate = useNavigate();

   /*****Obtener y corroborar Permisos*****/
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
   //================================================================
 

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "creado":
        Swal.fire({
          title: "¡Se creó con éxito!",
          text: "",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "Error al crear copia de seguridad",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };

  const GenerarBackup = async () => {
    setLoading(true);
    try {
      axios.get(UrlCrearCopia, { responseType: "blob" }).then((res) => {
        console.log(res);
        fileDownload(res.data, backupFile);
        setLoading(false);
        mostrarAlertas("creado");
        RegistroEnVitacora(
          permisos[0].id_objeto,
          "CREAR",
          "CREAR COPIA DE SEGURIDAD"
        ); //Insertar bitacora
      });
      //setcopia(res.data);
    
      //navigate("/admin/copiaseguridad");
    } catch (error) {
      console.log(error);
      mostrarAlertas("error");
      setLoading(false);
      RegistroEnVitacora(
        permisos[0].id_objeto,
        "CREAR",
        "ERROR AL CREAR COPIA DE SEGURIDAD"
      ); //Insertar bitacora
    }
  };

  return (
    <div className="container principal">
      <h3 className="mb-3">Crear Copia de Seguridad</h3>
      {permitido ? (
      <div className="secundario">
        <div className="row">
          <img src={imagen} className="img-backup" alt="Img" />
        </div>
        <br />
        <br />
        <div className="row">
          <button
            className="btn btn-primary mb-3 me-2"
            onClick={() => {
              GenerarBackup();
            }}
          >
            Crear Copia de Seguridad
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
            <p>Creando...</p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CopiaSeguridad;
