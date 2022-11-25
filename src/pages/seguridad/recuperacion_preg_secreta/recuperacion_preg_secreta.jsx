import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Styles from "../../../utils/Styles";
import { Field } from "react-final-form";
import Wizard from "../../../utils/Wizard";
import "../recuperacion_preguntas/login.css";
import burridogs from "../recuperacion_preguntas/loginbg.jpg";

import { getOneParam, isComent, translateUperCase } from "../../../utils/utils";

const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log("URL_API_ENV===>", URL_API_ENV);

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

// const required = (value) => (value ? undefined : "Required");
export default function RecuperacionPreguntas(props) {
  let navigate = useNavigate();
  const { id_usuario } = useParams();
  useEffect(() => {
    getAllSettingsParams();
    getRegistros();
  }, []);
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
        console.log("dataSettingsParams", responseJson);
        // console.log("dataSettingsParams", responseJson.object);
        if (!responseJson.status) {
          console.log("algo salio mal en el servidor");
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
        // setParams(responseJson.object);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const [registros, setRegistros] = useState([]);
  const getRegistros = async () => {
    fetch(urlAPi + "/ms_pregunta/getall", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson", responseJson);
        // console.log("responseJson.status", responseJson.status);
        setRegistros(responseJson.object);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // const [params, setParams] = useState([]);
  // // var steps = [];
  // var numberQuestion = getOneParam(params, "ADMIN_PREGUNTAS");

  // var arraySteps=[]
  // for (let index = 0; index < numberQuestion.valor; index++) {
  //   arraySteps.push({
  //     question:"Pregunta"+index,
  //     answer:"Respuesta"+index,
  //   })

  // }

  // const [params, setParams] = useState([]);
  // var steps = [];

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];
  var numberQuestion = getOneParam(dataPar, "ADMIN_PREGUNTAS");
  console.log("numberQuestion", numberQuestion.valor);
  var arraySteps = [];
  for (let index = 1; index <= numberQuestion.valor; index++) {
    arraySteps.push({
      question: "pregunta" + index,
      answer: "respuesta" + index,
    });
  }
  console.log("arraySteps", arraySteps);
  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlAPi = urlApiParam.valor;

  const onSubmit = async (values) => {
    //llamando al servicio por pregunta
    var preguntas_contestadas=0
    for (let index = 0; index < numberQuestion.valor; index++) {
      const pregunta = values["pregunta" + (index + 1)];
      const respuesta = values["respuesta" + (index + 1)];
      const dataQuest = {
        id_usuario: parseInt(id_usuario),
        id_pregunta: parseInt(pregunta),
        respuesta: String(respuesta).trim().toUpperCase(),
      };
      console.log("dataQuest", dataQuest);
       await fetch(urlAPi + "/ms_pregunta_usuario/save", {
              method: "POST",
              body: JSON.stringify(dataQuest),
              headers: {
                "Content-type": "application/json",
              },
            })
            .then((response) => response.json())
            .then((responseJson) => {
              preguntas_contestadas=preguntas_contestadas+1
            })
            .catch(error=>console.log(error));
    }
// actualizando el etsado del usuario
    await fetch(urlAPi + "/ms_registro/updateUserState", {
      method: "POST",
      body: JSON.stringify({ 
        preguntas_contestadas:preguntas_contestadas,
        id_usuario: id_usuario
       }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
    // localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="background">
      <img src={burridogs} alt="burridogs" />

      <div className="formulario steps">
        <h2>Recuperaci&oacute;n por preguntas </h2>
        <h5>
          Antes de continuar es necesario que crees tus preguntas/respuestas de
          seguridad
        </h5>

        <div className="container">
          <Styles>
            <Wizard
              // initialValues={{ id_usuario: id_usuario }}
              onSubmit={onSubmit}
            >
              {arraySteps.map((step, index) => (
                <Wizard.Page
                  validate={(values) => {
                    const errors = {};
                    if (!values[step.answer]) {
                      errors[step.answer] = "Requerida";
                    } else if (!isComent(values[step.answer])) {
                      errors[step.answer] = "Ingresa solo texto y/o números";
                    }

                    if (!values[step.question]) {
                      errors[step.question] = "Requerida";
                    }
                    return errors;
                  }}
                >
                  <h4>
                    {index + 1}/{numberQuestion.valor}
                  </h4>
                  <div>
                    <label>Pregunta {index + 1}</label>
                    <Field name={step.question} component="select">
                      <option value="-1">
                        --Selecciona pregunta ({index + 1})--
                      </option>
                      {registros.map((item) => (
                        <option value={item.id_pregunta}>
                          {item.pregunta}
                        </option>
                      ))}
                    </Field>
                    <Error name={step.question} />
                  </div>
                  <div>
                    <label>Respuesta {index + 1}</label>
                    <Field
                      name={step.answer}
                      component="input"
                      type="text"
                      placeholder={"Respuesta " + (index + 1)}
                    />
                    <Error name={step.answer} />
                  </div>
                </Wizard.Page>
              ))}
            </Wizard>
          </Styles>
        </div>
      </div>
    </div>
  );
}
