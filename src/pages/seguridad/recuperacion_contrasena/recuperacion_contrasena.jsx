import React, { useRef } from 'react';
import '../recuperacion_contrasena/login.css';
import burridogs from '../recuperacion_contrasena/loginbg.jpg';

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

export default function RecuperacionContra(props) {

    //capturar los datos ingresados
    /* const refPregunta = useRef(null);
     const RefRespuesta = useRef(null);
 
     const handleLogin = () => {
         const data = {
           //  "usuario": refPregunta.current.value,
             "contra": RefRespuesta.current.value
         };
         console.log(data);
         //enviarData (URL_LOGIN, data);*/

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Recuperación de contraseña</h1>
                <div class="inputs">
                    <div class="mensaje">¿Olvidó su contraseña?</div>
                    <div class="mensaje">Ingrese su nombre de usuario y seleccione el medio por el cual desea reiniciar su contraseña.</div>

                    <label>Nombre de usuario</label>

                    <div class="username">
                        <i class="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder="Ingrese su usuario" />

                    </div>

                    <button
                        //onClick={handleLogin}
                        className='btn'>Enviar contraseña por correo</button>


                    <button
                        //onClick={handleLogin}
                        className='btn'>Recuperar vía preguntas secretas</button>
                </div>
            </div>
        </div>
    )
}
