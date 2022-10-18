import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { useState, useEffect } from "react";

const Productos = () => {
  //Configurar los hooks
  const [data, setData] = useState([]); //para mostrar los datos
  const [search, setSearch] = useState([]); //para buscar
  const [filtrarData, setFiltrarData] = useState([]); //para filtrar la busqueda


  //Función para mostrar los datos con axios
  const urlMostrar = "https://jsonplaceholder.typicode.com/comments";

  const peticionGet = async () => {
    try {
      const response = await axios.get(urlMostrar);
      setData(response.data);
      setFiltrarData(response.data);
    } catch (error) {
      console.log(error);
      alert("ERROR - No se ha podido conectar con el servidor :(");
    }
  };

  //para mostrar los datos
  useEffect(() => {
    peticionGet();
  }, []);

  //Función para editar los datos con axios
  const urlEditar = "";

  //Modales
  //Para nuevo y editar
  const [modalNuevo, setModalNuevo] = useState(false);
  const abrirModalNuevo = () => setModalNuevo(!modalNuevo);

//Para nuevo y editar
const [modalEliminar, setModalEliminar] = useState(false);
  const abrirModalEliminar = () => setModalEliminar(!modalEliminar);

  //Para buscar
  useEffect(() => {
    const result = data.filter((nombre) => {
      return nombre.name.toLowerCase().match(search.toLowerCase()); //busca por nombre (.name)
    });

    setFiltrarData(result);
  }, [search]);

  //Configuramos las columnas para la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "1px",
    },
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "350px",
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      maxWidth: "250px",
    },
    {
      name: "CONTENIDO",
      selector: (row) => row.body,
      sortable: true,
      maxWidth: "500px",
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <button
            className="btn btn-light"
            title="Editar"
            onClick={() => alert(row.name)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
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

  //Configurar la paginación
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  //4 - Mostrar contenido
  return (
    <div className="container">
      <h3>Lista de Productos</h3>
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
              <button
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
                onClick={abrirModalNuevo}
              >
                <i className="fa-solid fa-plus"></i> Nuevo
              </button>
            </div>
            <div
              className="btn-group me-2"
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
              >
                <i className="fa-solid fa-file-excel"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                title="Exportar a PDF"
              >
                <i className="fa-solid fa-file-pdf"></i>
              </button>
              <button type="button" className="btn btn-secondary" title="?">
                <i className="fa-solid fa-question"></i>
              </button>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />

      {/*Mostramos la tabla con los datos*/}
      <div className="row">
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </div>

      {/*Modales*/}
           {/*Modal de Nuevo*/}
      <Modal isOpen={modalNuevo} toggle={abrirModalNuevo} centered>
        <ModalHeader toggle={abrirModalNuevo}>Nuevo Producto</ModalHeader>
        <ModalBody>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              ID
            </label>
            <fieldset disabled>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Automático"
            />
            </fieldset>
          </div>

          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">
              Nombre
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Escriba el Nombre"
            />
          </div>

          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Escriba el Gmail"
            />
          </div>

          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">
              Contenido
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Escriba el Contenido"
            />
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={abrirModalNuevo}>
            Guardar
          </Button>
          <Button color="secondary" onClick={abrirModalNuevo}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

           {/*Modal de Eliminar*/}
      <Modal isOpen={modalEliminar} toggle={abrirModalEliminar} centered>
        <ModalHeader toggle={abrirModalEliminar}>Eliminar Producto</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de Eliminar este Producto?</p>
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

export default Productos;
