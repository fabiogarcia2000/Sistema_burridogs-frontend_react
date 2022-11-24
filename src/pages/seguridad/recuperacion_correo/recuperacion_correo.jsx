import React, { useRef } from 'react';
import '../recuperacion_correo/login.css';
import burridogs from '../recuperacion_correo/loginbg.jpg';

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

export default function RecuperacionCorreo(props) {

    //capturar los datos ingresados
    /* const refPregunta = useRef(null);
     const RefRespuesta = useRef(null);
 
     const handleLogin = () => {
         const data = {
           //  "usuario": refPregunta.current.value,
             "contra": RefRespuesta.current.value
         };
        //  console.log(data);
         //enviarData (URL_LOGIN, data);*/

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Olvido contraseña</h1>
                <div class="inputs">
                    <div class="mensaje">¿Olvidó su contraseña?</div>
                    <div class="mensaje">Ingrese su nombre de usuario abajo y se le enviará un correo para reiniciarla.</div>

                    <label>Nombre de usuario</label>

                    <div class="username">
                        <i class="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder="Ingrese su usuario" />

                    </div>

                    <button
                        //onClick={handleLogin}
                        className='btn'>Reiniciar contraseña</button>
                </div>
            </div>
        </div>
    )
}
