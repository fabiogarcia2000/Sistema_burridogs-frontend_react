import { useParams, Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import PasswordChecklist from "react-password-checklist";
import React, { useEffect, useRef, useState } from "react";
import md5 from "md5";
import { getOneParam } from "../../../utils/utils";
import { collectErrors } from "yup/lib/util/runValidations";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";


const userdata = JSON.parse(localStorage.getItem("data"));
const URLEditar = "http://190.53.243.69:3001/validatecurrentpassword/";

//Identificador del formulario
const objeto = "FORM_CAMBIO_CONTRASENA"

const URL_API_ENV = process.env.REACT_APP_URL_API;

export default function CambioContra(props) {
  /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
  const [edit] = useGlobalState("registroEdit");
  const getAllSettingsParams = async () => {
    fetch(URL_API_ENV + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
      });
  };
  useEffect(() => {
    getAllSettingsParams();
  }, []);
  
  const validapassword = (url, data) => {
    console.log(data);
    setColor("danger");
    fetch(url + "/validatecurrentpassword", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsValid(true);
        if (!responseJson.status) {
          setColor("danger");
          setMesagge(responseJson.message);
          setTimeout(1000, () => {
            setIsValid(false);
          });
          return;
        }
        let code = responseJson.code;
        localStorage.setItem("currentpassword", JSON.stringify(code));

        // }
      })
      .catch((error) => {
        setColor("danger");
        setTimeout(1000, () => {
          setIsValid(false);
        });
      })
      .finally(() => {
        setTimeout(1000, () => {
          setIsValid(false);
        });
      });
  };
  useEffect(() => {
    getAllSettingsParams();
  }, []);

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];
  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlAPi = urlApiParam.valor;

  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);
  const refPasswordCurrent = useRef(null);
  const refContrasena = useRef(null);
  const refConfirmContrasena = useRef(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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


  //Alertas de ??xito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "??Guardado!",
          text: "Los cambios se guardaron con ??xito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "La contrase??a actual no es correcta",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "completar":
        Swal.fire({
          title: "Error",
          text: "Asegurese de completar correctamente todos los campos",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    // ??????? prevent page refresh
    console.log("linea 127");
    event.preventDefault();

    // console.log("form submitted ???");
    let currentpassword = {
      id_usuario: userdata.data.id,
      contrasena: md5(refPasswordCurrent.current.value),
    };
    let data = {
      id_user: userdata.data.id,
      newPassword: md5(refContrasena.current.value),
      confirmPassword: md5(refConfirmContrasena.current.value),
    };
    console.log(data);
    console.log(currentpassword);
    setIsValid(false);

    //inicia valida password actual
    fetch(urlAPi + "/validatecurrentpassword", {
      method: "POST",
      body: JSON.stringify(currentpassword),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        console.log("responseJson.status", responseJson.status);
        if (!responseJson.status) {
          setMesagge(responseJson.message);
          setIsValid(false);
          
        } else if (data.newPassword === data.confirmPassword){
          fetch(urlAPi + "/changePass", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json",
            },
          })
            mostrarAlertas("guardado");
              navigate("/admin/home");
              RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR CAMBIO CONTRASE??A"); //Insertar bitacora
        } 
      })
        mostrarAlertas("completar");
          navigate("/admin/cambiocontrasena");
      
    //fin valida password actual

    //inicio cambia contrasena

    //fin cambia contrasena
    //   .finally(() => {});
  };

  return (
    <div className="container">
      {
        <div className="">
          <h3 className="mb-3">Cambiar Contrase??a</h3>
          <form onSubmit={handleSubmit}>
            <div className="col-sm-5">
              <div className="mb-1">
                <label htmlFor="contraActual" className="form-label">
                  Contrase??a actual:
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  id="contraActual"
                  name="passwordCurrent"
                  ref={refPasswordCurrent}
                  placeholder="Ingrese su contrase??a actual"
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="mb-1">
                <label htmlFor="contraNueva" className="form-label">
                  Contrase??a nueva:
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Ingrese su nueva contrase??a"
                  ref={refContrasena}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="mb-3">
                <label htmlFor="contraNuevaConf" className="form-label">
                  Confirmar contrase??a nueva:
                </label>
                <input
                  placeholder="Ingrese su nueva contrase??a"
                  className="form-control"
                  type={passwordShown ? "text" : "password"}
                  ref={refConfirmContrasena}
                  name="passwordAgain"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>
            </div>

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              messages={{
                minLength: "La contrase??a tiene m??s de 8 caracteres.",
                specialChar: "La contrase??a tiene caracteres especiales.",
                number: "La contrase??a tiene un n??mero.",
                capital: "La contrase??a tiene una letra may??scula.",
                match: "Las contrase??as coinciden.",
              }}
            />
            <br></br>
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
          </form>
        </div>
      }
    </div>
  );
}
