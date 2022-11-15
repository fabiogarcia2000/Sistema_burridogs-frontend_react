import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import "./style.css";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {quitarTildes} from "./utils/textoSinTildes";

const UrlCategorias = "http://190.53.243.69:3001/categoria/getall_active";
const UrlArticulos = "http://190.53.243.69:3001/articulo/getallactive/";
const UrlArticulosCategoria = "http://190.53.243.69:3001/articulo/getallbycategoria/";
const UrlMostrarMetodosPago = "http://190.53.243.69:3001/metodo_pago/getall/";
const UrlDescuentos = "http://190.53.243.69:3001/descuento/getall/";
const UrlPedidos = "http://190.53.243.69:3001/modo_pedido/getall";
const isv = 0.15;

const PuntoDeVentas = () => {
  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosMostrar, setArticulosMostrar] = useState([]);

 // const [pagoCompartido, setPagoCompartido] = useState(true);

  const [cantidad, setCantidad] = useState(1);
  const [articuloClick, setArticuloClick] = useState({});
  const [articuloEdit, setArticuloEdit] = useState({});
  const [cantidadEdit, setCantidadEdit] = useState(1);
  const [articuloDelete, setArticuloDelete] = useState(0);
  const [listaCompras, setListaCompras] = useState([]);

  const [subTotal, setSubTotal] = useState(0.0);
  const [Impuesto, setImpuesto] = useState(0.0);
  const [total, setTotal] = useState(0.0);


  useEffect(() => {
    getCategorias();
    getArticulos();
    getMetodosPago();
    getDescuentos();
    getPedidos();
  }, []);

  //procedimineto para obtener las categorias
  const getCategorias = async () => {
    try {
      const res = await axios.get(UrlCategorias);
      setCategorias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //procedimineto para obtener todos los articulos
  const getArticulos = async () => {
    try {
      const res = await axios.get(UrlArticulos);
      setArticulos(res.data);
      setArticulosMostrar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //procedimineto para obtener los articulos por categoria
  const getArticulosCategoria = async (categoria) => {
    try {
      const res = await axios.get(UrlArticulosCategoria+categoria);
      setArticulos(res.data);
      setArticulosMostrar(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  //procedimineto para obtener todos los metodos de pago y mostrarlas en select
  const [metodosPago, setMetodosPago] = useState([]);

    //petición a api
    const getMetodosPago = async () => {
      try {
        const res = await axios.get(UrlMostrarMetodosPago);
        setMetodosPago(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    //procedimineto para obtener todos los descuentos y mostrarlas en select
  const [descuentos, setDescuentos] = useState([]);

    //petición a api
    const getDescuentos = async () => {
      try {
        const res = await axios.get(UrlDescuentos);
        setDescuentos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //procedimineto para obtener todos los modos de pedido y mostrarlas en select
  const [pedidos, setPedidos] = useState([]);

    //petición a api
    const getPedidos = async () => {
      try {
        const res = await axios.get(UrlPedidos);
        setPedidos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    listaCompras.map((list) => 
      setSubTotal(prevValores => prevValores + list.total)
      );
  }, [listaCompras]);


  useEffect(() => {
    setImpuesto(subTotal*isv)
  }, [subTotal]);

  useEffect(() => {
    setTotal(subTotal + Impuesto)
  }, [Impuesto, subTotal]);


  //Buscador --con expresiones regulares js
  const handleBuscador = (e) => {
    const buscar = quitarTildes(e.target.value.toLowerCase());  
      let tmpArray = [];
      const limite = articulos.length;

      for (let index = 0; index < limite; index++) {
        const buscarEn = quitarTildes(articulos[index].descripcion.toLowerCase());
        const patt = new RegExp(buscar);
        const res = patt.test(buscarEn);

        if (res){
          tmpArray.push(articulos[index])
        };
        
      };
      setArticulosMostrar(tmpArray);
    };


  //agregar articulos a la lista
  const agregarArticulos = () => {
    if(!listaCompras.find(list => list.cod === articuloClick.cod_articulo)){
      setListaCompras([...listaCompras, {cod: articuloClick.cod_articulo, desc: articuloClick.descripcion_corta, cant:cantidad, prec:articuloClick.precio, total:cantidad*articuloClick.precio,  isv:articuloClick.precio * articuloClick.porcentaje }]);
      resetSubTotal();
     setCantidad(1)
    }else{
      actualizarArticulo(articuloClick.cod_articulo, articuloClick.precio);
      console.log(articuloClick.cod_articulo, articuloClick.precio)
      setArticuloClick({});
      resetSubTotal();
    }
  };

   //cuando se agrega un articulos repetido a la lista
   const actualizarArticulo = (cod, newPrec) =>{
    const newListaCompras = listaCompras.map((art) =>{
      if(art.cod === cod){
        return{
          ...art,
          cant: art.cant + cantidad,
          total: (art.cant + cantidad) * newPrec
        };
      }
      return art
    });
    setListaCompras(newListaCompras)
    setCantidad(1)
    resetSubTotal();
   }

   //editar la cantidad de un articulo
   const actualizarCantidad = () =>{
    const newListaCompras = listaCompras.map((art) =>{
      if(art.cod === articuloEdit.cod){
        return{
          ...art,
          cant: cantidadEdit,
          total: (cantidadEdit) * articuloEdit.prec
        };
      }
      return art
    }) 
    setListaCompras(newListaCompras)
    setCantidad(1)
    resetSubTotal();
    
   }

   //Eliminar un articulo de la lista
   const eliminarArticulo = () =>{
    const newLista = listaCompras.filter((art) => art.cod !== articuloDelete);
    setListaCompras(newLista);
    resetSubTotal();
   };

    //resetea el valores de subtotal
    const resetSubTotal = () => {
      setSubTotal(0)      
    }; 

     //resetea el valores de subtotal
     const resetValores = () => {
      setSubTotal(0)
      setImpuesto(0)
      setTotal(0)
      setListaCompras([])
      setCantidad(1)
    }; 



  //Ventana modal de datos del cliente
  const [modalCliente, setModalCliente] = useState(false);
  const abrirModalCliente = () => setModalCliente(!modalCliente);

  //Ventana modal procesar venta
  const [modalVenta, setModalVenta] = useState(false);
  const abrirModalVenta = () => setModalVenta(!modalVenta);

  //Ventana modal cancelar venta
  const [modalCancelar, setModalCancelar] = useState(false);
  const abrirModalCancelar = () => setModalCancelar(!modalCancelar);

  //Ventana modal confirmación de imprimir factura
  const [modalFactura, setModalFactura] = useState(false);
  const abrirModalFactura = () => setModalFactura(!modalFactura);

  //Ventana modal cantidad
  const [modalCantidad, setModalCantidad] = useState(false);
  const abrirModalCantidad = () => setModalCantidad(!modalCantidad);

  //Ventana modal cantidad editar
  const [modalCantidadEdit, setModalCantidadEdit] = useState(false);
  const abrirModalCantidadEdit = () => setModalCantidadEdit(!modalCantidadEdit);

  //Ventana modal eliminar artículo
  const [modalEliminarArticulo, setModalEliminarArticulo] = useState(false);
  const abrirModalEliminarArticulo = () => setModalEliminarArticulo(!modalEliminarArticulo);

  //Configuramos las columnas de la tabla
  const columns = [
    {
      name: "Descrip.",
      selector: (row) => row.desc,
      maxWidth: "120px", //ancho de la columna
    },
    {
      name: "Cant.",
      selector: (row) => row.cant,
      maxWidth: "1px", //ancho de la columna
    },
    {
      name: "Precio",
      selector: (row) => row.prec,
      maxWidth: "1px", //ancho de la columna
    },
    {
      name: "Total",
      selector: (row) => row.total,
      maxWidth: "1px", //ancho de la columna
    },
    {
      name: "",
      cell: (row) => (
        <>
          <button
            className="btn btn-light"
            title="Editar"
            onClick={() => {
              setCantidadEdit(row.cant);
              setArticuloEdit(row);
              abrirModalCantidadEdit();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          &nbsp;
          <button
            className="btn btn-light"
            title="Eliminar"
            onClick={() => {
              setArticuloDelete(row.cod);
              abrirModalEliminarArticulo();
            }}
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

  return (
    <div>
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="col-4">
              <h3>Punto de Ventas</h3>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="col-4">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <p className="nav-link active" aria-current="page">
                      Sucursal #1
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link">Terminal #1</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-2">
              <li className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">11:18 p.m</div>
                  10/11/2022
                </div>
              </li>
            </div>

            <div className="col">
              <ul className="navbar-nav justify-content-center">
                <li className="nav-item dropdown">
                  <Link
                    className="navbar-brand dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opciones
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="#">
                        Corte de Caja
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Información factura fiscal
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <hr />
      <div>
        <div className="row">
          <div className="col-8">
            {/*Mostrar la barra de busqueda*/}
            <div className="row">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Buscar por descripción..."
                  aria-label="Search"
                  onChange={handleBuscador}
                />
              </div>
            </div>
            <br />
            {/*Mostrar categorias*/}
            <div className="row colorcategorias">
              <div className="col d-grid gap-2 col-3 mx-auto">
                <button
                  className="btn btn-secondary m-1"
                  onClick={() => {
                    getArticulos();
                  }}
                >
                  TODOS
                </button>
              </div>
              {categorias && categorias.map((categ, i) => (
                <div key={i} className="col d-grid gap-2 col-3 mx-auto">
                  <button
                    className="btn btn-secondary m-1"
                    onClick={() => {
                      getArticulosCategoria(categ.id_categoria);
                    }}
                  >
                    {categ.descripcion}
                  </button>
                </div>
              ))}
            </div>

            <hr />

            {/*Mostrar productos*/}
            <div className="row divCards">
              <br />
              {articulosMostrar && articulosMostrar.map((artic, i) => (
                <div className="col-sm-4 mb-2" key={i}>
                    <div
                    className="card colorCards"
                    type="button"
                    onClick={() => {
                      abrirModalCantidad();
                      setArticuloClick(artic)
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{artic.descripcion}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {"Código: " + artic.cod_articulo}
                      </h6>
                      <p className="card-text"><span className="badge bg-primary rounded-pill">{"Precio: " + artic.precio}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-4">
            
            <div className="row divDetalles">
            <DataTable
              columns={columns}
              data={listaCompras}
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="200px"
           />
            </div>

            <hr />
            <div className="row">
              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                  >
                    <option value="">Ninguno</option>
                    {descuentos.map((item, i) =>(
                    <option key={i} value={item.id_descuento}>{item.descripcion}</option>
                  ))}
                  </select>
                  <label htmlFor="floatingSelectGrid">Descuento:</label>
                </div>
              </div>

              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                  >
                    <option defaultValue>Seleccionar...</option>
                    {pedidos.map((item, i) =>(
                    <option key={i} value={item.id_modo_pedido}>{item.descripcion}</option>
                  ))}
                  </select>
                  <label htmlFor="floatingSelectGrid">Tipo de Pedido:</label>
                </div>
              </div>
            </div>
            <hr />

            <div className="row">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Sub Total
                  <span className="">{"L. "+(subTotal)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Descuento
                  <span className="">L. 0</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Impuesto
                  <span className="">{"L. "+(Impuesto)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h4>Total</h4>
                  <span className="">
                    <h4>{"L. "+(total)}</h4>
                  </span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="row">
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={abrirModalVenta}
                >
                  Procesar Venta
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={abrirModalCancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ventana Modal de Datos cliente*/}
      <Modal isOpen={modalCliente} toggle={abrirModalCliente} centered>
        <ModalHeader toggle={abrirModalCliente}>Datos del Cliente</ModalHeader>
        <ModalBody>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Nombre:
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              R.T.N:
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              abrirModalCliente();
              resetValores();
            }}
          >
            Aceptar
          </Button>
          <Button color="secondary" onClick={abrirModalCliente}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de Procesar ventas*/}
      <Modal isOpen={modalVenta} toggle={abrirModalVenta} centered>
        <ModalHeader toggle={abrirModalVenta}>Caja</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row text-center">
              <h5>Total a Pagar:</h5>
              <h1>{"L. "+(total)}</h1>
              <p>(VEINTE Y CUATRO LEMPIRAS 00/100)</p>
            </div>
            <hr />
            <div className="row">
              <h5>Método de Pago:</h5>
            </div>
            <div className="row">
              <select className="form-select" id="country" required>
              <option value="">Seleccionar...</option>
                  {metodosPago.map((item, i) =>(
                    <option key={i} value={item.id_metodo_pago}>{item.descripcion}</option>
                  ))}
                 {/** <option value="">COMPARTIDO</option> */}
              </select>
            </div>
            <hr />
{/**
            <div className="row">
              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                  >
                    <option value="">Seleccionar...</option>
                     {metodosPago.map((item, i) =>(
                    <option key={i} value={item.id_metodo_pago}>{item.descripcion}</option>
                  ))}
                  </select>
                  <label htmlFor="floatingSelectGrid">Tipo de Pago 1:</label>
                </div>
                <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="monto"
                      name="montoRecibido1"
                      placeholder="L. 00.00"
                    />
                  </div>
              </div>

              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                  >
                    <option value="">Seleccionar...</option>
                    {metodosPago.map((item, i) =>(
                    <option key={i} value={item.id_metodo_pago}>{item.descripcion}</option>
                  ))}
                  </select>
                  <label htmlFor="floatingSelectGrid">Tipo de Pago 2:</label>
                </div>
                <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="monto"
                      name="montoRecibido1"
                      placeholder="L. 00.00"
                    />
                  </div>
              </div>
            </div>
          */}
          <hr />

            <div className="row">
              <div className="col">
                <div className="row">
                  <h5>Monto Recibido:</h5>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="monto"
                      name="montoRecibido"
                      placeholder="L. 00.00"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <h5>Cambio:</h5>
                </div>
                <div className="row">
                  <h2>L. 5.00</h2>
                </div>
              </div>
            </div>

            <hr />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              abrirModalVenta();
              abrirModalFactura();
            }}
          >
            Aceptar
          </Button>
          <Button color="secondary" onClick={abrirModalVenta}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de cancelar la venta*/}
      <Modal isOpen={modalCancelar} toggle={abrirModalCancelar} centered>
        <ModalHeader toggle={abrirModalCancelar}>Cancelar la Venta Actual</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de cancelar esta venta?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              abrirModalCancelar();
              resetValores();
            }}
          >
            Si
          </Button>
          <Button color="secondary" onClick={abrirModalCancelar}>
            No
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de confirmación de factura*/}
      <Modal isOpen={modalFactura} toggle={abrirModalFactura} centered>
        <ModalHeader toggle={abrirModalFactura}>Factura</ModalHeader>
        <ModalBody>
          <h5>¿Imprimir Factura?</h5>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              abrirModalFactura();
              abrirModalCliente()
            }}
          >
            Imprimir
          </Button>
          <Button color="secondary" 
            onClick={() => {
              abrirModalFactura();
              resetValores();
            }}>
            No
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de cantidad de articulos a agregar*/}
      <Modal isOpen={modalCantidad} toggle={abrirModalCantidad} centered>
        <ModalHeader toggle={abrirModalCantidad}>
          Seleccione la Cantidad
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <div className="btn-group me-2" role="group" aria-label="First group">
              <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                if(cantidad > 1){
                  setCantidad(cantidad - 1)
                }
              }}>
                -
              </button>
              <button type="button" className="btn btn-outline-secondary" disabled>
                {cantidad}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={()=>{setCantidad(cantidad + 1)}}>
                +
              </button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              agregarArticulos()
              abrirModalCantidad();
            }}
          >
            Agregar
          </Button>
          <Button color="secondary" onClick={abrirModalCantidad}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

            {/* Ventana Modal de editar cantidad*/}
            <Modal isOpen={modalCantidadEdit} toggle={abrirModalCantidadEdit} centered>
        <ModalHeader toggle={abrirModalCantidadEdit}>
          Editar
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <div className="btn-group me-2" role="group" aria-label="First group">
              <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                if(cantidadEdit > 1){
                  setCantidadEdit(cantidadEdit - 1)
                }
              }}>
                -
              </button>
              <button type="button" className="btn btn-outline-secondary" disabled>
                {cantidadEdit}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={()=>{setCantidadEdit(cantidadEdit + 1)}}>
                +
              </button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              actualizarCantidad()
              abrirModalCantidadEdit();
            }}
          >
            Agregar
          </Button>
          <Button color="secondary" onClick={abrirModalCantidadEdit}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

          {/* Ventana Modal de eliminar un articulo de la lista*/}
      <Modal isOpen={modalEliminarArticulo} toggle={abrirModalEliminarArticulo} centered>
        <ModalHeader toggle={abrirModalEliminarArticulo}>Eliminar Artículo</ModalHeader>
        <ModalBody>
          <p>¿Está seguro de eliminar este artículo?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              eliminarArticulo();
              abrirModalEliminarArticulo();
            }}
          >
            Eliminar
          </Button>
          <Button color="secondary" onClick={abrirModalEliminarArticulo}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>



    </div>
  );
};

export default PuntoDeVentas;
