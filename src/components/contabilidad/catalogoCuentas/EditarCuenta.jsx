import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCodigo } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLEditar = "http://190.53.243.69:3001/mc_catalogo/actualizar-insertar/";

const Urldestino = "http://190.53.243.69:3001/mc_informefinanciero/getall";
const Urlcategoria = "http://190.53.243.69:3001/mc_categoriacont/getall";

const EditarCuenta = () => {
  const [edit] = useGlobalState('registroEdit')


  const navigate = useNavigate();

  //procedimineto para obtener todos las sucursales y mostrarlas en select
  const [destino, setdestino] = useState([]);
  useEffect(() => {
    getdestino();
  }, []);

  //petición a api
  const getdestino = async () => {
    try {
      const res = await axios.get(Urldestino);
      setdestino(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener todos las sucursales y mostrarlas en select
  const [categoria, setcategoria] = useState([]);
  useEffect(() => {
    getcategoria();
  }, []);

  //petición a api
  const getcategoria = async () => {
    try {
      const res = await axios.get(Urlcategoria);
      setcategoria(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

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
          id_cuenta: edit.id_cuenta,
          id_usuario: "",
          codigo_cuenta: edit.codigo_cuenta,
          nombre_cuenta: edit.nombre_cuenta,
          id_categoria: edit.nombre_categoria,
          id_destino_cuenta: edit.id_descripcion,
          id_informe_financiero: ""
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de usuario
          if (!valores.id_usuario) {
            errores.id_usuario = "Por favor ingresa un id de usuario";
          } else if (!/^[0-9]+$/.test(valores.id_usuario)) {
            errores.id_usuario = "Escribir solo números";
          }

          // Validacion de código cuenta
          if (!valores.codigo_cuenta) {
            errores.codigo_cuenta = "Por favor ingresa un código de cuenta";
          }


          // Validacion nombre cuenta
          if (!valores.nombre_cuenta) {
            errores.nombre_cuenta = "Por favor ingresa un nombre de cuenta";
          }

          // Validacion de id categoria
          if (!valores.id_categoria) {
            errores.id_categoria = "Por favor ingresa un id de categoria";
          } else if (!/^[0-9]+$/.test(valores.id_categoria)) {
            errores.id_categoria = "Escribir solo números";
          }

          // Validacion de id destino cuenta
          if (!valores.id_destino_cuenta) {
            errores.id_destino_cuenta = "Por favor ingresa un id de destino cuenta";
          } else if (!/^[0-9]+$/.test(valores.id_destino_cuenta)) {
            errores.id_destino_cuenta = "Escribir solo números";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          try {
            const res = await axios.put(`${URLEditar}${valores.id_cuenta}`, valores);

            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarcatalogo");
            } else {
              mostrarAlertas("error");
            }

          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarcatalogo");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Editar Cuenta</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idCuenta" className="form-label">
                    ID Cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idCuenta"
                    name="id_cuenta"
                    placeholder="ID de la cuenta..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_cuenta"
                    component={() => (
                      <div className="error">{errors.id_cuenta}</div>
                    )}
                  />
                </div>
              </div>



              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idUsuario" className="form-label">
                    Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idUsuario"
                    name="id_usuario"
                    placeholder="ID del usuario..."
                  />

                  <ErrorMessage
                    name="id_usuario"
                    component={() => (
                      <div className="error">{errors.id_usuario}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codigoCuenta" className="form-label">
                    Código de la cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigoCuenta"
                    name="codigo_cuenta"
                    placeholder="Código de la cuenta..."
                    onKeyUp={cambiarAMayusculasCodigo(values)}
                  />

                  <ErrorMessage
                    name="codigo_cuenta"
                    component={() => (
                      <div className="error">{errors.codigo_cuenta}</div>
                    )}
                  />
                </div>
              </div>



              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="nombreCuenta" className="form-label">
                    Nombre de la cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreCuenta"
                    name="nombre_cuenta"
                    placeholder="Nombre de la cuenta..."
                    onKeyUp={cambiarAMayusculasNombreCuenta(values)}
                  />

                  <ErrorMessage
                    name="nombre_cuenta"
                    component={() => (
                      <div className="error">{errors.nombre_cuenta}</div>
                    )}
                  />
                </div>
              </div>
            </div>


            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idCategoria" className="form-label">
                    Categoría:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idCategoria"
                    name="id_categoria"
                    placeholder="Nombre de la categoría..."
                  >
                    <option value="">Seleccionar...</option>
                    {categoria.map((item, i) => (
                      <option key={i} value={item.id_categoria}>{item.nombre_categoria}</option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id_categoria"
                    component={() => (
                      <div className="error">{errors.id_categoria}</div>
                    )}
                  />
                </div>
              </div>



              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idDestinoCuenta" className="form-label">
                    Destino de cuenta:
                  </label>
                  <Field
                    type="text"
                    as="select"
                    className="form-select"
                    name="id_destino_cuenta"
                    placeholder="ID del destino de la cuenta..."
                  >
                    <option value="">Seleccionar...</option>
                    {destino.map((item, i) => (
                      <option key={i} value={item.id_informe_financiero}>{item.descripcion_informe_financiero}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="id_destino_cuenta"
                    component={() => (
                      <div className="error">{errors.id_destino_cuenta}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarcatalogo"
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

export default EditarCuenta;
