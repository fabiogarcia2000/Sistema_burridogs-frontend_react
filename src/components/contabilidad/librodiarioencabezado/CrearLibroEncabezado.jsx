import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { cambiarAMayusculasCentroCosto, cambiarAMayusculasSinopsis, cambiarAMayusculasSucursal } from "../../../utils/cambiarAMayusculas";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";


const URLCrear = "http://190.53.243.69:3001/mc_libroencabezado/insertar";
const UrlEstado = "http://190.53.243.69:3001/mc_estado/getall";
const UrlSubcuenta = "http://190.53.243.69:3001/mc_subcuenta/getall";
const UrlCentroCost = "http://190.53.243.69:3001/centro_costo/getall";
const UrlMostrarSucursal = "http://190.53.243.69:3001/sucursal/getall"

const URLMostrarUno = "";
const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;


const CrearLibroEncabezado = () => {

  const navigate = useNavigate();
  

  //TRAER NOMBRE DE USUARIO PARA EL CREADO POR 
  const userdata = JSON.parse(localStorage.getItem('data'))

  // ! Se creo un stado de lista de detalles.
  const [listDetail, setListDetail] = useState([]);

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };


  //resetea el valores
  const resetValores = () => {
    centro.map = 0;
  };

  //resetea el valores
  const Refrescar = () => {
    window.location.reload();
  };

 

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

  //procedimineto para obtener ESTADO
  const [estado, setestado] = useState([]);
  useEffect(() => {
    getestado();
  }, []);

  //petición a api
  const getestado = async () => {
    try {
      const res = await axios.get(UrlEstado);
      setestado(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener SUBCUENTA
  const [subcuenta, setsubcuenta] = useState([]);
  useEffect(() => {
    getsubcuenta();
  }, []);

  //petición a api
  const getsubcuenta = async () => {
    try {
      const res = await axios.get(UrlSubcuenta);
      setsubcuenta(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener CENTRO COSTO
  const [centro, setcentro] = useState([]);
  useEffect(() => {
    getcentro();
  }, []);

  //petición a api
  const getcentro = async () => {
    try {
      const res = await axios.get(UrlCentroCost);
      setcentro(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
    }
  };

  //procedimineto para obtener SUCURSAL
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

  // ! Se creo una funcion onClick para agregar detalle.
  const onAddDetail = (e) => {
    setListDetail([...listDetail, {
        id_subcuenta: parseInt(e.target.form[4].value),
        monto_debe: parseFloat(e.target.form[5].value),
        monto_haber: parseFloat(e.target.form[6].value),
        sinopsis: e.target.form[7].value,
        id_sucursal: parseInt(e.target.form[8].value),
        id_centro_costo: parseInt(e.target.form[9].value),
    }]);
  }

  const columns = [
    {
      name: "SUBCUENTA",
      selector: (row) => row.id_subcuenta,
      sortable: true,
    },
    {
      name: "MONTO DEBE",
      selector: (row) => row.monto_debe,
      sortable: true,
    },
    {
      name: "MONTO HABER",
      selector: (row) => row.monto_haber,
      sortable: true,
    },
    {
      name: "SINOPSIS",
      selector: (row) => row.sinopsis,
      sortable: true,
    },
    {
      name: "SUCURSAL",
      selector: (row) => row.id_sucursal,
      sortable: true,
    },
    {
      name: "CENTRO COSTO",
      selector: (row) => row.id_centro_costo,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>

          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              //setArticuloDelete(row.id);
              //abrirModalEliminarArticulo();
            }}
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  { JSON.stringify(listDetail) }

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_libro_diario_enca: "",
          fecha: date,
          descripcion: "",
          id_estado: "2",
          id_sucursal: "",
          id_centro_costo: "",
        
          id_usuario: userdata.data.id,
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
            // !Antes de mandar la data, guardanos la lista de detalles en los valores.detalle
            valores.detalle = listDetail;
            console.log(valores);
            console.log("Linea 341")
            {/*const res = await axios.get(`${URLMostrarUno}${valores.id_libro_diario_deta}`);
                console.log(res)
              if (res.data === ""){*/}
            //procedimineto para guardar el nuevo registro en el caso de que no exista
            const res = await axios.post(`${URLCrear}${valores.id_libro_diario_enca}`, valores);
             if (res.status === 200) {
             mostrarAlertas("guardado");
             navigate("/admin/mostrarlibroencabezado");
            } else {
             mostrarAlertas("error");
              }

            // }//else{ 
            //mostrarAlertas("duplicado");
            //}
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarlibroencabezado");
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h3 className="mb-3">Nuevo registro diario</h3>
            <div className="row g-3">

              <div className="col-sm-4">
                <div className="mb-1">
                  <label htmlFor="usuario" className="form-label">
                    Id Encacabezado:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="id_libro_diario_enca:"

                  />
                  <ErrorMessage
                    name="id_libro_diario_enca"
                    component={() => (
                      <div className="error">{errors.id_libro_diario_enca}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="fechafinal" className="form-label">
                    Fecha:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fechafinal"
                    name="fecha_final"
                  />
                  <ErrorMessage
                    name="fecha_final"
                    component={() => (
                      <div className="error">{errors.fecha_final}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripcion:
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

              {/*<div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="idCategoria" className="form-label">
                    Estado:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idCategoria"
                    name="id_estado"
                    disabled
                  >
                    <option value="">Seleccionar...</option>
                    {estado.map((item, i) => (
                      <option key={i} value={item.id_estado}>{item.tipo_estado}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="id_estado"
                    component={() => (
                      <div className="error">{errors.id_estado}</div>
                    )}
                  />
                </div>
                    </div>*/}
            </div>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="id_usuario"

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

            <hr />

            {/**********************PRUEBA DE LA API ****************************/}
            <h3 className="mb-3">Libro diario detalle</h3>

            <div className="row g-3">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="idsubcuenta" className="form-label">
                    SubCuenta:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="idsubcuenta"
                    type="text"
                    name="id_subcuenta"
                  >
                    <option value="">Seleccionar...</option>
                    {subcuenta.map((item, i) => (
                      <option key={i} value={item.id_subcuenta}>{item.nombre_subcuenta}</option>
                    ))}
                  </Field>
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
              <div className="col-sm-4">
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

                  />
                  <ErrorMessage
                    name="sinopsis"
                    component={() => (
                      <div className="error">{errors.sinopsis}</div>
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
                    as="select"
                    className="form-select"
                    id="pos"
                    name="id_sucursal"
                    type="number"
                  >
                    <option value="">Seleccionar...</option>
                    {sucursal.map((item, i) => (
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


              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="centrocosto" className="form-label">
                    Centro costo:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="centrocosto"
                    name="id_centro_costo"
                    type ="number"
                  >
                    <option value="">Seleccionar...</option>
                    {centro.map((item, i) => (
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

            {/* Se agrego un boton para ir agregando los detalles */}
            <button
              type="button"
              onClick={onAddDetail}

              className="btn btn-warning mb-3 me-2 text-gray"
            >
              Agregar Detalle
            </button>
            {/* Fin boton */}

            <button
              type="button"
              onClick={() => {
                resetValores();
              }}

              className="btn btn-warning mb-3 me-2 text-gray"
            >
              Limpiar
            </button>

            <hr />
              <div className="row">
              <div className="col-4">
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
      {/**/}
      </div>
              </div>
          </Form>
        )}
      </Formik>

      <h3>Partidas</h3>
      {/*Mostramos la tabla con los datos*/}
      <div className="row">
        {listDetail.length > 0 ? (
          <DataTable
            columns={columns}
            data={listDetail}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="550px"
          />
        ) : (
          <p className="text-center">Ningún Registro</p>
        )}
      </div>

      <div className="row">
        <div className="col">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Debe</h4>
              <span className="">
                {/*<h4>{"L. " (parseFloat(total).toFixed(2))}</h4>*/}
              </span>
            </li>
          </ul>
        </div>

        <div className="col">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Haber</h4>
              <span className="">
                {/*<h4>{"L. " + (parseFloat(tempTotal).toFixed(2))}</h4>*/}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <br />
     

          
    </div >
  );
};

export default CrearLibroEncabezado;


