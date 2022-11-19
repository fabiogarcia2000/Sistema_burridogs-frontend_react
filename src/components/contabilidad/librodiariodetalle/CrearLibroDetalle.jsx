import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCentroCosto, cambiarAMayusculasSinopsis, cambiarAMayusculasSucursal } from "../../../utils/cambiarAMayusculas";

const URLCrear = "";
const URLMostrarUno = "";


const Formulario = () => {

  const navigate = useNavigate();


  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
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
        text:  'No se pudo crear el detalle de libro diario',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un detalle de libro diario con el código ingresado',
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
          id_libro_diario_deta:"", 
          id_libro_diario_enca:"",
          id_subcuenta:"", 
          id_estado:"", 
          parcial:"", 
          monto_debe:"", 
          monto_haber:"", 
          sinopsis:"", 
          sucursal:"", 
          centro_costo:"",    
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
          //validar si existe un registro con el nombre ingresado
              try {
                const res = await axios.get(`${URLMostrarUno}${valores.id_libro_diario_deta}`);
                console.log(res)
                if (res.data === ""){
                  //procedimineto para guardar el nuevo registro en el caso de que no exista
                      const res = await axios.put(`${URLCrear}${valores.id_libro_diario_deta}`, valores);
                      if (res.status === 200) {
                        mostrarAlertas("guardado");
                        navigate("/mostrarlibrodetalle");
                    } else {
                      mostrarAlertas("error");
                    }
                    
                }else{ 
                  mostrarAlertas("duplicado");
                }
              } catch (error) {
                console.log(error);
                mostrarAlertas("error");
                navigate("/mostrarlibrodetalle");
              }
        }}
      >
        {({ errors , values }) => (
          <Form>
            <h3 className="mb-3">Nuevo Detalle Libro Diario</h3>
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
                        placeholder="Centro de costo..."
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

export default Formulario;
