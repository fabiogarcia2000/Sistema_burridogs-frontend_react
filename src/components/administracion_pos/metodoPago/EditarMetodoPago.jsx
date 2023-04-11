import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasDescripcion } from "../../../utils/cambiarAMayusculas";
import { useState, useEffect } from "react";
import { InsertarBitacora } from "../../seguridad/bitacora/InsertarBitacora";
import { getCurrentDateShort } from "../../../utils/fechaYhora"

const URLEditar = "http://190.53.243.69:3001/metodo_pago/actualizar-insertar/";
const URLCuentas = "http://190.53.243.69:3001/mc_catalogo/getall/";

const objeto = "FORM_METODO_PAGO";

const Formulario = () => {
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser;

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
/*******************/



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
          cod_metodo_pago: edit.cod_metodo_pago,
          descripcion:edit.descripcion,
          tipo:edit.tipo,
          cuenta_contable:edit.cuenta_contable,
          activo:edit.activo,
          creado_por: usuario,
          fecha_creacion: fecha,
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion codigo
          if (!valores.cod_metodo_pago) {
            errores.cod_metodo_pago = "Por favor ingrese un código";
          } else if (!/^[0-9]+$/.test(valores.cod_metodo_pago)) {
            errores.cod_metodo_pago = "Escribir solo números";
          } 

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } 

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor seleccionar un tipo";
          } 

          // Validacion cuenta Contable
          if (!valores.cuenta_contable) {
            errores.cuenta_contable = "Por favor seleccionar una cuenta contable";
          } 

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          } 


          return errores;
        }}
        onSubmit={async (valores) => {
            //procedimineto para guardar el nuevo registro
            console.log(valores)
            try {
                const res = await axios.put(`${URLEditar}${valores.cod_metodo_pago}`, valores);
                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    InsertarBitacora(permisos[0].id_objeto, "EDITAR", "EDITAR METODO DE PAGO");
                    navigate("/admin/mostrarmetodospago");
                  } else{
                    mostrarAlertas("error");
                  }
            } catch (error) {
              console.log(error);
              mostrarAlertas("error");
              navigate("/admin/mostrarmetodospago");
            }
        }}
      >
        {({ errors, values }) => (
          <Form >
            <h3 className="mb-3">Nuevo Método de Pago</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idMetodoPago" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idMetodoPago"
                    name="cod_metodo_pago"
                    placeholder="Código..."
                    disabled readonly
                  />

                  <ErrorMessage
                    name="cod_metodo_pago"
                    component={() => <div className="error">{errors.cod_metodo_pago}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionMetodoPago" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionMetodoPago"
                    name="descripcion"
                    placeholder="Descripción..."
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
                  <label htmlFor="tipoMetodoPago" className="form-label">
                    Tipo:
                  </label>
                  <Field
                  as="select"
                  className="form-select"
                  id="tipo"
                  name="tipo"
                > 
                  <option value="E">Efectivo</option>
                  <option value="T">Tarjeta de crédito</option>
                  <option value="C">Clientes</option>
                </Field>

                  <ErrorMessage
                    name="tipo"
                    component={() => (
                      <div className="error">{errors.tipo}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cuentaContable" className="form-label">
                    Cuenta Contable:
                  </label>
                  <Field
                  as="select"
                  className="form-select"
                  id="cuentaContable"
                  name="cuenta_contable"
                > 
                  <option value="">Seleccionar...</option>
                  <option value="100012425">Efectivo</option>
                </Field>

                  <ErrorMessage
                    name="cuenta_contable"
                    component={() => (
                      <div className="error">{errors.cuenta_contable}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoMetodoPago" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoMetodoPago"
                  name="activo"
                > 
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => (
                    <div className="error">{errors.activo}</div>
                  )}
                />
              </div>
              <hr />
            </div>


            <button className="btn btn-success mb-3 me-2" type="submit">Guardar</button>
            <Link to="/admin/mostrarmetodospago" type="button" className='btn btn-danger mb-3 me-2'>Cancelar</Link>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
