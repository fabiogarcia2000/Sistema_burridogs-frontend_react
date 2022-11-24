import React, { useEffect, useRef, useState } from "react";
import "../cambio_contrasena/login.css";
import burridogs from "../cambio_contrasena/loginbg.jpg";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import PasswordChecklist from "react-password-checklist";
import md5 from "md5";
import { getOneParam } from "../../../utils/utils";

// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log('URL_API_ENV===>',URL_API_ENV)
export default function CambioContra(props) {

    /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
   const getAllSettingsParams = async () => {
      fetch(URL_API_ENV + "/ms_parametros/getall", {method: "GET",headers: { "Content-type": "application/json" },})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
      })
  };
  useEffect(  () => {
      getAllSettingsParams();
    }, []);

    var dataPar=JSON.parse(localStorage.getItem("params")) || []
    var urlApiParam=getOneParam(dataPar,"URL_API")
    const urlAPi =urlApiParam.valor


  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);
  const refContrasena = useRef(null);
  const refConfirmContrasena = useRef(null);

  const { id, token } = useParams();
  //   console.log("id", id);
  //   console.log("token", token);

  //   var isValidLink = false;
  const [validLink, setValidLink] = useState(false);
  //   const [message, setMessage] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validateLink = () => {
    let data = { id, token };

    fetch(URL_API_ENV + "/validateUser", {
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
        setValidLink(responseJson.status);
        // }
      })
      .catch((error) => {
        setValidLink(false);
      });
    //   .finally(() => {});
  };

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh

    event.preventDefault();

    // console.log("form submitted ✅");
    let data = {
      id_user: id,
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
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setIsValid(false);
        setMesagge("ha ocurrido un error al actualizar datos");
        navigate("/login");
      });
    //   .finally(() => {});
  };

  useEffect(() => {
    validateLink();
  }, []);

  return (
    <div className="background">
      {validLink ? (
        <div className="">
          <img src={burridogs} alt="burridogs" />

          <div className="formulario">
            <Alert isOpen={isValid} color={color}>
              {message}
            </Alert>

            <h1>Cambio de contraseña</h1>
            

            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <label>Contraseña:</label>
                <div className="username">
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Ingrese su nueva contraseña"
                    ref={refContrasena}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="showPass" onClick={togglePassword}>
                    Ver
                  </span>
                </div>

                <label>Confirmar contraseña:</label>

                <div className="username">
                  <input
                    placeholder="Ingrese su nueva contraseña"
                    type={passwordShown ? "text" : "password"}
                    ref={refConfirmContrasena}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                  <span className="showPass" onClick={togglePassword}>
                    Ver
                  </span>
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
              </div>
              <button type="submit" className="btn">
                Cambiar Contrase&ntilde;a
              </button>
            </form>

            {/* <div className="inputs">
              <label>Contraseña nueva</label>
              <div className="username">
                <input
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                />
              </div>

              <label>Confirmar nueva contraseña</label>
              <div className="username">
                <input
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                />
              </div>
              <button className="btn"> Ingresar </button>
            </div> */}
          </div>
        </div>
      ) : (
        <Row xs="3">
          <Col className=""></Col>
          <Col className="">
            <Card color="danger" outline className="my-4">
              <CardImg
                alt="Card image cap"
                src="https://picsum.photos/1080/720"
                top
                center
                width="100%"
                height="100%"
              />
              <CardBody>
                <CardTitle tag="h5" color="danger">
                  Error
                </CardTitle>
                <CardText>
                  En enlace que estas visitando ya no esta disponible o no es
                  v&aacute;lido
                </CardText>
                <CardText>
                  <Link to="/login">
                    <Button>Ir al Login</Button>
                  </Link>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className=""></Col>
        </Row>
      )}
    </div>
  );
}
