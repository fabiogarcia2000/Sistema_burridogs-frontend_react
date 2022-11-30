import { useEffect, useState } from 'react'
import {Link, useParams } from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates";
import axios from "axios";
import DataTable from "react-data-table-component";

const UrlCorte = "http://190.53.243.69:3001/venta/getcorte/"

const Corte = () => {
    const userdata = JSON.parse(localStorage.getItem('data'))
    const datos = JSON.parse(localStorage.getItem('bodsuc'))

    const { id } = useParams();  
    const [dataCorte, setDataCorte] = useState({});

    

    
  useEffect(() => {
    setDataCorte({...dataCorte, id_sucursal: datos[0].id_sucursal, id_usuario: userdata.id, id_pos:id, fecha: "2011-01-01"})
  }, []);
  
 




    useEffect(() => {
      getData();
    }, [dataCorte]);
  
    //procedimineto para obtener todos los registros
    const getData = async () => {
      try {
        const res = await axios.post(UrlCorte, dataCorte);
        setDataCorte(res.data);
      } catch (error) {
        console.log(error);
       // mostrarAlertas("errormostrar");
      }
    };


    
  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "MONTO DEBE",
      selector: (row) => row.monto_debe,
      sortable: true,
    },
    {
      name: "MONRO HABER",
      selector: (row) => row.monto_haber,
      sortable: true,
    },
    {
        name: "CUENTA",
        selector: (row) => row.descripcion_cuenta,
        sortable: true,
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
         <button
            type="button"
            className="btn btn-light"
            title="Editar"
            onClick={() => {
            
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

    return (
        <div className="container">
            <h3>Corte de Caja</h3>

            {/*Mostrar los botones: Excel y PDF */}
            <div className="row">
                <div className="col">
                <div
                    className="btn-toolbar"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                >
                    <div
                    className="btn-group me-2"
                    role="group"
                    aria-label="Second group"
                    >
                    <Link
                        type="button"
                        className="btn btn-success"
                        title="Exportar a Excel"
                        
                    >
                        <i className="fa-solid fa-file-excel"></i>
                    </Link>
                    <Link
                        to="/"
                        type="button"
                        className="btn btn-danger"
                        title="Exportar a PDF"
                    >
                        <i className="fa-solid fa-file-pdf"></i>
                    </Link>
                    </div>
                </div>
                </div>

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
                    
                    
                    />
                </div>
                </div>
            </div>
    <br />

                {/*Mostramos la tabla con los datos*/}
                <div className="row">
                    {dataCorte.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={dataCorte}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight="550px"
                    />
                    ) : (
                        <p className="text-center">Ninguna registro que mostrar</p>
                    )}
                </div>
        </div>
                        
     )
        
  

}

export default Corte;
