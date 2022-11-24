import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { downloadCSV, getOneParam, toUpperCaseField } from '../../../utils/utils';

// const urlapi = "http://localhost:3001";

export default function Logs(props) {
  var dataPar=JSON.parse(localStorage.getItem("params")) || []
      var urlApiParam=getOneParam(dataPar,"URL_API")
      const urlapi =urlApiParam.valor  

    const [registros, setRegistros] = useState([]);
    const getRegistros = async () => {
      fetch(urlapi + "/logs/getall"
      , {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(responseJson => {  
          // console.log("responseJson",responseJson)
          // console.log("responseJson.status",responseJson.status)
          setRegistros(responseJson.object);
          setPending(false)
      })
      .catch(error=>{
          // console.log(error)   
      })
  };
  
    useEffect(() => {
      getRegistros();
    }, []);
  
  
    //Configuramos las columnas de la tabla
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id_bitacora || 'NO APLICA',
        sortable: true,
      
      },
      {
        name: "NOMBRE",
        selector: (row) => toUpperCaseField(row.nombre_usuario) || 'NO APLICA',
        sortable: true,
      
      },
      {
        name: "LOG",
        selector: (row) => toUpperCaseField(row.accion) || 'NO APLICA',
        sortable: true,
      
      },
      {
          name: "DESCRIPCIÓN",
          selector: (row) => toUpperCaseField(row.descripcion) || 'NO APLICA',
          sortable: true,
          
        },
        {
          name: "FECHA",
          selector: (row) => row.fecha || 'NO APLICA',
          sortable: true,
        
        },
     
    ];
  
    //Configurar la paginación de la tabla
    const paginationComponentOptions = {
      rowsPerPageText: "Filas por página",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todos",
    };
  

      //Barra de busqueda
      const [ busqueda, setBusqueda ] = useState("")
      //capturar valor a buscar
      const valorBuscar = (e) => {
        setBusqueda(e.target.value)   
      }
        //metodo de filtrado 
      let results = []
      if(!busqueda){
          results = registros
      }else{
          results = registros.filter( (dato) =>
          dato.id_bitacora.toString().includes(busqueda.toLocaleLowerCase()) || 
          dato?.id_usuario?.toString().includes(busqueda.toLocaleLowerCase()) ||       
          dato?.accion?.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
          dato?.nombre_usuario?.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
          dato?.fecha?.toLowerCase().includes(busqueda.toLocaleLowerCase()) 
          )
      };
      const [pending, setPending] = useState(true);

    return (
      <div className="container">
        <h3>Bit&aacute;cora de Usuarios</h3>
        <div className="row">
       
       <div className="col">
         <div
           className="btn-toolbar"
           role="toolbar"
           aria-label="Toolbar with button groups"
         >
           {/* <div
             className="btn-group me-2"
             role="group"
             aria-label="First group"
           >
             <Link
               to="/admin/createUser"
               type="button"
               className="btn btn-primary"
               title="Agregar Nuevo"
             >
                Nuevo
               <i class="bi bi-plus-lg"></i>
             </Link>
           </div> */}
           <div
             className="btn-group me-2"
             role="group"
             aria-label="Second group"
           >
             <Link
               type="button"
               className="btn btn-success"
               title="Exportar a Excel"
               onClick={() => downloadCSV(registros,'Reporte_Bitacoras_')}
             >
               <i class="bi bi-file-excel-fill"></i> Excel
             </Link>
           </div>


             
         </div>


        

       </div>


         {/*Mostrar la barra de busqueda*/}
         <div className="col-4">
         <div className="input-group flex-nowrap">
           <span className="input-group-text" id="addon-wrapping">
           <i class="bi bi-search"></i>
           </span>
           <input
             className="form-control me-2"
             type="text"
             placeholder="Buscar por Acción|Nombre de usuario|Fecha"
             aria-label="Search"
             value={busqueda}
             onChange={valorBuscar}
           />
         </div>
       </div>
  
       </div>
        <br />
        <div className="row">
          <DataTable
            columns={columns}
            data={results}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="550px"
            progressPending={pending}
            progressComponent="Cargando datos..."
            noDataComponent="---Datos no encontrados ---"
            paginationPerPage="6"
          />
        </div>
      </div>
    );
}
