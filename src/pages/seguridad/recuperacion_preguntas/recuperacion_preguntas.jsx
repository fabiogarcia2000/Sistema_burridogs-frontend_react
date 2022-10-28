import React, { Component, useRef } from 'react';
import '../recuperacion_preguntas/login.css';
import burridogs from '../recuperacion_preguntas/loginbg.jpg';
import axios from 'axios';


export default function RecuperacionPreguntas(props) {



    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Recuperacion preguntas secretas</h1>
                <div className="inputs">
                    <label>Pregunta</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="combobox"
                            placeholder="Seleccione su pregunta"
                        />
                    </div>

                    <label>Respuesta</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su respuesta"
                            //ref={RefRespuesta}
                        />
                    </div>

                    <button
                       // onClick={handleLogin}
                        className='btn'>Ingresar</button>

                </div>

            </div>
        </div>
    )
}
