import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion, cambiarAMayusculasDirección } from "../../../utils/cambiarAMayusculas";

const URLEditar = "http://190.53.243.69:3001/sucursal/actualizar-insertar/";

const UrlMostrarBodegas = "http://190.53.243.69:3001/centro_costo/getall";

const EditarSucursal = () => {
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  //procedimineto para obtener todos las bodegas y mostrarlas en select
  const [bodegas, setBodegas] = useState([]);
  useEffect(() => {
    getBodegas();
  }, []);

    //petición a api
    const getBodegas = async () => {
      try {
        const res = await axios.get(UrlMostrarBodegas);
        setBodegas(res.data);
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
            text: "Los cambios se guardaron con éxito",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
  
        break;
  
        case 'error': 
        Swal.fire({
          title: 'Error',
          text:  'No se pudieron guardar los cambios',
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
          id_sucursal: edit.id_sucursal,
          cod_sucursal: edit.cod_sucursal,
          descripcion: edit.descripcion_sucursal,
          direccion: edit.direccion,
          telefono:edit.telefono,
          rtn:edit.rtn,
          id_centro_costo:edit.id_centro_costo,
          id_mapa: undefined,
          activo:edit.activo ,
          modificado_por:"autorPrueba" ,
          fecha_modificacion:"2022/11/03"
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.cod_sucursal) {
            errores.cod_sucursal = "Por favor ingresa un código";
          } else if (!/^^(?=[A-Za-z]+[0-9])[A-Za-z0-9]{2,12}$/.test(valores.cod_sucursal)) {
            errores.cod_sucursal = "Escribir números y letras sin espacios. Ejemplo: S001";
          }
          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion dirección
          if (!valores.direccion) {
            errores.direccion = "Por favor ingresa una dirección";
          }

          // Validacion teléfono
          if (!valores.telefono) {
            errores.telefono = "Por favor ingresa un teléfono";
          } else if (!/^^\+504[2389][0-9]{7}$/.test(valores.telefono)) {
            errores.telefono = "Ingrese un teléfono válido. Ejemplo: +50499999999";
          }

          // Validacion rtn
          if (!valores.rtn) {
            errores.rtn = "Por favor ingresa un R.T.N";
          } else if (!/^^(?=[0]+[0-9])[0-9]{14}$/.test(valores.rtn)) {
            errores.rtn = "Ingresa un R.T.N válido";
          }

          // Validacion de Centro de Costo
          if (!valores.id_centro_costo) {
            errores.id_centro_costo = "Por favor selecciona una bodega";
          }
           // Validacion de mapa
           //if (!valores.id_mapa) {
            //errores.id_mapa = "Por favor seleccione un mapa";
          //}

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }

          return errores;
        }}

        onSubmit={async (valores) => {
              //procedimineto para guardar el nuevo registro
            try {
              const res = await axios.put(`${URLEditar}${valores.cod_sucursal}`, valores);

                if (res.status === 200) {
                  mostrarAlertas("guardado");
                  navigate("/mostrarsucursales");
                } else {
                  mostrarAlertas("error");
                }

            } catch (error) {
              console.log(error);
              mostrarAlertas("error");
              navigate("/mostrarsucursales");
            }
        }}
      >
        {({ errors, values }) => (
          <Form >
          <h3 className="mb-3">Editar Sucursal</h3>
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="idSucursal" className="form-label">
                  Código:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="idSucursal"
                  name="cod_sucursal"
                  placeholder="Código..."
                  disabled
                />

                <ErrorMessage
                  name="cod_sucursal"
                  component={() => <div className="error">{errors.cod_sucursal}</div>}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="descripcionSucursal" className="form-label">
                  Descripción:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="descripcionSucursal"
                  name="descripcion"
                  placeholder="Descripcion..."
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
                <label htmlFor="direccionSucursal" className="form-label">
                  Dirección:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="direccionSucursal"
                  name="direccion"
                  placeholder="Dirección..."
                  onKeyUp={cambiarAMayusculasDirección(values)}
                />

                <ErrorMessage
                  name="direccion"
                  component={() => (
                    <div className="error">{errors.direccion}</div>
                  )}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="telefonoSucursal" className="form-label">
                  Teléfono:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="telefonoSucursal"
                  name="telefono"
                  placeholder="Teléfono..."
                />

                <ErrorMessage
                  name="telefono"
                  component={() => (
                    <div className="error">{errors.telefono}</div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="rtnSucursal" className="form-label">
                  RTN:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="rtnSucursal"
                  name="rtn"
                  placeholder="RTN..."
                />

                <ErrorMessage
                  name="rtn"
                  component={() => <div className="error">{errors.rtn}</div>}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="centroCosto" className="form-label">
                  Bodega:
                </label>
                <Field
                as="select"
                className="form-select"
                id="centroCosto"
                name="id_centro_costo"
              >
                  {bodegas.map((item, i) =>(
                    <option key={i} value={item.id_centro_costo}>{item.descripcion}</option>
                  ))}
              </Field>

                <ErrorMessage
                  name="id_centro_costo"
                  component={() => (
                    <div className="error">{errors.id_centro_costo}</div>
                  )}
                />
              </div>
            </div>
          </div>

{/** 
          <div className="row g-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="mapa" className="form-label">
                Mapa:
              </label>
              <Field
                as="select"
                className="form-select"
                id="mapa"
                name="id_mapa"
              >
                <option value="">Seleccional...</option>
                <option value="1">Mapa 1</option>
                <option value="2">Mapa 2</option>
              </Field>

              <ErrorMessage
                name="id_mapa"
                component={() => <div className="error">{errors.id_mapa}</div>}
              />
            </div>
            <hr />
          </div>
*/}
          <div className="row g-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="estadoSucursal" className="form-label">
                Estado:
              </label>
              <Field
                as="select"
                className="form-select"
                id="estadoSucursal"
                name="estado"
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </Field>

              <ErrorMessage
                name="estado"
                component={() => <div className="error">{errors.estado}</div>}
              />
            </div>
            <hr />
          </div>

          <button className="btn btn-success mb-3 me-2" type="submit">
            Guardar
          </button>
          <Link
            to="/mostrarsucursales"
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

export default EditarSucursal;
