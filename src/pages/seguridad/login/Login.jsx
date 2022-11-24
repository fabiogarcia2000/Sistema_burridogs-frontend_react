import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Form, Link, useNavigate } from "react-router-dom";
import { Alert, Button, FormGroup, Input, Label } from "reactstrap";
import md5 from "md5";
// import { Field } from "formik";
import { Form, Field } from "react-final-form";

import "./login.css";
import burridogs from "./loginbg.jpg";
import {
  isChar,
  isNumber,
  isRange,
  isSpace,
  isText,
  translateUperCase,
} from "../../../utils/utils";

const getOneParam = (objectJson, nameParam) => {
  return objectJson.filter((item) => item.parametro === nameParam)[0] || {};
};

// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
//const URL_API_ENV = "http://localhost:3001";
console.log("URL_API_ENV===>", URL_API_ENV);
//
export default function Login(props) {
  // const [params, setParams] = useState("");
  var nameCompany = "";
  var phone = "";
  var mailContact = "";
  var userContact = "";
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
        // console.log("dataSettingsParams", responseJson);
        // console.log("dataSettingsParams", responseJson.object);
        if (!responseJson.status) {
          // console.log("algo salio mal en el servidor");
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
        // setParams(responseJson.object);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllSettingsParams();
    //  nameCompany=params
  }, []);

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];
  var nombreParam = getOneParam(dataPar, "SYS_NOMBRE");
  console.log(nombreParam);
  nameCompany = nombreParam.valor;

  var phoneParam = getOneParam(dataPar, "SYS_PHONE");
  phone = phoneParam.valor;

  var mailParam = getOneParam(dataPar, "ADMIN_CORREO");
  mailContact = mailParam.valor;

  var contacParam = getOneParam(dataPar, "ADMIN_CUSER");
  userContact = contacParam.valor;

  var urlApiParam = getOneParam(dataPar, "URL_API");
  console.log(urlApiParam);

  var paramJwtSecret = getOneParam(dataPar, "JWT_SECRET");
  var paramTimeExpired = getOneParam(dataPar, "JWT_TIME_EXPIRED");

  const urlAPi = urlApiParam.valor;

  var minLengthUserParam = getOneParam(dataPar, "MIN_LENGTH_USERS");
  var maxLengthUserParam = getOneParam(dataPar, "MAX_LENGTH_USERS");

  // console.log("getOneParam",dataPar)
  // const { history } = this.props;
  let navigate = useNavigate();
  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const enviarData = (url, data) => {
    console.log(data);
    setColor("danger");
    fetch(url + "/login", {
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
        let dataUser = {
          "x-token": responseJson["x-token"],
          data: responseJson.data,
        };
        localStorage.setItem("data", JSON.stringify(dataUser));
        navigate("/admin/home");
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
  //capturar los datos ingresados
  // const refNombreUsuario = useRef(null);
  // const RefContrasena = useRef(null);

  const onSubmit = async (values) => {
    // console.log(values);

    const data = {
      nombre_usuario: values.username.trim().toUpperCase(),
      pass: values.password,
      contrasena: md5(values.password),
      parametros: [paramJwtSecret, paramTimeExpired],
    };
    console.log("data", data);
    await enviarData(urlAPi, data);
  };

  // const [usernameTranslate, setUsernameTranslate] = useState('');
  // const handleChange = event => {
  //   return event.target.value.toUpperCase();
  // };

  return (
    <div className="background">
      <img src={burridogs} alt="burridogs" />
      <div className="formulario">
        <Alert isOpen={isValid} color={color}>
          {message}
        </Alert>
        <h2>{nameCompany}</h2>
        <h2>Panel administrativo</h2>
        {/* <h4>Inicio de Sesión</h4> */}
        <h5 className="caption">Ingresa tus credenciales para continuar</h5>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            username: "",
            password: "",
          }}
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
            // values.username= (values.username).toUpperCase()

            if (!values.password) {
              errors.password = "La contraseña es requerida";
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
                            placeholder="Ingresa tu usuario"
                            id="username"
                            name="username"
                            onKeyDown={translateUperCase(values, "username")}
                            invalid={meta.error && meta.touched}
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

                <FormGroup>
                  <Field name="password">
                    {({ input, meta }) => (
                      <div>
                        <Label for="password">
                          Contraseña<span className="danger"> *</span>
                        </Label>
                        {/* <div className="username"> */}
                        {/* <div className="fa fa-lock"></div> */}
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <i class="bi bi-lock"></i>
                          </span>
                          <Input
                            {...input}
                            id="password"
                            name="password"
                            type={passwordShown ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            invalid={meta.error && meta.touched}
                          />
                          <span
                            className="showPass-login"
                            onClick={togglePassword}
                          >
                            {" "}
                            Ver{" "}
                          </span>
                        </div>
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
                  Iniciar Sesión
                </Button>
                <div className="buttom-container">
                  <Link to="/recuperacion_contrasena">
                    ¿Olvidaste tu contraseña?
                  </Link>
                  {/* <Link to="/unlockuser">Desbloquea tu usuario</Link> */}
                  <Link to="/registro">Crear cuenta</Link>
                </div>
                <div className="info-container">
                  <p>
                    Para dudas o consultas comunicate con{" "}
                    <strong>{userContact}</strong>
                    <br />
                    administardor del sistema al número <strong>{phone}</strong>
                    <br />o escribe al correo <strong>{mailContact}</strong>
                  </p>
                </div>
              </form>
            </div>
          )}
        />
      </div>
    </div>
  );
}
