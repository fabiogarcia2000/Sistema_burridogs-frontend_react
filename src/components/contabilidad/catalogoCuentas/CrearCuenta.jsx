import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCodigo } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/mc_catalogo/actualizar-insertar/0";
const UrlMostrar = "http://190.53.243.69:3001/mc_catalogo/getone/";

//const Urldestino = "http://190.53.243.69:3001/mc_informefinanciero/getall";
const Urldestino = "http://190.53.243.69:3001/mc_destino/getall";
const Urlcategoria = "http://190.53.243.69:3001/mc_categoriacont/getall";

const CrearCuenta = () => {

  const navigate = useNavigate();

  //TRAER NOMBRE DE USUARIO PARA EL CREADO POR 
  const userdata = JSON.parse(localStorage.getItem('data'))

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
          text: "La cuenta se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la nueva cuenta',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe una cuenta con el código ingresado',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      default: break;
    }
  };


  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_cuenta: "",
          id_usuario: userdata.data.id,
          codigo_cuenta: "",
          nombre_cuenta: "",
          id_categoria: "",
          id_destino_cuenta: "",
          id_informe_financiero: ""
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id cuenta
          /* if (!valores.id_cuenta) {
             errores.id_cuenta = "Por favor ingresa un id de cuenta";
           } else if (!/^[0-9]+$/.test(valores.id_cuenta)) {
             errores.id_cuenta = "Escribir solo números";
           }  */

         

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

          // Validacion de saldo
          /*  if (!valores.saldo) {
             errores.saldo = "Por favor ingresa un saldo";
           } /*else if (!/^[0-9]+$/.test(valores.saldo)) {
             errores.saldo = "Escribir solo números";
           }  */

          return errores;

        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado  
          try {
            const res = await axios.get(`${UrlMostrar}${valores.codigo_cuenta}`
            );
             console.log(res);
             if (res.data === "") {
              //procedimineto para guardar el nuevo registro en el caso de que no exista
              const res = await axios.put(`${URLCrear}`, valores);
      
              if (res.status === 200) {
                mostrarAlertas("guardado");
                navigate("/admin/mostrarcatalogo");
              } else {
                mostrarAlertas("error");
              }
            } else {
              mostrarAlertas("duplicado");
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
            <h3 className="mb-3">Nueva Cuenta</h3>
            <div className="row g-3">

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
                    disabled
                  />

                  <ErrorMessage
                    name="id_usuario"
                    component={() => (
                      <div className="error">{errors.nombre_usuario}</div>
                    )}
                  />
                </div>
              </div>

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
            </div>

            <div className="row g-3">
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
                    placeholder="ID de la categoría..."
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
            </div>


            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idDestinoCuenta" className="form-label">
                    Destino de cuenta:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idDestinoCuenta"
                    name="id_destino_cuenta"
                    placeholder="ID del destino de la cuenta..."
                  >
                    <option value="">Seleccionar...</option>
                    {destino.map((item, i) => (
                      <option key={i} value={item.id_destino_cuenta}>{item.descripcion_informe_financiero}</option>
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

export default CrearCuenta;
