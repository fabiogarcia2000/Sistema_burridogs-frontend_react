import React from 'react';
//import React, { Component, useRef } from 'react';
import './login.css';
import burridogs from './loginbg.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const URL = "http://190.53.243.69:3001/ms_login/login";


class Login extends React.Component {


    //capturar los datos ingresados
    state = {
        form: {
            nombre_usuario: "",
            contrasena: ""
        },
        error: false,
        errorMsg: ""
    }

    manejadorSubmit = e => {
        e.preventDefault();
    }

    manejadorChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    manejadorBoton = () => {

        /* console.log(this.state.form)
         await axios.get(URL, { params: { nombre_usuario: this.state.form.nombre_usuario, contrasena: this.state.form.contrasena } })
             .then(response => {
                 console.log(response.data);
             })
             .catch(error => {
                 console.log(error);
 
             })
 
 
     }*/
            console.log(this.state.form)
            axios.get(URL, this.state.form)
                .then(response => {
                    console.log(response)
                    if (response.data === 200) {
                        console.log(response)
                        //  localStorage.setItem
                        console.log("entro correctamente")
                    } else {
                        this.setState({
                            error: true,
                            errorMsg: "fallamos"

                        })
                    }
                }).catch(error => {
                    console.log(error);
                    this.setState({
                        error: true,
                        errorMsg: "Error al conectar con la api"
                    })
                })
     };


    /* try {
               const response = await axios.get(URL);
               this.setState(response.this.state.form);
             } catch (error) {
               console.log(error);
               alert("ERROR - No se ha podido conectar con el servidor :(");
             }
           };*/

    render() {
        return (
            <React.Fragment>
                <div className="background">
                    <img
                        src={burridogs}
                        alt="burridogs" />

                    <div className="formulario">

                        <h1>Inicio de Sesión</h1>
                        <form onSubmit={this.manejadorSubmit}>
                            <div className="inputs">
                                {this.state.error === true &&
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMsg}
                                    </div>
                                }
                                <label>Nombre de usuario</label>
                                <div className="username">
                                    <div className="fa fa-user-o"></div>
                                    <input
                                        type="text"
                                        name='nombre_usuario'
                                        placeholder="Ingrese su nombre de usuario"
                                        onChange={this.manejadorChange}
                                    />
                                </div>

                                <label>Contraseña</label>
                                <div className="username">
                                    <input
                                        type='password'
                                        name='contrasena'
                                        placeholder="Ingrese su contraseña" required
                                        onChange={this.manejadorChange}
                                    />
                                </div>

                                <button
                                    onClick={this.manejadorBoton}
                                    className="btn">Ingresar

                                </button>


                                <Link
                                    to="/recuperacion_contrasena"
                                    type="btn"
                                    className="btn btn-danger mb-3 me-2"
                                >
                                    ¿Olvidó su contraseña?
                                </Link>


                                <Link
                                    to="/registro"
                                    type="btn"
                                    className="btn btn-danger mb-3 me-2"
                                >
                                    Registrarse
                                </Link>

                            </div>
                        </form>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default Login

