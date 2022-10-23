import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const URL = "https://jsonplaceholder.typicode.com/comments";

const MostrarMateriales = () => {
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
      name: "CÓDIGO",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "110px", //ancho de la columna
    },
    {
      name: "IMPUESTO",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "130px",
    },
    {
      name: "CATEGORÍA",
      selector: (row) => row.email,
      sortable: true,
      maxWidth: "170px",
    },
    {
      name: "UNIDAD DE MEDIDA",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "230px",
    },

    {
      name: "SOCIO DE NEGOCIO",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "230px",
    },

    {
      name: "CANTIDAD",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Link
            to={`/editarmaterial/${row.id}/edit`}
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
      <h3>Lista de Materiales</h3>
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
                to="/crearmaterial"
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
              <Link
                to="/"
                type="button"
                className="btn btn-secondary"
                title="?"
              >
                <i className="fa-solid fa-question"></i>
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

export default MostrarMateriales;
