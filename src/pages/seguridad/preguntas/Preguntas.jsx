import React, { useState } from "react";
import '../preguntas/login.css';
import burridogs from '../preguntas/loginbg.jpg';
import axios from 'axios';

const URLget = "http://190.53.243.69:3001/ms_pregunta/getall";
const URLput = "http://190.53.243.69:3001/ms_pregunta_usuario/actualizar-insertar/";

class Pregunta extends React.Component {

    //const navigate = useNavigate();
    state = {
        preguntas: [],

        form: {
            respuesta: ""
        },
        error: false,
        errorMsg: ""
    };

    componentDidMount() {
        axios
            .get(URLget)
            .then(response => {
                console.log(response);
                this.setState({ preguntas: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    //capturar los datos ingresados

    manejadorChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    manejadorBoton = () => {

        console.log(this.state.form)
        axios.put(URLput, this.state.form)
            .then(res => {
                console.log(res)
                try {
                    const res = axios
                        .put(URLput + this.state.form);
                    console.log(this.state.form);
                    if (res.status === 200) {
                        alert("Guardado!");
                    } else {
                        alert("ERROR al Guardar :(");
                    }
                    // navigate("/mostrarcategorias");
                } catch (error) {
                    console.log(error);
                    alert("ERROR - No se ha podido insertar :(");
                }

                console.log("Formulario enviado");
                //  setFormularioEnviado(true);
            })
    }


    render() {
        return (< div className="background" >
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Preguntas secretas</h1>
                <div className="inputs">
                    <label>Pregunta</label>

                    <div className="form-group">
                        <select name='preguntas' className='form-control'>
                            {this.state.preguntas.map(elemento => (
                                <option key={elemento.id_pregunta} value={elemento.id_pregunta}>{elemento.pregunta} </option>
                            )
                            )}
                        </select>
                    </div>

                    <label>Respuesta</label>
                    <div className="username">
                        <input
                            type='text'
                            name='respuesta'
                            placeholder="Ingrese su respuesta"
                            onChange={this.manejadorChange}
                        />
                    </div>

                    <button
                        onClick={this.manejadorBoton}
                        className='btn'>Siguiente</button>
                </div>
            </div>
        </div >
        )
    };
};

export default Pregunta
