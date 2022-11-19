import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCentroCosto, cambiarAMayusculasSinopsis, cambiarAMayusculasSucursal } from "../../../utils/cambiarAMayusculas";

const URLEditar = "https://jsonplaceholder.typicode.com/comments";


 const FormularioEditar = () => {
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

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
            id_libro_mayor:"",
            id_periodo_contable:edit.id_periodo_contable,
            fecha:edit.fecha, 
            id_cuenta:edit.id_cuenta, 
            id_subcuenta:edit.id_subcuenta, 
            monto_debe:edit.monto_debe, 
            monto_haber:edit.monto_haber, 
            saldo:edit.saldo, 
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id periodo contable
          if (!valores.id_periodo_contable) {
            errores.id_periodo_contable = "Por favor ingresa el periodo contable";
          } else if (!/^[0-9]+$/.test(valores.id_periodo_contable)) {
              errores.id_periodo_contable = "Escribir solo números";
          }  

           // Validacion de id cuenta
        if (!valores.id_cuenta) {
            errores.id_cuenta = "Por favor ingresa id cuenta";
          } else if (!/^[0-9]+$/.test(valores.id_cuenta)) {
            errores.id_cuenta = "Escribir solo números";
          }  
  
           // Validacion de id subcuenta
        if (!valores.id_subcuenta) {
          errores.id_subcuenta = "Por favor ingresa id subcuenta";
        } else if (!/^[0-9]+$/.test(valores.id_subcuenta)) {
          errores.id_subcuenta = "Escribir solo números";
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

        // Validacion de saldo
        if (!valores.saldo) {
          errores.saldo = "Por favor ingresa el saldo";
        } else if (!/^[0-9]+$/.test(valores.saldo)) {
            errores.saldo = "Escribir solo números";
          }  

          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.id_libro_mayor}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarlibromayor");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarlibromayor");
              }
        }}
      >
        {({ errors, values }) => (
           <Form>
           <h3 className="mb-3">Editar Libro Mayor</h3>
           <div className="row g-3">

            <div className="col-sm-6">
                    <div className="mb-3">
                    <label htmlFor="IdPeriodo" className="form-label">
                        Id Periodo Contable:
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="IdPeriodo"
                        name="id_periodo_contable"
                        placeholder="Id Periodo Contable..."
                    
                    />

                    <ErrorMessage
                        name="id_periodo_contable"
                        component={() => (
                        <div className="error">{errors.id_periodo_contable}</div>
                        )}
                    />
                    </div>
                </div>
                
                <div className="col-sm-6">
                    <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                        Fecha:
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="fecha"
                        name="fecha"
                        placeholder="fecha..."
                    
                    />

                    <ErrorMessage
                        name="fecha"
                        component={() => (
                        <div className="error">{errors.fecha}</div>
                        )}
                    />
                    </div>
                </div>

           </div>

           <div className="row g-3">

           <div className="col-sm-6">
               <div className="mb-3">
                 <label htmlFor="idCuenta" className="form-label">
                   Id cuenta:
                 </label>
                 <Field
                   type="text"
                   className="form-control"
                   id="idCuenta"
                   name="id_cuenta"
                   placeholder="Id de la cuenta..."
                   
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
                 <label htmlFor="idSubcuenta" className="form-label">
                   Id Subcuenta:
                 </label>
                 <Field
                   type="text"
                   className="form-control"
                   id="idSubcuenta"
                   name="id_subcuenta"
                   placeholder="Id de la subcuenta..."
                   
                 />
                 <ErrorMessage
                   name="id_subcuenta"
                   component={() => (
                     <div className="error">{errors.id_subcuenta}</div>
                   )}
                 />
               </div>
             </div>
           </div>
           
           <div className="row g-3">

               <div className="col-sm-6">
                   <div className="mb-3">
                       <label htmlFor="montoDebe" className="form-label">
                       Monto debe:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="montoDebe"
                       name="monto_debe"
                       placeholder="Monto debe..."
                       
                       />
                       <ErrorMessage
                       name="monto_debe"
                       component={() => (
                           <div className="error">{errors.monto_debe}</div>
                       )}
                       />
                   </div>
               </div>

               <div className="col-sm-6">
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
                       <label htmlFor="saldo" className="form-label">
                       Saldo:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="saldo"
                       name="saldo"
                       placeholder="Saldo..."
                       disable
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
              to="/mostrarlibromayor"
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

export default FormularioEditar;
