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

    // Aqui deberia ir URL_API_ENV
    fetch(URL_API_ENV + "/reset?unlock=true", {
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
          if (responseJson.status === true) {
            navigate("/login");
          }
        }, 3000);
      })
      .catch((error) => {
        // console.log(error);
        setIsValid(false);
        setColor("danger");
      })
      .finally(() => {
        // console.log("asdasda");
        // setIsValid(false);
      });
  };

  return (
    <div className="background">
      <img src={burridogs} alt="burridogs" />
      <div className="formulario">
        <Alert isOpen={isValid} color={color}>
          {" "}
          {message}{" "}
        </Alert>
        <h2>Desbloquear usuario</h2>
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
      </div>
    </div>
  );
}
