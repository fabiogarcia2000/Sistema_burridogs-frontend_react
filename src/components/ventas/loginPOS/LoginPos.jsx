import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.css";


function LoginPos() {
    return (
        <div className="demo-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12 mx-auto">
                        <div className="text-center image-size-small position-relative">
                            {/**<img src="https://img.freepik.com/vector-premium/terminal-pos-recibo-banco-pago-terminal-procesamiento-nfc-pago-dispositivo-vector-icono_660702-26.jpg?w=740"
                                className="rounded-circle p-2 bg-white img2"  /> */}
                            <div className="icon-camera">
                                <Link to="/admin/login-pos" className="text-primary"><i className="lni lni-camera"></i></Link>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded shadow-lg">
                            <h3 className="mb-2 text-center pt-5">Punto de Ventas</h3>
                            <p className="text-center lead">Ingrese sus credenciales para acceder</p>
                            <form>
                                <div className='row'>
                                    <div className='col'>
                                        <div class="form-floating">
                                            <select class="form-select mb-3" id="floatingSelectGrid" aria-label="Floating label select example">
                                                <option value="0">Seleccionar...</option>
                                                <option value="1">Principal</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label for="floatingSelectGrid">Terminal</label>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div class="form-floating">
                                            <select class="form-select mb-3" id="floatingSelectGrid" aria-label="Floating label select example">
                                                <option value="">Seleccionar...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label for="floatingSelectGrid">Otro Dato</label>
                                        </div>
                                    </div>
                                </div>
                                <label className="font-500">Usuario</label>
                                <input name="" className="form-control mb-3" type="email" disabled />
                                <label className="font-500">Contraseña</label>
                                <input name="" className="form-control mb-4" type="password" />
                                {/**<p className="m-0 py-4"><Link to="" className="text-muted">¿Se te olvidó tu contraseña?</Link></p> */}
                                <Link className="btn btn-primary btn-lg w-100 shadow-lg mb-3" to="/admin/punto-de-ventas">Ingresar</Link>
                            </form>
                            <div className="text-center pt-4">
                                {/** <p className="m-0"><Link to="" className="text-dark font-weight-bold">¿No tiene un usuario?</Link></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPos