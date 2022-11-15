import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion, cambiarAMayusculasDescripcionPOS } from "../../../utils/cambiarAMayusculas";

const URLCrear = "http://190.53.243.69:3001/pos/actualizar-insertar/";
const URLMostrarUno = "http://190.53.243.69:3001/pos/getone/";
const UrlMostrarSucursal = "http://190.53.243.69:3001/sucursal/getall/"

const Formulario = () => {

  const navigate = useNavigate();

    //procedimineto para obtener todos las sucursales y mostrarlas en select
    const [sucursal, setsucursal] = useState([]);
    useEffect(() => {
      getsucursal();
    }, []);
  
      //petición a api
      const getsucursal = async () => {
        try {
          const res = await axios.get(UrlMostrarSucursal);
          setsucursal(res.data);
        } catch (error) {
          console.log(error);
          mostrarAlertas("errormostrar");
        }
      };

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El POS se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el nuevo POS',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un POS con el código ingresado',
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
          cod_pos: "",
          descripcion: "",
          id_sucursal: "",
          activo: "1",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",         
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

            // Validacion de código
            if (!valores.cod_pos) {
              errores.cod_pos = "Por favor ingresa un código";
            } else if (!/^^(?=[A-Z]+[0-9])[A-Z-0-9]{2,12}$/.test(valores.cod_pos)) {
              errores.cod_pos = "Escribir números y letras sin espacios. Ejemplo: S001";
            }

  
            // Validacion descripción
            if (!valores.descripcion) {
              errores.descripcion = "Por favor ingresa una descripción";
            } //else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.descripcion)) {
              //errores.descripcion = "Escribir solo en MAYÚSCULAS";
            //}

            // Validacion de código
          if (!valores.id_sucursal) {
            errores.id_sucursal = "Por favor selecciona una sucursal";
          } 
  
            // Validacion estado
            if (!valores.activo) {
              errores.activo = "Por favor selecciona un estado";
            }
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.cod_pos}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.cod_pos}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarPOS");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarPOS");
              }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo POS</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="codPOS" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codPOS"
                    name="cod_pos"
                    placeholder="Código..."
                  />

                  <ErrorMessage
                    name="cod_pos"
                    component={() => (
                      <div className="error">{errors.cod_pos}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionCategoria" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionCategoria"
                    name="descripcion"
                    placeholder="Descripción..."
                    onKeyUp={cambiarAMayusculasDescripcionPOS(values)}
                  />

                  <ErrorMessage
                    name="descripcion"
                    component={() => (
                      <div className="error">{errors.descripcion}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="sucursal" className="form-label">
                    Sucursal:
                  </label>
                  <Field
                  as="select"
                  className="form-select"
                  id="pos"
                  name="id_sucursal"
                >
                  <option value="">Seleccionar...</option>
                  {sucursal.map((item, i) =>(
                    <option key={i} value={item.id_sucursal}>{item.descripcion_sucursal}</option>
                  ))}
                </Field>

                  <ErrorMessage
                    name="id_sucursal"
                    component={() => (
                      <div className="error">{errors.id_sucursal}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoCategoria" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoCategoria"
                  name="activo"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => <div className="error">{errors.activo}</div>}
                />
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarPOS"
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

export default Formulario;
