import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Form, FormGroup, Input, Label } from "reactstrap";
/* eslint-disable jsx-a11y/accessible-emoji */

// import { render } from 'react-dom'
import Styles from "../../../utils/Styles";
import Wizard from "../../../utils/Wizard";
import "../recuperacion_preguntas/login.css";
// import burridogs from "../recuperacion_preguntas/loginbg.jpg";


import { Button, FormGroup, Label, Input, Row, Col, Spinner } from "reactstrap";
import { Form, Field } from "react-final-form";
import { getOneParam, isChar, isComent, isNumber, isRange, isText, isTextWhitSpace, toUpperCaseField, translateUperCase } from "../../../utils/utils";


// const urlAPi = "http://localhost:3001";
const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log("URL_API_ENV===>", URL_API_ENV);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const required = (value) => (value ? undefined : "Required");

export default function MyProfile(props) {

  const [loading, setLoading] = useState(true);

  var dataPar=JSON.parse(localStorage.getItem("params")) || []
      
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlapi =urlApiParam.valor
  
  var minLengthParam=getOneParam(dataPar,"MIN_LENGTH_NAMES")
  var maxLengthParam=getOneParam(dataPar,"MAX_LENGTH_NAMES")

  const userdata= JSON.parse(localStorage.getItem('data')) 

  let navigate = useNavigate();
  // const { id } = useParams();
  const id  = userdata.data.id;

  
  const [registro, setRegistro] = useState({});


  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    fetch(urlapi + "/ms_rol/getall"
    , {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        setRoles(responseJson.object);
    })
};
  const [estados, setEstados] = useState([]);

  const getEstados = async () => {
    fetch(urlapi + "/ms_estado/getall"
    , {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        setEstados(responseJson.object);
    })
};



  const getRegistroById = async () => {
    fetch(urlapi + "/getById/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRegistro(responseJson.object);
        setLoading(false)
      })
  };

  useEffect(() => {
    getEstados();
    getRoles();
    getRegistroById();
  }, []);


  const onSubmitEdit = (event) => {
    let data={
      // usuario:event.usuario,
      nombre_usuario:event.nombre_usuario,
      estado_usuario:event.estado_usuario,
      id_rol:event.id_rol,
      modificado_por:userdata.data.nameUser,
      id_usuario:id,
    }
  
    fetch(urlapi + "/ms_registro/update/"+ id, {
      method: "PUT",
      body:JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("edit user", responseJson);
        console.log("Edit usef", responseJson.status);
        if(responseJson.status){
            navigate('/admin/users')
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // ========

  // let navigate = useNavigate();
  // const { id_usuario } = useParams();
  const id_usuario  = id

  const [params, setParams] = useState([]);
  // // var steps = [];
  // var numberQuestion = getOneParam(params, "ADMIN_PREGUNTAS");

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];
  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlAPi = urlApiParam.valor;

  
  var numberQuestion = getOneParam(dataPar, "ADMIN_PREGUNTAS");
  console.log("numberQuestion", numberQuestion.valor);
  var arraySteps = [];
  // var valoresInit={}
  for (let index = 1; index <= numberQuestion.valor; index++) {
    arraySteps.push({
      question: "pregunta" + index,
      answer: "respuesta" + index,
    });
    // Object.assign(valoresInit,{
    //   pregunta: "pregunta" + index,
    //   respuesta: "respuesta" + index,
    // })
  }

  // console.log('valoresInit',valoresInit)

  const onSubmit = async (values) => {
    console.log("values", values);
    // await fetch(urlAPi + "/ms_registro/updateUserState", {
    //   method: "POST",
    //   body: JSON.stringify({ id_usuario: id_usuario }),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // }).then((response) => response.json());

    // localStorage.clear();
    navigate("/admin/home");
    // window.location.reload();
  };

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
          console.log("algo salio mal en el servidor");
          return;
        }
        // localStorage.setItem("params", JSON.stringify(responseJson.object));
        setParams(responseJson.object);
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

  useEffect(() => {
    getAllSettingsParams();
    getRegistros();
  }, []);

  return (
   
      <div className="">
<div className="container">
      <h4>Mi perfil</h4>
      {loading?<Spinner animation="border" variant="success" />:undefined}
      
      <div className="row">
        <div className="col-md-12">
          <Form
            onSubmit={onSubmitEdit}
            initialValues={
              { 
                id_rol: registro.id_rol,
                estado_usuario: registro.estado_usuario,
                nombre_usuario: registro.nombre_usuario,
                usuario: registro.usuario,
                }
            }
            validate={(values) => {
              const errors = {};
              if (!values.id_rol) {
                errors.id_rol = "Campo Requerido";
              }

              if (!values.nombre_usuario) {
                errors.nombre_usuario = "Campo requerido";
              } else if (!isTextWhitSpace(values.nombre_usuario)) {
                errors.nombre_usuario = "Ingresar solo letras";
              } else if (isChar(values.nombre_usuario)) {
                errors.nombre_usuario = "No puede contener caracteres especiales";
              } else if (isNumber(values.nombre_usuario)) {
                errors.nombre_usuario = "No puede contener numeros";
              } else if (isRange(values.nombre_usuario,minLengthParam.valor,maxLengthParam.valor)) {
                errors.nombre_usuario = "Debe tener una longitud entre "+minLengthParam.valor+" y "+maxLengthParam.valor;
              }
              if (!values.estado_usuario) {
                errors.estado_usuario = "Campo Requerido";
              }
              
              return errors;
            }}
            render={({
              handleSubmit,
              values,
              submitting,
              validating,
              valid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} lg={6}>

                     {/* usaurio */}
                     <FormGroup>
                      <Field name="usuario" >
                        {({ input, meta }) => (
                          <div>
                            <Label for="usuario">Usuario</Label>
                            <Input
                              {...input}
                              type="text"
                              disabled
                              placeholder="Usuario"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>


                      {/* nombre de usuario */}
                      <FormGroup>
                      <Field name="nombre_usuario">
                        {({ input, meta }) => (
                          <div>
                            <Label for="nombre_usuario">Nombre de usuario</Label>
                            {/* <Label for="nombre_usuario">Nombre de usuario<span className="danger"> *</span></Label> */}
                            {/* <span className="labelHint">{values?.nombre_usuario?.length || 0}/{maxLengthParam?.valor || 0}</span> */}
                            <Input
                              {...input}
                              type="text"
                              placeholder="Nombre de usuario"
                              id="nombre_usuario"
                              name="nombre_usuario"
                              disabled
                              invalid={meta.error && meta.touched}
                              onKeyDown={translateUperCase(values,"nombre_usuario")}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                              )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                      
                      {/* estado */}
                      <FormGroup>
                      {/* <Label for="estado_usuario">Estado<span className="danger"> *</span></Label> */}
                      <Label for="estado_usuario">Estado</Label>
                      <Field 
                        className="form-select"
                        id="estado_usuario"
                        name="estado_usuario"
                        disabled
                        component="select"
                        >
                               {
                                estados.map((item) => (
                                <option value={item.id}>{item.descripcion}</option>
                                ))}
                        </Field>
                    </FormGroup>
                    
                  
                   {/* role */}
                   <FormGroup>
                      <Label for="id_rol">Rol</Label>
                      {/* <Label for="id_rol">Rol<span className="danger"> *</span></Label> */}
                      <Field   
                      className="form-select"
                       id="id_rol"
                        name="id_rol"
                       component="select"
                       disabled
                       >
                               {
                                roles.map((item) => (
                                <option value={item.id_rol}>{item.rol}</option>
                                ))}
                        </Field>
                    </FormGroup>

  
                    {/* ulrima conexion */}
                    <FormGroup>
                      <Label for="fecha_ultima_conexion">Ultima conexión</Label>
                      <Field name="fecha_ultima_conexion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_ultima_conexion}
                              placeholder="Ultima conexion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

        
                  {/* preguntas contestadas */}
                  <FormGroup>
                      <Label for="preguntas_contestadas">Preguntas contestadas</Label>
                      <Field name="preguntas_contestadas">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.preguntas_contestadas}
                              placeholder="Preguntas contestadas"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* intentos login */}
                    <FormGroup>
                      <Label for="intentos_login">Intentos Login</Label>
                      <Field name="intentos_login">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Intentos login"
                              value={registro.intentos_login}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* <Link className="btn btn-secondary btn-block"  to="/admin/users">Cancelar</Link> */}
                  </Col>

                  <Col md={6} lg={6}>
                      {/* primer ingreso */}
                      <FormGroup>
                      <Label for="primer_ingreso">Primer Ingreso</Label>
                      <Field name="primer_ingreso">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Primer ingreso"
                              value={registro.primer_ingreso}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                   
                    {/* fecha venciemiento */}
                    <FormGroup>
                      <Label for="fecha_vencimiento">Fecha vencimiento</Label>
                      <Field name="fecha_vencimiento">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_vencimiento}
                              placeholder="Fecha de vencimiento"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                  {/* correo */}
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.correo_electronico}
                              placeholder="Correo electronico"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                   
                    

                    {/* creado por */}
                    <FormGroup>
                      <Label for="createdBy">Creado por</Label>
                      <Field name="createdBy">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.creado_por}
                              placeholder="Creado Por"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                  
                  
                    
                    {/* fecha de creacion */}
                    <FormGroup>
                      <Label for="fecha_creacion">Fecha creación </Label>
                      <Field name="fecha_creacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_creacion}
                              placeholder="Fecha de creación"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                    
                    {/* modificado por */}
                    <FormGroup>
                      <Label for="modificado_por">Modificado Por</Label>
                      <Field name="modificado_por">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Modificado Por"
                              value={registro.modificado_por}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                  
                   {/* fecha de modificaicon */}
                   <FormGroup>
                      <Label for="fecha_modificacion">Fecha de modificación</Label>
                      <Field name="fecha_modificacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_modificacion}
                              placeholder="Fecha de modifiacion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                  
                {/* <Button type="submit"  color="primary" className="btn-block" disabled={!valid}>Editar</Button> */}
                  </Col>
                </Row>

              </form>
            )}
          />
        </div>
      </div>
    </div>


        <h2>Mis preguntas de seguridad</h2>
        {/* <h5>Actualiza tu spreguintas de seguridad</h5> */}

        <div className="container">
          {/* {counter}/{numberQuestion.valor} */}
          <Styles>
            <Wizard
               
              initialValues={{ 
                id_usuario: id ,
                respuesta1:"EDITAR",
                pregunta1:1,
                respuesta2:"EDITAR",
                pregunta2:2,
                respuesta3:"EDITAR",
                pregunta3:3,

              }}
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
  
  );
}
