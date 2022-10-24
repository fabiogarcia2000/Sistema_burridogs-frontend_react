import React, { useRef } from 'react';
import './login.css';
import burridogs from './loginbg.jpg';
import { useHistory } from "react-router-dom";
 import {Registro} from "./../registro/Registro";
 


export default function Login(props) {

    const enviarData = async (url, data) => {

        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(responseJson => {  
            console.log(responseJson)
            if(responseJson[0].msg=="DATOS CORRECTOS"){
                //return <Registro/>;
               // this.props.history.push("./pages/login/Login")
                // history.push('./pages/login/Login')
              // React.lazy(() => import("./../usuarios/Usuarios"));
            }
        });
    
    }
    //capturar los datos ingresados
    const refNombreUsuario = useRef(null);
    const RefContrasena = useRef(null);

    const handleLogin = () => {
        const data = {
            "usuario": refNombreUsuario.current.value,
            "pass": RefContrasena.current.value

        };
        console.log(data);
        enviarData ('http://localhost:3000/api/seguridad/login', data);

    }

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Inicio de Sesión</h1>
                <div className="inputs">
                    <label>Nombre de usuario</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            ref={refNombreUsuario}
                        />
                    </div>

                    <label>Contraseña</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su contraseña"
                            ref={RefContrasena}
                       /* secureTextEntry={isSecureEntry}
                        icon={
                            <TouchableOpacity
                                onPress={() => { 
                                    setIsSecureEntry((prev) => !prev);
                                }}>
                                <Text>{isSecureEntry ? 'show' : 'Hide'}</Text>
                            </TouchableOpacity>
                        }
                        iconPosition="right"
                        onChangeText={(value) => {
                            onChange({name: 'password',value});
                        }}*/
                        />
                        
                    </div>

                    <button
                        onClick={handleLogin}
                        className="btn">Ingresar</button>

                    <div id="recordar" className='card-footer'>
                        <a href="https://">¿Olvidó su contraseña?</a>
                    </div>


                    <button className='btn'>Registrarse</button>
                </div>

            </div>
        </div>
    )
}