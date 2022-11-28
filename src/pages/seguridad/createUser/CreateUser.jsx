// import axios from "axios";
// import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Label, Input, FormText, Spinner, Row, Col, } from "reactstrap";
// import { Alert } from 'reactstrap';
import { Form, Field } from "react-final-form";
import { getOneParam, isChar, isNumber, isRange, isSpace, isText, isTextWhitSpace, toReplaceSpace, toUpperCaseField, translateUperCase, } from "../../../utils/utils";
import isEmail from "validator/lib/isEmail";
// import "./CreateUser.css";
var newOTP = require("otp-generators");
var md5 = require("md5");
// const urlapi = "http://localhost:3001";
const CreateUser = () => {
  
  const [loading, setLoading] = useState(false);

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];

  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlapi = urlApiParam.valor;

  //Parametros extras
  var paramSetting = [
    getOneParam(dataPar, "ADMIN_CORREO"),
    getOneParam(dataPar, "ADMIN_CPASS"),
    getOneParam(dataPar, "SYS_NOMBRE"),
    getOneParam(dataPar, "SYS_PHONE"),
    getOneParam(dataPar, "ADMIN_CUSER"),
    getOneParam(dataPar, "ADMIN_VIGENCIA"),
    getOneParam(dataPar, "URL_PANEL"),
  ];
  //Fin parametros extras

  // var minLengthParam = getOneParam(dataPar, "MIN_CONTRA");
  var maxLengthParam = getOneParam(dataPar, "MAX_CONTRA");
  // var minLowerParam = getOneParam(dataPar, "MINUS_CHAR");
  var minUpperParam = getOneParam(dataPar, "MAYUS_CHAR");
  minUpperParam = isNumber(minUpperParam.valor) ? false : true;

  // var minNumberParam = getOneParam(dataPar, "NUM_CONTRA");
  var minCharParam = getOneParam(dataPar, "CHAR_ESP_CONTRA");
  minCharParam = isNumber(minCharParam.valor) ? false : true;

  var minLengthUserParam = getOneParam(dataPar, "MIN_LENGTH_USERS");
  var maxLengthUserParam = getOneParam(dataPar, "MAX_LENGTH_USERS");

  var minLengthNamesParam = getOneParam(dataPar, "MIN_LENGTH_NAMES");
  var maxLengthNamesParam = getOneParam(dataPar, "MAX_LENGTH_NAMES");

  var adminVigenciaParam = getOneParam(dataPar, "ADMIN_VIGENCIA");

  const userdata = JSON.parse(localStorage.getItem("data"));

  let navigate = useNavigate();
  // const { id } = useParams();

  // const [registro, setRegistro] = useState({});

  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    fetch(urlapi + "/ms_rol/getall", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJsonrol", responseJson);
        setRoles(responseJson.object);
      });
  };
  const [estados, setEstados] = useState([]);

  const getEstados = async () => {
    fetch(urlapi + "/ms_estado/getall", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        setEstados(responseJson.object);
      });
  };

 
  useEffect(() => {
    getEstados();
    getRoles();
    // getRegistroById();
  }, []);

  var dateEndParam = new Date();
  var now = dateEndParam;
  now = now.toISOString();
  // console.log('adminVigenciaParam.valor',adminVigenciaParam.valor)
  dateEndParam.setDate(
    dateEndParam.getDate() + parseInt(adminVigenciaParam.valor)
  );
  dateEndParam = dateEndParam.toISOString();
  // const  dateEndParam = new Date() + ;
  const onSubmit = (event) => {
    setLoading(true);
    let otp = newOTP.generate(maxLengthParam.valor, {
      alphabets: true,
      upperCase: minUpperParam,
      specialChar: minCharParam,
    });
    let data = {
      usuario: event.usuario,
      nombre_usuario: event.nombre_usuario,
      correo_electronico: event.correo_electronico,
      // estado_usuario:2,
      id_rol: event.id_rol,
      creado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
      contrasena: md5(otp),
      otp: otp,
      paramSetting,
      // id_usuario:id,
    };
    console.log("data", data);

    fetch(urlapi + "/ms_registro/createUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        navigate("/admin/users");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h4>Crear usuario</h4>
      {loading ? <Spinner animation="border" variant="success" /> : undefined}

      <div className="row">
        <div className="col-md-12">
          <Form
            onSubmit={onSubmit}
            
            validate={(values) => {
              const errors = {};
              
              if (!values.usuario) {
                errors.usuario = "Usuario es requerido";
              } else if (isSpace(values.usuario)) {
                errors.usuario = "No se permiten espacios";
              } else if (!isText(values.usuario)) {
                errors.usuario = "Ingresar solo letras";
              } else if (isChar(values.usuario)) {
                errors.usuario = "No puede contener caracteres especiales";
              } else if (isNumber(values.usuario)) {
                errors.usuario = "No puede contener numeros";
              } else if (
                isRange(
                  values.usuario,
                  minLengthUserParam.valor,
                  maxLengthUserParam.valor
                )
              ) {
                errors.usuario =
                  "Debe tener una longitud entre " +
                  minLengthUserParam.valor +
                  " y " +
                  maxLengthUserParam.valor;
              }

              if (!values.nombre_usuario) {
                errors.nombre_usuario = "Nombre es requerido";
              } else if (!isTextWhitSpace(values.nombre_usuario)) {
                errors.nombre_usuario = "Ingresar solo letras";
              } else if (isChar(values.nombre_usuario)) {
                errors.nombre_usuario =
                  "No puede contener caracteres especiales";
              } else if (isNumber(values.nombre_usuario)) {
                errors.nombre_usuario = "No puede contener numeros";
              } else if (
                isRange(
                  values.nombre_usuario,
                  minLengthNamesParam.valor,
                  maxLengthNamesParam.valor
                )
              ) {
                errors.nombre_usuario =
                  "Debe tener una longitud entre " +
                  minLengthNamesParam.valor +
                  " y " +
                  maxLengthNamesParam.valor;
              }

              // mail validations
              if (!values.correo_electronico) {
                errors.correo_electronico = "Correo es requerido";
              } else if (!isEmail(values.correo_electronico)) {
                errors.correo_electronico = "Este no es un correo válido";
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
                      <Field name="usuario">
                        {({ input, meta }) => (
                          <div>
                            <Label for="usuario">
                              Usuario<span className="danger"> *</span>
                            </Label>
                            <Input
                              {...input}
                              type="text"
                              placeholder="Usuario"
                              id="usuario"
                              name="usuario"
                              invalid={meta.error && meta.touched}
                              onKeyDown={translateUperCase(values, "usuario")}
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
                            <Label for="nombre_usuario">
                              Nombre de usuario
                              <span className="danger"> *</span>
                            </Label>
                            {/* <span className="labelHint">{values?.nombre_usuario?.length || 0}/{maxLengthParam?.valor || 0}</span> */}
                            <Input
                              {...input}
                              type="text"
                              placeholder="Nombre de usuario"
                              id="nombre_usuario"
                              name="nombre_usuario"
                              invalid={meta.error && meta.touched}
                              onKeyDown={translateUperCase(
                                values,
                                "nombre_usuario"
                              )}
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
                      <Label for="estado_usuario">Estado</Label>
                      <Field
                        className="form-select"
                        disabled
                        id="estado_usuario"
                        name="estado_usuario"
                        component="select"
                      >
                        {estados.map((item) => (
                          <option value={item.id}>{item.descripcion}</option>
                        ))}
                      </Field>
                    </FormGroup>

                    {/* contrasena 
                    <FormGroup>
                      <Field name="contrasena">
                        {({ input, meta }) => (
                          <div>
                            <Label for="contrasena">Contraseña</Label>
                            {/* <span className="labelHint">{values?.nombre_usuario?.length || 0}/{maxLengthParam?.valor || 0}</span> 
                            <Input
                              {...input}
                              type="text"
                              disabled
                              placeholder="Contraseña"
                              id="contrasena"
                              name="contrasena"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    {/* role */}
                    <FormGroup>
                      <Label for="id_rol">
                        Rol<span className="danger"> *</span>
                      </Label>
                      <Field
                        className="form-select"
                        id="id_rol"
                        name="id_rol"
                        component="select"
                      >
                        {roles.map((item) => (
                          <option value={item.id_rol}>{item.rol}</option>
                        ))}
                      </Field>
                    </FormGroup>

                    {/* ulrima conexion 
                    <FormGroup>
                      <Label for="fecha_ultima_conexion">Ultima conexión</Label>
                      <Field name="fecha_ultima_conexion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              // value={registro.fecha_ultima_conexion}
                              placeholder="Ultima conexion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    {/* preguntas contestadas 
                    <FormGroup>
                      <Label for="preguntas_contestadas">
                        Preguntas contestadas
                      </Label>
                      <Field name="preguntas_contestadas">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              // value={registro.preguntas_contestadas}
                              value={0}
                              placeholder="Preguntas contestadas"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    {/* intentos login 
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
                              value={0}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* <Link className="btn btn-secondary btn-bloc"   to="/admin/users">Cancelar</Link> 
                  </Col>*/}

                  {/*<Col md={6} lg={6}>
                     primer ingreso 
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
                              // value={registro.primer_ingreso}
                              value={0}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

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
                              value={dateEndParam}
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
                      <Label for="correo_electronico">
                        Correo electronico<span className="danger"> *</span>
                      </Label>
                      <Field name="correo_electronico">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type="email"
                              id="correo_electronico"
                              name="correo_electronico"
                              placeholder="Correo electronico"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* creado por 
                    <FormGroup>
                      <Label for="createdBy">Creado por</Label>
                      <Field name="createdBy">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={userdata.data.nameUser}
                              placeholder="Creado Por"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    {/* fecha de creacion 
                    <FormGroup>
                      <Label for="fecha_creacion">Fecha creación </Label>
                      <Field name="fecha_creacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={now}
                              placeholder="Fecha de creación"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    {/* modificado por
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
                              // value={registro.modificado_por}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup> */}

                    {/* fecha de modificaicon 
                    <FormGroup>
                      <Label for="fecha_modificacion">
                        Fecha de modificación
                      </Label>
                      <Field name="fecha_modificacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              // value={registro.fecha_modificacion}
                              placeholder="Fecha de modifiacion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>*/}

                    <Button
                      type="submit"
                      //color="success"
                      className="btn btn-success mb-3 me-2"
                      //size="lg"
                      //block
                      //disabled={!valid}
                    >
                      Guardar
                    </Button>

                    <Link
                            to="/admin/users"
                            type="button"
                            className="btn btn-danger mb-3 me-2"
                        >
                            Cancelar
                        </Link>
                  </Col>
                </Row>
              </form>
            )}
          />
        </div>
      </div>
    </div>

  );


};
export default CreateUser;
