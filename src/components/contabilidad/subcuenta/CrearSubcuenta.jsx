import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasNombreSubcuenta } from "../../../utils/cambiarAMayusculas";
import { cambiarAMayusculasNombreCuenta } from "../../../utils/cambiarAMayusculas";

const URLCrear = "https://jsonplaceholder.typicode.com/comments";
const URLMostrarUno = "https://jsonplaceholder.typicode.com/comments";


const SubCuentaCrear = () => {

  const navigate = useNavigate();


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "La subcuenta se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear la nueva subcuenta',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe una subcuenta con el mismo nombre',
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
            id_subcuenta: "",
            id_cuenta: "",
            nombre_cuenta: "",
            nombre_subcuenta: "",
            saldo: ""        
        }}
        //Funcion para validar
        validate={(valores) => {
            let errores = {};

        // Validacion de id subcuenta
          if (!valores.id_subcuenta) {
            errores.id_subcuenta = "Por favor ingresa id subcuenta";
          } else if (!/^[0-9]+$/.test(valores.id_subcuenta)) {
            errores.id_subcuenta = "Escribir solo números";
          }  

        // Validacion de id cuenta
        if (!valores.id_cuenta) {
          errores.id_cuenta = "Por favor ingresa id cuenta";
        } else if (!/^[0-9]+$/.test(valores.id_cuenta)) {
          errores.id_cuenta = "Escribir solo números";
        }


        // Validacion nombre cuenta
        if (!valores.nombre_cuenta) {
          errores.nombre_cuenta = "Por favor ingresa un nombre de cuenta";
        } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.nombre_cuenta)) {
          errores.nombre_cuenta = "Escribir solo en MAYÚSCULAS";
        }

         // Validacion nombre subcuenta
         if (!valores.nombre_subcuenta) {
            errores.nombre_subcuenta = "Por favor ingresa un nombre de subcuenta";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#* ]+$/.test(valores.nombre_subcuenta)) {
            errores.nombre_subcuenta = "Escribir solo en MAYÚSCULAS";
          }

         // Validacion de saldo
         if (!valores.saldo) {
            errores.saldo = "Por favor ingresa saldo de subcuenta";
          } else if (!/^[0-9]+$/.test(valores.saldo)) {
            errores.saldo = "Escribir solo números";
          }   
  
            return errores;
          
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado    NO ESTOY SEGURA DE VALIDAR CON ESTE CAMPO
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.nombre_subcuenta}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.nombre_subcuenta}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarsubcuenta");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarsubcuenta");
              }
        }}
      >
         {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nueva SubCuenta</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                <label htmlFor="IdSubCuenta" className="form-label">
                    Id SubCuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="IdSubCuenta"
                    name="id_subcuenta"
                    placeholder="Id subcuenta..."
                    disabled
                  />

                  <ErrorMessage
                    name="id_subcuenta"
                    component={() => (
                      <div className="error">{errors.id_subcuenta}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="IdCuenta" className="form-label">
                    Id Cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="IdCuenta"
                    name="id_cuenta"
                    placeholder="Id cuenta..."
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
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="nombreCuenta" className="form-label">
                    Nombre Cuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreCuenta"
                    name="nombre_cuenta"
                    placeholder="Nombre cuenta..."
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
                    <label htmlFor="nombreSubCuenta" className="form-label">
                    Nombre SubCuenta:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreSubCuenta"
                    name="nombre_subcuenta"
                    placeholder="Nombre subcuenta..."
                    onKeyUp={cambiarAMayusculasNombreSubcuenta(values)}

                  />

                  <ErrorMessage
                    name="nombre_subcuenta"
                    component={() => (
                      <div className="error">{errors.nombre_subcuenta}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="saldo" className="form-label">
                    Saldo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="saldo"
                    name="saldo"
                    placeholder="Saldo de subcuenta..."
                  />

                  <ErrorMessage
                    name="saldo"
                    component={() => (
                      <div className="error">{errors.saldo}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarsubcuenta"
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

export default SubCuentaCrear;