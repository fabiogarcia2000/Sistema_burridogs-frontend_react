import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./styles.css";

const UrlValidarPin = "http://190.53.243.69:3001/validatepin";
const UrlTerminales = "http://190.53.243.69:3001/pos/getallbysucursal/"

function LoginPos() {
    const userdata = JSON.parse(localStorage.getItem("data"));
    const userId = userdata.data.id;

    const dataSec = JSON.parse(localStorage.getItem("bodsuc"));
    const idSucursal = dataSec[0].id_sucursal;

    const navigate = useNavigate();

    const [incorrecto, setIncorrecto] = useState(false);
    const [terminales, setTerminales] = useState([]);

    useEffect(() => {
        getTerminales();
      }, [idSucursal]);

      //procedimineto para obtener las terminales
  const getTerminales = async () => {
    try {
      const res = await axios.get(UrlTerminales+idSucursal);
      setTerminales(res.data);
        console.log(res.data)
    } catch (error) {
      console.log(error);

    }
  };


  return (
    <div className="demo-container">
      <div className="container">
        <Formik
          //valores iniciales
          initialValues={{
            id_usuario:userId,
            pin: "",
            terminal:""
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion pin
            if (!valores.pin) {
              errores.pin = "Ingrese un PIN";
            }

            // Validacion terminal
            if (!valores.terminal) {
                errores.terminal = "Seleccione una terminal";
              }

            return errores;
          }}
          onSubmit={async (valores) => {
            const data = {id_usuario:valores.id_usuario, pin: valores.pin}

            try{
                const res = await axios.post(UrlValidarPin, data);
                if(res === undefined){
                    
                }else{
                    const termi = terminales.filter((item) => item.id_pos == valores.terminal);
                    localStorage.setItem('terminal', JSON.stringify(termi))
                    navigate(`/admin/punto-de-ventas/${valores.terminal}`)
                }
            } catch (error){
                setIncorrecto(true)
                
            }
          }}
        >
          {({ errors, values }) => (
            <Form>
              <div className="row">
                <div className="col-lg-6 col-12 mx-auto">                  
                  <div className="p-5 bg-white rounded shadow-lg">
                                        
                    <h3 className="mb-1 text-center">Punto de Ventas</h3>
                    <br />
                    {/**<p className="text-center lead">Ingrese sus credenciales para acceder</p> */}
                    {incorrecto? (
                    <>
                       <div className="row">
                            <div class="alert alert-danger text-center" role="alert">
                                Pin incorrecto
                            </div>
                        </div>
                    </>
                    ) : (
                    ""
                    )}

                      <div className="row">
                        <div className="col">
                          <div class="form-floating">
                            <Field
                              as="select"
                              className="form-select "
                              id="floatingSelectGrid"
                              aria-label="Floating label select example"
                              name="terminal"
                            >
                              <option value="">Seleccionar...</option>
                            {terminales.map((item, i) => (
                              <option key={i} value={item.id_pos}>
                                {item.descripcion}
                              </option>
                            ))}
                              
                            </Field>
                            <label for="floatingSelectGrid">Terminal</label>
                            <ErrorMessage
                            name="terminal"
                            component={() => <div className="error">{errors.terminal}</div>}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <label className="font-500">Usuario</label>
                      <input
                        name=""
                        className="form-control mb-3"
                        type="text"
                        value={userdata.data.nameUser}
                        disabled
                      />
                      <label className="font-500" htmlFor="is_pin">Pin</label>
                      <Field
                        name="pin"
                        className="form-control"
                        type="password"
                        id="is_pin"
                        placeholder="Ingrese el PIN"
                      />
                      <ErrorMessage
                            name="pin"
                            component={() => (
                              <div className="error">
                                {errors.pin}
                              </div>
                            )}
                        />
<br /><br />
                      {/**<p className="m-0 py-4"><Link to="" className="text-muted">¿Se te olvidó tu contraseña?</Link></p> */}
                      <button
                        className="btn btn-primary btn-lg w-100 shadow-lg mb-3"
                        type="submit"
                      >
                        Ingresar
                      </button>
                    <div className="text-center pt-4">
                      {/** <p className="m-0"><Link to="" className="text-dark font-weight-bold">¿No tiene un usuario?</Link></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPos;
