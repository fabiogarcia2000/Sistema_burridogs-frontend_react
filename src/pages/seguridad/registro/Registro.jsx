import React from 'react';
import { useForm } from "react-hook-form";
import './Registro.css';
import burridogs from './loginbg.jpg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { render } from '@testing-library/react';

const URL = "http://190.53.243.69:3001/ms_registro/autoregistro";

const Registro = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await axios.post(URL, data);
            if (res.status === 200) {
                alert("Guardado!");
                navigate("../Login")

            } else {
                alert("ERROR al Guardar :(");
            }
        } catch (error) {
            console.log(error);
            alert("ERROR - No se ha podido insertar :(");
        }
    }

    return <div className="background">
        <form onSubmit={handleSubmit(onSubmit)}>
            <img
                src={burridogs}
                alt="burridogs" />
            <div className="formulario">
                <div className="inputs">
                    <h1>Registro</h1>

                    <label>Nombre de usuario</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            name='nombre_usuario'
                            placeholder="Ingrese su nombre de usuario"
                            {...register('nombre_usuario', {
                                required: true
                            })}

                        />
                        {errors.nombre && <span>{errors.nombre.message}</span>}
                    </div>

                    <label>Ingrese un correo electrónico</label>
                    <div className="username">
                        <input
                            type="text"
                            name='correo_electronico'
                            placeholder="Ingrese su correo electrónico"
                            {...register("correo_electronico", {
                                required: {
                                    value: true,
                                    message: "El campo es requerido"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "El formato no es correcto"
                                }
                            })}
                        />
                        {errors.correo && <span>{errors.correo.message}</span>}
                    </div>

                    <label>Contraseña</label>
                    <div className="username">
                        <input
                            type="password"
                            name='contrasena'
                            placeholder="Ingrese de nuevo su contraseña" required
                            {...register("contrasena", {
                                required: {
                                    value: true,
                                    message: "El campo es requerido"
                                },
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                },
                                pattern: {
                                    value: "(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*[¡!-_#$&%@*.,].*",
                                    message: "Debe tener al menos una mayúscula, una minúscula, un dígito y un caracter especial"

                                }
                            })}
                        />
                        {errors.contrasena && <span>{errors.contrasena.message}</span>}
                    </div>

                    <label>Ingrese de nuevo la contraseña</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su contraseña"

                        />
                    </div>
                    <button className='btn'>Registrarse</button>

                </div>
            </div >
        </form>
    </div>
}
export default Registro;