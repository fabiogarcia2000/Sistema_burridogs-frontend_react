import React from 'react';
import { useForm } from "react-hook-form";
import './Registro.css';
import burridogs from './loginbg.jpg';

const Registro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return <div className="background">
        <form onSubmit={handleSubmit(onSubmit)}>
            <img
                src={burridogs}
                alt="burridogs" />
            <div className="formulario">
                <div className="inputs">
                    <h1>Inicio de Sesión</h1>

                    <label>Nombre de usuario</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            name='nombre'
                            placeholder="Ingrese su nombre de usuario"
                            {...register('nombre', {
                                required: true
                            })}
                        />
                        {errors.nombre && <span>{errors.nombre.message}</span>}
                    </div>

                    <label>Ingrese un correo electrónico</label>
                    <div className="username">
                        <input
                            type="text"
                            name='correo'
                            placeholder="Ingrese su correo electrónico"
                            {...register("correo", {
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

                    <button className='btn'>Ingresar</button>

                </div>
            </div >
        </form>

    </div>
}
export default Registro;