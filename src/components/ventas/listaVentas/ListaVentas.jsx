import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useState} from "react";

import Swal from "sweetalert2";

const UrlConsultar = "http://190.53.243.69:3001/venta/venta_por_fecha/";


const VentaResumen = () => {
    const [mostrar, setMostrar] = useState([]);
    const [mostrar2, setMostrar2] = useState([]);

    //const [prueba, setPrueba] = useState({"fecha":"2022/11/01"});



    //Barra de busqueda
    const [busqueda, setBusqueda] = useState("");
    //capturar valor a buscar
    const valorBuscar = (e) => {
    setBusqueda(e.target.value);
    };


  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "CLIENTE",
      selector: (row) => row.nombre_cliente,
      sortable: true,
    },
    {
        name: "RTN",
        selector: (row) => row.rtn,
        sortable: true,
    },
    {
      name: "VENTA TOTAL",
      selector: (row) => row.venta_total,
      sortable: true,
    },
    {
        name: "FACTURA",
        selector: (row) => row.correlativo,
        sortable: true,
    },
    {
        name: "VENDEDOR",
        selector: (row) => row.usuario,
        sortable: true,
    },
    {
        name: "ESTADO",
        selector: (row) => row.descripcion_estado,
        sortable: true,
    }
    
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se realizo la consulta',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
      break;

      default: break;
    }
  };


const getRegistros = async (fecha) => {
  try {
    console.log(fecha)
    const res = await axios.get(UrlConsultar, {fecha});
    setMostrar2(res.data)
    console.log(res)
  } catch (error) {
    console.log(error);
    mostrarAlertas("errormostrar");
  }
};


  return (
    <div className="container">
      <h3>Consultar Ventas</h3>
      <br />

        <div className="row">
        <Formik
        //valores iniciales
        initialValues={{
          fecha: ""
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion de código
          if (!valores.fecha) {
            errores.fecha = "Seleccione una fecha";
          }

          return errores;
        }}
        onSubmit={(valores) => {
          getRegistros(valores)
        }}
      >
        {({ errors }) => (
          <Form>

            <div className="row g-3">
              <div className="col-4">
                <label htmlFor="fechaInicio" className="form-label">
                  Fecha:
                </label>
                <Field
                  type="date"
                  className="form-select"
                  id="fechaInicio"
                  name="fecha"
                />

                <ErrorMessage
                  name="fecha"
                  component={() => <div className="error">{errors.fecha}</div>}
                />
              </div>

              <div className="col-2 bottom-aligned">
                <button className="btn btn-primary me-2" type="submit">
                    Consultar
                </button>

{/** 
                <button className="btn btn-danger" type="button">
                    Limpiar
                </button>
*/}

              </div>
            </div>

          </Form>
        )}
      </Formik>
        </div>

        <br /> <hr /> <br /> 

      {/*Mostrar los botones: Excel y PDF */}
      <div className="row">
        {/*Mostrar la barra de busqueda*/}
        <div className="col-4">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
          </div>
        </div>
      </div>
      <br />

      {/*Mostramos la tabla con los datos*/}
 
      <div className="row">
      {mostrar.length > 0 ? (
        <DataTable
          columns={columns}
          data={mostrar}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="200px"
        />
      ) : (
        <p className="text-center">No hay registros que mostrar</p>
      )}
      </div>
    </div>
  );
}

export default VentaResumen