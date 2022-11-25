import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const URL = "https://jsonplaceholder.typicode.com/comments";

const MostrarMesas = () => {
  //Configurar los hooks
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
  }, []);

  //procedimineto para mostrar todos los registros
  const getRegistros = async () => {
    try {
      const res = await axios.get(URL);
      setRegistros(res.data);
    } catch (error) {
      console.log(error);
      alert("ERROR - No se ha podido conectar con el servidor :(");
    }
  };

  //procedimineto para eliminar un registro
  const deleteRegistro = async (id) => {
    await axios.delete(`${URL}${id}`);
    getRegistros();
  };
  //Ventana modal de confirmación de eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "120px", //ancho de la columna
    },
    {
      name: "ID MAPA",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "POSICION X",
      selector: (row) => row.email,
      sortable: true,
      maxWidth: "350px",
    },
    {
      name: "POSICION Y",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "200px",
    },

    {
      name: "CREADO POR",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "130px",
    },

    {
      name: "FECHA DE CREACION",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "MODIFICADO POR",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "160px",
    },

    {
      name: "FECHA DE MODIFICACION",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "180px",
    },
    {
        name: "ESTADO",
        selector: (row) => row.activo,
        sortable: true,
        maxWidth: "300px",
      },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Link
            to={`/admin/editarMesas/${row.id}/edit`}
            type="button"
            className="btn btn-light"
            title="Editar"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={abrirModalEliminar}
          >
            <i className="fa-solid fa-trash"></i>
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
      <h3>Lista de Mesas</h3>
      <br />
      {/*Mostrar los botones: Nuevo, Excel y PDF */}
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
              aria-label="First group"
            >
              <Link
                to="/admin/crearMesas"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                <i className="fa-solid fa-plus"></i> Nuevo
              </Link>
            </div>
            <div
              className="btn-group me-2"
              role="group"
              aria-label="Second group"
            >
              <Link
                to="/"
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
        <DataTable
          columns={columns}
          data={registros}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </div>

      {/* Ventana Modal de Eliminar*/}
      <Modal isOpen={modalEliminar} toggle={abrirModalEliminar} centered>
        <ModalHeader toggle={abrirModalEliminar}>Eliminar Registro</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de Eliminar este Registro?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={abrirModalEliminar}>
            Eliminar
          </Button>
          <Button color="secondary" onClick={abrirModalEliminar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MostrarMesas;
