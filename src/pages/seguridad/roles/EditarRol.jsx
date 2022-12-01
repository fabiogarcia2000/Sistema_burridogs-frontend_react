import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasRol } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../../components/seguridad/bitacora/RegistroBitacora";
import { useState, useEffect } from "react";

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

const URLEditar = "http://190.53.243.69:3001/ms_rol/actualizar-insertar/";

const objeto = "FORM_ROLES"

const EditarRol = () => {
    const [edit] = useGlobalState('registroEdit')

    const navigate = useNavigate();
    //TRAER NOMBRE DE USUARIO PARA EL CREADO POR 
  const userdata = JSON.parse(localStorage.getItem('data'))

//===================Obtener datos del localstorage=====================
  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true)

  const Permisos = () =>{
    const newData = temp.filter(
      (item) => item.objeto === objeto
    );
    setPermisos(newData);
  }

  useEffect(() => {
    let data = localStorage.getItem('permisos')
    if(data){
      setTemp(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);


  useEffect(() => {
    if(permisos.length > 0){
      TienePermisos();
    }
  }, [permisos]);


  const TienePermisos = () =>{
    setPermitido(permisos[0].permiso_consultar)
  }
//================================================================


    //Alertas de éxito o error
    const mostrarAlertas = (alerta) => {
        switch (alerta) {
            case 'guardado':
                Swal.fire({
                    title: '¡Guardado!',
                    text: "Los cambios se guardaron con éxito",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                })
                break;
            case 'error':
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron guardar los cambios',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                })
                break;

            default: break;
        }
    };

    return (
        <div className="container">
            <Formik
                //valores iniciales
                initialValues={{
                    id_rol: edit.id_rol,
                    rol: edit.rol,
                    descripcion: edit.descripcion,
                    modificado_por: userdata.data.nameUser.replace('"', "").replace('"', ""),
                    fecha_modificacion: date,
                }}

                //Funcion para validar
                validate={(valores) => {
                    let errores = {};
                    // Validacion nombre cuenta
                    if (!valores.rol) {
                        errores.rol = "Por favor ingresa el nombre de rol";
                    }

                    // Validacion nombre cuenta
                    if (!valores.descripcion) {
                        errores.descripcion = "Por favor ingresa descripción de rol";
                    }
                    return errores;
                    return errores;
                }}
                onSubmit={async (valores) => {
                    //procedimineto para guardar el los cambios
                    try {
                        const res = await axios.put(`${URLEditar}${valores.id_rol}`, valores);

                        if (res.status === 200) {
                            mostrarAlertas("guardado");
                            RegistroEnVitacora(permisos[0].id_objeto, "EDITAR", "EDITAR ROL"); //Insertar bitacora
                            navigate("/admin/roles");
                        } else {
                            mostrarAlertas("error");
                        }

                    } catch (error) {
                        console.log(error);
                        mostrarAlertas("error");
                        navigate("/admin/roles");
                    }
                }}
            >
                {({ errors, values }) => (
                    <Form>
                        <h3 className="mb-3">Editar Rol</h3>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="rol" className="form-label">
                                        Rol:
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="rol"
                                        name="rol"
                                        placeholder="Nombre de rol..."
                                        onKeyUp={cambiarAMayusculasRol(values)}
                                    />

                                    <ErrorMessage
                                        name="rol"
                                        component={() => (
                                            <div className="error">{errors.rol}</div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">
                                        Descripción:
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Descripción de rol..."
                                        onKeyUp={cambiarAMayusculasDescripcion(values)}
                                    />

                                    <ErrorMessage
                                        name="descripcion"
                                        component={() => (
                                            <div className="error">{errors.descripcion}</div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="modificadopor" className="form-label">
                                        Modificado por:
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="modificadopor"
                                        name="modificado_por"
                                        disabled
                                    />
                                    <ErrorMessage
                                        name="modificado_por"
                                        component={() => (
                                            <div className="error">{errors.modificado_por}</div>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="fechamodificacion" className="form-label">
                                        Fecha Modificacion:
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="fechamodificacion"
                                        name="fecha_modificacion"
                                        disabled
                                    />
                                    <ErrorMessage
                                        name="fecha_modificacion"
                                        component={() => (
                                            <div className="error">{errors.fecha_modificacion}</div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-success mb-3 me-2" type="submit">
                            Guardar
                        </button>
                        <Link
                            to="/admin/roles"
                            type="button"
                            className="btn btn-danger mb-3 me-2"
                        >
                            Cancelar
                        </Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditarRol;
