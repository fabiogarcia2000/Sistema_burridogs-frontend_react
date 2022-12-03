import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCentroCosto, cambiarAMayusculasSinopsis, cambiarAMayusculasSucursal } from "../../../utils/cambiarAMayusculas";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const URLCrear = "http://190.53.243.69:3001/mc_libroencabezado/insertar";
const URLMostrarUno = "";
const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;


const CrearLibroEncabezado = () => {

  const navigate = useNavigate();

  //UTILIZAN ESTA PARTE PARA TRAER LOS DATOS DEL OBJETO
  // const [detalles, setidiario_enca] = useState([])

  const [dato, setDato] = useState([])

  /* const { id_libro_diario_enca } = useParams()
   const obtenerId = async () => {
     const respuesta = await axios.put(`http://190.53.243.69:3001/mc_libroencabezado/insertar/${id_libro_diario_enca}`)
     const diario_enca = await respuesta.data
     setidiario_enca(diario_enca)
     setDato(diario_enca.detalle)
     
   }
   useEffect(() => {
     obtenerId()
 
   }, [])*/


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El detalle de libro diario se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

        break;

      case 'error':
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el detalle de libro diario',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        break;

      case 'duplicado':
        Swal.fire({
          text: 'Ya existe un detalle de libro diario con el código ingresado',
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
          id_libro_diario_enca: "",
          id_estado: "1",
          descripcion: "prueba en sistema",
          fecha: date,
          monto_debe: "3010",
          monto_haber: "3010",
          id_usuario: "1",
          id_periodo_contable: "2",
          detalle: []


          /*id_subcuenta: "",
          id_estado: "",
          parcial: 0,
          sucursal: "PRUEBA",
          centro_costo: "PRUEBA"*/
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id 
          /*   if (!valores.id_libro_diario_enca) {
               errores.id_libro_diario_enca = "Por favor ingresa el id";
             } else if (!/^[0-9]+$/.test(valores.id_libro_diario_enca)) {
                 errores.id_libro_diario_enca = "Escribir solo números";
             }  
             
              // Validacion de id subcuenta
           if (!valores.id_subcuenta) {
             errores.id_subcuenta = "Por favor ingresa id subcuenta";
           } else if (!/^[0-9]+$/.test(valores.id_subcuenta)) {
             errores.id_subcuenta = "Escribir solo números";
           }  
 
            // Validacion de id estado
            if (!valores.id_estado) {
             errores.id_estado = "Por favor ingresa id estado";
           } else if (!/^[0-9]+$/.test(valores.id_estado)) {
             errores.id_estado = "Escribir solo números";
           }  
           
           // Validacion de parcial
           if (!valores.parcial) {
             errores.parcial = "Por favor ingresa el parcial";
           } else if (!/^[0-9]+$/.test(valores.parcial)) {
             errores.parcial = "Escribir solo números";
           }  
 
           // Validacion de monto debe
           if (!valores.monto_debe) {
             errores.monto_debe = "Por favor ingresa monto debe";
           } else if (!/^[0-9]+$/.test(valores.monto_debe)) {
             errores.monto_debe = "Escribir solo números";
           }  
 
           // Validacion de monto haber
           if (!valores.monto_haber) {
             errores.monto_haber = "Por favor ingresa monto haber";
           } else if (!/^[0-9]+$/.test(valores.monto_haber)) {
             errores.monto_haber = "Escribir solo números";
           }  
 
           // Validacion de sinopsis
           if (!valores.sinopsis) {
             errores.sinopsis = "Por favor ingresa la sinopsis";
           }
 
           // Validacion de sucursal
           if (!valores.sucursal) {
             errores.sucursal = "Por favor ingresa la sucursal";
           }
 
            // Validacion de centro costo
            if (!valores.centro_costo) {
             errores.centro_costo = "Por favor ingresa el centro de costo";
           }
 
             return errores;*/

        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el nombre ingresado
          try {
            {/*const res = await axios.get(`${URLMostrarUno}${valores.id_libro_diario_deta}`);
                console.log(res)
              if (res.data === ""){*/}
            //procedimineto para guardar el nuevo registro en el caso de que no exista
            const res = await axios.post(`${URLCrear}${valores.id_libro_diario_enca}`, valores);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              navigate("/admin/mostrarlibrodetalle");
            } else {
              mostrarAlertas("error");
              //  }

            }//else{ 
            //mostrarAlertas("duplicado");
            //}
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarlibrodetalle");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Libro diario encabezado</h3>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="Periodocontable" className="form-label">
                    Periodo contable:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Periodocontable"
                    name="id_periodo_contable"
                    disabled
                  />

                  <ErrorMessage
                    name="id_periodo_contable"
                    component={() => (
                      <div className="error">{errors.id_periodo_contable}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    descripcion:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>


              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="fecha" className="form-label">
                    Fecha:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    disabled
                  />
                  <ErrorMessage
                    name="fecha"
                    component={() => <div className="error">{errors.fecha}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">
                    Estado:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="id_estado"
                    name="id_estado"
                  />
                  <ErrorMessage
                    name="id_estado"
                    component={() => (
                      <div className="error">{errors.id_estado}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="montodebe" className="form-label">
                    Monto debe:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="montodebe"
                    name="monto_debe"
                    placeholder="Monto debe..."

                  />
                  <ErrorMessage
                    name="montodebe"
                    component={() => (
                      <div className="error">{errors.monto_debe}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="montoHaber" className="form-label">
                    Monto haber:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="montoHaber"
                    name="monto_haber"
                    placeholder="Monto haber..."

                  />
                  <ErrorMessage
                    name="montoHaber"
                    component={() => (
                      <div className="error">{errors.monto_haber}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="id_usuario"
                    placeholder="usuario..."
                    disabled
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





            <div>

              {/**********************PRUEBA DE LA API ****************************/}
              *<h3 className="mb-3">Libro diario detalle</h3>

              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="id_subcuenta" className="form-label">
                      subcuenta:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="id_subcuenta"
                      name="id_subcuenta"
                    />
                    <ErrorMessage
                      name="id_subcuenta"
                      component={() => (
                        <div className="error">{errors.id_subcuenta}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="id_estado" className="form-label">
                      Estado:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="id_estado"
                      name="id_estado"
                    />
                    <ErrorMessage
                      name="id_estado"
                      component={() => (
                        <div className="error">{errors.id_estado}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="sucursal" className="form-label">
                      Sucursal:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="sucursal"
                      name="sucursal"

                    />
                    <ErrorMessage
                      name="sucursal"
                      component={() => <div className="error">{errors.sucursal}</div>}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="centro_costo" className="form-label">
                      Centro de costo:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="centro_costo"
                      name="centro_costo"

                    />

                    <ErrorMessage
                      name="centro_costo"
                      component={() => (
                        <div className="error">{errors.id_subcuenta}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="montodebe" className="form-label">
                      Monto debe:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="montodebe"
                      name="monto_debe"
                      placeholder="Monto debe..."

                    />
                    <ErrorMessage
                      name="montodebe"
                      component={() => (
                        <div className="error">{errors.monto_debe}</div>
                      )}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="montoHaber" className="form-label">
                      Monto haber:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="montoHaber"
                      name="monto_haber"
                      placeholder="Monto haber..."

                    />
                    <ErrorMessage
                      name="montoHaber"
                      component={() => (
                        <div className="error">{errors.monto_haber}</div>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3">

                <div className="col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="sinopsis" className="form-label">
                      Sinopsis:
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="sinopsis"
                      name="sinopsis"
                      placeholder="sinopsis..."

                    />
                    <ErrorMessage
                      name="sinopsis"
                      component={() => (
                        <div className="error">{errors.sinopsis}</div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>



            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostrarlibroencabezado"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>

          </Form>
        )}
      </Formik>
    </div >
  );
};

export default CrearLibroEncabezado;


