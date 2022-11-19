import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCentroCosto, cambiarAMayusculasDescripcion, cambiarAMayusculasSinopsis, cambiarAMayusculasSucursal } from "../../../utils/cambiarAMayusculas";

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
            id_libro_diario_deta:"",
            id_libro_diario_enca:edit.id_libro_diario_enca,
            id_subcuenta:edit.id_subcuenta, 
            id_estado:edit.id_estado, 
            parcial:edit.parcial, 
            monto_debe:edit.monto_debe, 
            monto_haber:edit.monto_haber, 
            sinopsis:edit.sinopsis, 
            sucursal:edit.sucursal, 
            centro_costo:edit.centro_costo, 
        }}

        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de id 
          if (!valores.id_libro_diario_enca) {
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
          return errores;
        }}
        onSubmit={async (valores) => {
              //procedimineto para guardar el los cambios
              try {
                const res = await axios.put(`${URLEditar}${valores.id_libro_diario_deta}`, valores);

                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarlibrodetalle");
                  } else {
                    mostrarAlertas("error");
                  }
                
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarlibrodetalle");
              }
        }}
      >
        {({ errors, values }) => (
           <Form>
           <h3 className="mb-3">Editar Detalle Libro Diario</h3>
           <div className="row g-3">

             <div className="col-sm-6">
               <div className="mb-3">
                 <label htmlFor="idLibroEncabezado" className="form-label">
                   Id libro diario encabezado:
                 </label>
                 <Field
                   type="text"
                   className="form-control"
                   id="idLibroEncabezado"
                   name="id_libro_diario_enca"
                   placeholder="Id del encabezado de libro diario..."
                   
                 />
                 <ErrorMessage
                   name="id_libro_diario_enca"
                   component={() => (
                     <div className="error">{errors.id_libro_diario_enca}</div>
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
                       <label htmlFor="idEstado" className="form-label">
                       Id Estado:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="idEstado"
                       name="id_estado"
                       placeholder="Id del estado..."
                       
                       />
                       <ErrorMessage
                       name="id_estado"
                       component={() => (
                           <div className="error">{errors.id_estado}</div>
                       )}
                       />
                   </div>
               </div>

               <div className="col-sm-6">
                   <div className="mb-3">
                       <label htmlFor="parcial" className="form-label">
                       Parcial:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="parcial"
                       name="parcial"
                       placeholder="Parcial..."
                       
                       />
                       <ErrorMessage
                       name="parcial"
                       component={() => (
                           <div className="error">{errors.parcial}</div>
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
                       <label htmlFor="sinopsis" className="form-label">
                       Sinopsis:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="sinopsis"
                       name="sinopsis"
                       placeholder="Sinopsis..."
                       onKeyUp={cambiarAMayusculasSinopsis(values)}
                       />
                       <ErrorMessage
                       name="sinopsis"
                       component={() => (
                           <div className="error">{errors.sinopsis}</div>
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
                       type="text"
                       className="form-control"
                       id="sucursal"
                       name="sucursal"
                       placeholder="Sucursal..."
                       onKeyUp={cambiarAMayusculasSucursal(values)}
                       />
                       <ErrorMessage
                       name="sucursal"
                       component={() => (
                           <div className="error">{errors.sucursal}</div>
                       )}
                       />
                   </div>
               </div>
           </div>
           

           <div className="row g-3">
               <div className="col-sm-6">
                   <div className="mb-3">
                       <label htmlFor="centroCosto" className="form-label">
                       Centro de costo:
                       </label>
                       <Field
                       type="text"
                       className="form-control"
                       id="centroCosto"
                       name="centro_costo"
                       placeholder="centroCosto..."
                       onKeyUp={cambiarAMayusculasCentroCosto(values)}
                       />
                       <ErrorMessage
                       name="centro_costo"
                       component={() => (
                           <div className="error">{errors.centro_costo}</div>
                       )}
                       />
                   </div>
               </div>
           </div>


            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarlibrodetalle"
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
