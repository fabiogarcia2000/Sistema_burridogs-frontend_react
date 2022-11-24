import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, FormGroup, Input, Label } from "reactstrap";
// import { FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { Form, Field } from "react-final-form";
import "../recuperacion_contrasena/reset.css";
import burridogs from "../recuperacion_contrasena/loginbg.jpg";
import {
  getOneParam,
  isChar,
  isNumber,
  isRange,
  isSpace,
  isText,
  translateUperCase,
} from "../../../utils/utils";

//url
/*const URL_LOGIN = ""

const enviarData = async (url, data) => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const json = await resp.json();
}*/

// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log("URL_API_ENV===>", URL_API_ENV);
export default function RecuperacionContra(props) {
  let navigate = useNavigate();

  /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
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

  var minLengthUserParam = getOneParam(dataPar, "MIN_LENGTH_USERS");
  var maxLengthUserParam = getOneParam(dataPar, "MAX_LENGTH_USERS");

  //Parametros extras
  var paramSetting = [
    getOneParam(dataPar, "ADMIN_CORREO"),
    getOneParam(dataPar, "ADMIN_CPASS"),
    getOneParam(dataPar, "SYS_NOMBRE"),
    getOneParam(dataPar, "SYS_PHONE"),
    getOneParam(dataPar, "ADMIN_CUSER"),
    getOneParam(dataPar, "URL_PANEL"),
    getOneParam(dataPar, "JWT_SECRET"),
    getOneParam(dataPar, "JWT_TIME_EXPIRED"),
  ];
  //Fin parametros extras

  //capturar los datos ingresados
  //  const refPregunta = useRef(null);
  //  const RefRespuesta = useRef(null);
  const refNombreUsuario = useRef(null);

  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);

  const onSubmit = (values) => {
    const data = {
      //   nombre_usuario: refNombreUsuario.current.value,
      nombre_usuario: values.username,
      paramSetting,
    };
    //  console.log("data",data);
    //  console.log('hacer recuperaicon de pass');
    setIsValid(true);
    setColor("primary");
    setMesagge("Enviado solicitud....");
    fetch(urlAPi + "/reset", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        // console.log("responseJson.status", responseJson.status);

        if (!responseJson.status) {
          setColor("danger");
          setMesagge(responseJson.message);
          // console.log("ha ocurrido un erorr al enviar el correo");
        }
        setMesagge(responseJson.message);
        setColor("success");
        setIsValid(true);
        setTimeout(() => {
          setIsValid(false);
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        // console.log(error);
        setIsValid(false);
        setColor("danger");
      })
      .finally(() => {
        // console.log("asdasda");
        setIsValid(false);
      });
  };

  //   const onSubmit = async (values) => {
  //     console.log("values",values);
  //   };

  // const steps = [
  //   {title: 'StepOne', component: <Step/>},
  //   {title: 'StepTwo', component: <Step/>},
  //   {title: 'StepThree', component: <Step/>},
  //   {title: 'StepFour', component: <Step/>}
  // ];
  // // custom styles
  // const prevStyle = { background: '#33c3f0' }
  // const nextStyle = { background: '#33c3f0' }
  return (
    // <>
    // <div className='container'>
    //   <MultiStep activeStep={0} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
    //   <div className='app-footer'>
    //     <h6>Press 'Enter' or click on progress bar for next step.</h6>
    //     Code is on{' '}
    //     <a href='https://github.com/Srdjan/react-multistep' target='_blank' rel='noreferrer'>
    //       github
    //     </a>
    //   </div>
    // </div>
    // </>

    <div className="background">
      <img src={burridogs} alt="burridogs" />
      <div className="formulario">
        <Alert isOpen={isValid} color={color}>
          {" "}
          {message}{" "}
        </Alert>
        <h2>¿Olvidaste tu contraseña?</h2>
        <h5 className="caption">
          Ingresa tu nombre de usuario y selecciona metodo de reinicio{" "}
        </h5>

        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};

            // console.log('values.username',values.username)
            if (!values.username) {
              errors.username = "Usuario requerido";
            } else if (isSpace(values.username)) {
              errors.username = "No se permiten espacios";
            } else if (!isText(values.username)) {
              errors.username = "Ingresar solo letras";
            } else if (isChar(values.username)) {
              errors.username = "No puede contener caracteres especiales";
            } else if (isNumber(values.username)) {
              errors.username = "No puede contener numeros";
            } else if (
              isRange(
                values.username,
                minLengthUserParam.valor,
                maxLengthUserParam.valor
              )
            ) {
              errors.username =
                "Debe tener una longitud entre " +
                minLengthUserParam.valor +
                " y " +
                maxLengthUserParam.valor;
            }

            return errors;
          }}
          render={({ handleSubmit, values, submitting, validating, valid }) => (
            <div className="inputs">
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Field name="username">
                    {({ input, meta }) => (
                      <div>
                        <Label for="username">
                          Usuario<span className="danger"> *</span>
                        </Label>
                        {/* <div className="username"> */}
                        {/* <div className="fa fa-user-o"></div> */}
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <i class="bi bi-person"></i>
                          </span>
                          <Input
                            {...input}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ingresa tu usuario"
                            invalid={meta.error && meta.touched}
                            onKeyDown={translateUperCase(values, "username")}
                          />
                        </div>
                        {/* </div> */}
                        {meta.error && meta.touched && (
                          <span class="danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  block
                  disabled={!valid && submitting}
                >
                  Restablecer v&iacute;a correo
                </Button>
                <div className="buttom-container">
                  {/* <Link to="/recuperacion_preguntas" disabled={!responseUser} color="secondary" size="lg" block>Restablecer v&iacute;a preguntas</Link> */}
                  {/* <Button color="secondary" size="lg" block >Restablecer v&iacute;a preguntas</Button> */}
                  <Link to="/login">Cancelar</Link>
                </div>
              </form>
            </div>
          )}
        />

        {/* <h1>Recuperación de contraseña</h1>
                <div class="inputs">
                    <div class="mensaje">¿Olvidaste tu contraseña?</div>
                    <div class="mensaje">Ingresa tu nombre de usuario y selecciona metodo de reinicio.</div>
                    <div class="username">
                        <i class="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            ref={refNombreUsuario} />
                    </div>
                    <button
                        onClick={handleLogin}
                        className='btn'>Restablecer v&iacute;a correo</button>
                    <div className="buttom-container">
                        <Link to="/recuperacion_preguntas">
                            Cambia tu contrase&ntilde;a via preguntas
                        </Link>
                        <Link to="/login">
                            Cancelar
                        </Link>
                    </div>
                </div> */}
      </div>
    </div>
  );
}
