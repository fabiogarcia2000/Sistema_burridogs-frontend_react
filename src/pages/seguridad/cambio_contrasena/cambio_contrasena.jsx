import React, { useRef } from 'react';
import '../cambio_contrasena/login.css';
import burridogs from '../cambio_contrasena/loginbg.jpg';

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

export default function CambioContra(props) {

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

                <h1>Cambio de contraseña</h1>
                <div className="inputs">
                    <label>Contraseña anterior</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            placeholder="Ingrese su contraseña anterior"
                        />
                    </div>

                    <label>Contraseña nueva</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su nueva contraseña"
                        //ref={RefRespuesta}
                        />
                    </div>

                    <label>Confirmar nueva contraseña</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su nueva contraseña"
                        //ref={RefRespuesta}
                        />
                    </div>

                    <button
                        //onClick={handleLogin}
                        className='btn'>Ingresar</button>

                </div>

            </div>
        </div>
    )
}
