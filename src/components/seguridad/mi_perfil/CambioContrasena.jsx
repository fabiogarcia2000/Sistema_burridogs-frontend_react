import {useParams, Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import PasswordChecklist from "react-password-checklist";
import React, { useEffect, useRef, useState } from "react";
import md5 from "md5";
import { getOneParam } from "../../../utils/utils"; 

const userdata = JSON.parse(localStorage.getItem('data'))
const URLEditar = "https://jsonplaceholder.typicode.com/comments";

const URL_API_ENV = process.env.REACT_APP_URL_API;

export default function CambioContra(props) {
    /**
     ** get settign params
    * obteniendo todos los parametros de configuracion del sistema
    * */
     const [edit] = useGlobalState('registroEdit')
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

    var dataPar = JSON.parse(localStorage.getItem("params")) || [];
    var urlApiParam = getOneParam(dataPar, "URL_API");
    const urlAPi = urlApiParam.valor;

    let navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [message, setMesagge] = useState("");
    const [color, setColor] = useState("danger");
    const [isValid, setIsValid] = useState(false);
    const refContrasena = useRef(null);
    const refConfirmContrasena = useRef(null);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
      setPasswordShown(!passwordShown);
    };

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

    const handleSubmit = (event) => {
      // 👇️ prevent page refresh
  
      event.preventDefault();
  
      // console.log("form submitted ✅");
      let data = {
        id_user: userdata.data.id,
        newPassword: md5(refContrasena.current.value),
        confirmPassword: md5(refConfirmContrasena.current.value),
      };
      setIsValid(false);
      fetch(urlAPi + "/changePass", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log("responseJson", responseJson);
          // console.log("responseJson.status", responseJson.status);
          if (!responseJson.status) {
            setMesagge(responseJson.message);
            setIsValid(false);
          }
          setColor("success");
          setIsValid(true);
          setMesagge(responseJson.message);
          setTimeout(() => {
            navigate("/admin/home");
          }, 2000);
        })
        .catch((error) => {
          setIsValid(false);
          setMesagge("ha ocurrido un error al actualizar datos");
          navigate("/admin/home");
        });
      //   .finally(() => {});
    };

    return (
      <div className="container">
        <Formik
          //valores iniciales
          initialValues={{
              passwordCurrent: edit.passwordCurrent,
              password: edit.password,
              passwordAgain: edit.passwordAgain, 
          }}

          onSubmit={async (valores) => {
                //procedimineto para guardar el los cambios
                try {
                  const res = await axios.put(`${URLEditar}${valores.passwordCurrent}`, valores);

                    if (res.status === 200) {
                      mostrarAlertas("guardado");
                      navigate("/admin/home");
                    } else {
                      mostrarAlertas("error");
                    }
                  
                } catch (error) {
                  console.log(error);
                  mostrarAlertas("error");
                  navigate("/admin/home");
                }
          }}
        >

        {({ errors, values }) => (
            <Form>
              <h3 className="mb-3">Cambiar Contraseña</h3>
              
                <div className="col-sm-5">
                  <div className="mb-1">
                  <label htmlFor="contraActual" className="form-label">
                      Contraseña actual:
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      id="contraActual"
                      name="passwordCurrent"
                      placeholder="Ingrese su contraseña actual"
                    />
                    <span className="showPass" onClick={togglePassword}>
                      Ver 
                    </span>
                    <ErrorMessage
                      name="passwordCurrent"
                      component={() => (
                        <div className="error">{errors.passwordCurrent}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-5">
                  <div className="mb-1">
                  <label htmlFor="contraNueva" className="form-label">
                      Contraseña nueva:
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      placeholder="Ingrese su nueva contraseña"
                      ref={refContrasena}
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
                      Confirmar contraseña nueva:
                    </label>
                    <input
                      placeholder="Ingrese su nueva contraseña"
                      className="form-control"
                      type={passwordShown ? "text" : "password"}
                      ref={refConfirmContrasena}
                      onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <span className="showPass" onClick={togglePassword}>
                      Ver
                    </span>
                  </div>
                </div>

                <PasswordChecklist
                    rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "match",
                    ]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    messages={{
                      minLength: "La contraseña tiene más de 8 caracteres.",
                      specialChar: "La contraseña tiene caracteres especiales.",
                      number: "La contraseña tiene un número.",
                      capital: "La contraseña tiene una letra mayúscula.",
                      match: "Las contraseñas coinciden.",
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
            </Form>
          )}
        </Formik>
      </div>
    );
  }