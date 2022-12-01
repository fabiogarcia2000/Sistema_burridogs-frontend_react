/* eslint-disable use-isnan */
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { quitarTildes } from "./utils/textoSinTildes";
import { MostrarAlertas } from "./utils/Alertas";
import { InsertVenta } from "./insertVenta";
import { numeroALetras } from "./utils/num_a_letras";
import {
  getCurrentDate,
  getCurrentTime,
  getCurrentDateShort,
} from "../../../utils/fechaYhora";
import { useReactToPrint } from "react-to-print";
import Factura from "../facturaA4/Factura";

const UrlCategorias = "http://190.53.243.69:3001/categoria/getall_active";
const UrlArticulos = "http://190.53.243.69:3001/articulo/getallactive/";
const UrlArticulosCategoria =
  "http://190.53.243.69:3001/articulo/getallbycategoria/";
const UrlMostrarMetodosPago = "http://190.53.243.69:3001/metodo_pago/getall/";
const UrlDescuentos = "http://190.53.243.69:3001/descuento/getall/";
const UrlPedidos = "http://190.53.243.69:3001/modo_pedido/getall";

const PuntoDeVentas = () => {
  const { idPos } = useParams();  
  const componenteRef = useRef();
  const dataSec = JSON.parse(localStorage.getItem("bodsuc"));
  const idSucursal = dataSec[0].id_sucursal;
  const DescSucursal = dataSec[0].descripcion_sucursal;
  const codSucursal = dataSec[0].cod_sucursal;
  const DataTerminal = JSON.parse(localStorage.getItem("terminal"));
  const descTerminal = DataTerminal[0].descripcion;

  const userdata = JSON.parse(localStorage.getItem("data"));

 

  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosMostrar, setArticulosMostrar] = useState([]);

  const [det, setDet] = useState();
  const [enc, setEnc] = useState();

  /**************Fecha y Hora*************************/
  const [fecha, setFecha] = useState("--/--/--");
  const [fechaCorta, setFechaCorta] = useState("--/--/----");
  const [hora, setHora] = useState("--:--:--");
  /***************************************************/

  // const [pagoCompartido, setPagoCompartido] = useState(true);

  const [cantidad, setCantidad] = useState(1);
  const [articuloClick, setArticuloClick] = useState({});
  const [articuloEdit, setArticuloEdit] = useState({});
  const [cantidadEdit, setCantidadEdit] = useState(1);
  const [articuloDelete, setArticuloDelete] = useState(0);
  const [listaCompras, setListaCompras] = useState([]);

  const [subTotal, setSubTotal] = useState(0.0);
  const [Impuesto, setImpuesto] = useState(0.0);
  const [montoDesc, setMontoDesc] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const [tipoPago, setTipoPago] = useState(1);
  const [tipoPedido, setTipoPedido] = useState(2);
  const [porcDescuento, setPorcDescuento] = useState([]);

  const [totalEnLetras, setTotalEnLetras] = useState("");
  const [cambio, setCambio] = useState(0);

  //***************Data de venta para insertar y factura*****************/
  const [detalles, setDetalles] = useState([]);
  const [newDetalles, setNewDetalles] = useState([]);

  const [detallesPago, setDetallesPago] = useState([]);

  const [detallesPromo, setDetallesPromo] = useState([]);

  const [detallesDesc, setDetallesDesc] = useState([]);

 const [listo, setListo] = useState(false);
 const [preparar, setPreparar] = useState(false);

  const valuesInicial = {
    secuencia_enc: undefined,
    id_sucursal: 1,
    cod_sucursal: "BD01",
    fecha: "2022-11-23",
    numero_cuenta: 10002,
    venta_grabada_15: 100,
    venta_grabada_18: 0,
    venta_exenta: 0,
    impuesto_15: 15,
    impuesto_18: 0,
    venta_total: 115,
    cai: "ABCDF-GHIJK-LMNOP-QRST",
    correlativo: 1,
    rtn: "0801-1900-1234",
    nombre_cliente: "Fabio",
    id_usuario: 157,
    id_pos: 1,
    detalle: [],
    detalle_pago: [],
    detalle_promo: [],
    detalle_desc: [],
  };

  const [venta, setVenta] = useState(valuesInicial);

  //************************************************************************/

  useEffect(() => {
    getCategorias();
    getArticulos();
    getMetodosPago();
    getDescuentos();
    getPedidos();
    Enc();
    Fecha();
    Hora();
  }, []);

  //*******FECHA Y HORA*******/
  //obtener fecha
  const Fecha = () => {
    setFecha(getCurrentDate());
    setFechaCorta(getCurrentDateShort());
  };

  //obtener hora
  const Hora = () => {
    setHora(getCurrentTime());
  };
  setInterval(Hora, 1000);
  //*************************/

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
      MostrarAlertas("errorcargar");
    }
  };

  //procedimineto para obtener los articulos por categoria
  const getArticulosCategoria = async (categoria) => {
    try {
      const res = await axios.get(UrlArticulosCategoria + categoria);
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
  const [tiposDescuentos, setTiposDescuentos] = useState([]);

  //petición a api
  const getDescuentos = async () => {
    try {
      const res = await axios.get(UrlDescuentos);
      setTiposDescuentos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Desc = (id) => {
    const desc = tiposDescuentos.filter((item) => item.id_descuento == id);
    setPorcDescuento(desc);
  };

  //Descuento
  const handlerDescuento = function (e) {
    let id = e.target.value;
    Desc(id);
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

  //procedimineto para obtener un clientes
  const [cliente, setCliente] = useState([]);
  const [guardarcliente, setGuardarCliente] = useState(false);
  //petición a api
  const urlCliente = "http://190.53.243.69:3001/socio_negocio/getonertn/";

  const getCliente = async (id) => {
    try {
      const res = await axios.get(urlCliente + id);
      if (res.data.descripcion === undefined) {
        setCliente({
          ...cliente,
          rtn: id,
          descripcion: "",
          creado_por: "Fabio",
          fecha_creacion: "2022/11/30",
          modificado_por: "",
          fecha_modificacion: "",
        });
        setGuardarCliente(true);
        abrirModalCliente2();
        abrirModalCliente();
      } else {
        setCliente({ ...cliente, descripcion: res.data.descripcion, rtn: id });
        setGuardarCliente(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //guardar el cliente si no existe
  //petición a api
  const urlGuardarCliente =
    "http://190.53.243.69:3001/socio_negocio/actualizar-insertar_por_rtn/";
  const getGuardarCliente = async () => {
    if (guardarcliente === true && cliente.descripcion !== "") {
      //procedimineto para guardar el los cambios
      try {
        await axios.put(urlGuardarCliente, cliente);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getGuardarCliente();

    if (detalles.length > 0) {
      PrepararData();
    }
  }, [preparar]);

  useEffect(() => {
    listaCompras.map((list) =>
      setSubTotal((prevValores) => prevValores + list.total)
    );
  }, [listaCompras]);

  /**
useEffect(() => {
    setImpuesto(subTotal * isv);
  }, [subTotal]);
* 
 */

  useEffect(() => {
    setTotal(subTotal + Impuesto - montoDesc);
  }, [Impuesto, subTotal, montoDesc]);

  useEffect(() => {
    setImpuesto(0);
    detalles.map((item) =>
      setImpuesto((prevValor) => prevValor + item.total_impuesto)
    );
  }, [detalles]);

  //Buscador --con expresiones regulares js
  const handleBuscador = (e) => {
    const buscar = quitarTildes(e.target.value.toLowerCase());
    let tmpArray = [];
    const limite = articulos.length;

    for (let index = 0; index < limite; index++) {
      const buscarEn = quitarTildes(articulos[index].descripcion.toLowerCase());
      const patt = new RegExp(buscar);
      const res = patt.test(buscarEn);

      if (res) {
        tmpArray.push(articulos[index]);
      }
    }
    setArticulosMostrar(tmpArray);
  };

  //procedimineto para obtener la secuencia det y enc
  const urlDet = "http://190.53.243.69:3001/venta/secuencia_det_getone";
  const urlEnc = "http://190.53.243.69:3001/venta/secuencia_enc_getone";
  const Det = async () => {
    try {
      const res = await axios.get(urlDet);
      setDet(res.data.ft_secuencia_det_getone);
    } catch (error) {
      console.log(error);
    }
  };

  const Enc = async () => {
    try {
      const res = await axios.get(urlEnc);
      setEnc(res.data.ft_secuencia_enc_getone);
      //console.log("dentro de ENC" ,enc);
    } catch (error) {
      console.log(error);
    }
  };

  //agregar articulos a la lista
  const agregarArticulos = () => {
    if (!listaCompras.find((list) => list.cod === articuloClick.cod_articulo)) {
      setListaCompras([
        ...listaCompras,
        {
          id: articuloClick.id_articulo,
          porc: articuloClick.porcentaje,
          cod: articuloClick.cod_articulo,
          desc: articuloClick.descripcion_corta,
          cant: cantidad,
          prec: articuloClick.precio,
          total: cantidad * articuloClick.precio,
          isv: articuloClick.precio * articuloClick.porcentaje,
        },
      ]);

      setDetalles([
        ...detalles,
        {
          id_modo_pedido: tipoPedido,
          secuencia_det: parseInt(det),
          secuencia_enc: parseInt(enc),
          id_articulo: articuloClick.id_articulo,
          precio: parseFloat(articuloClick.precio),
          cantidad: cantidad,
          id_impuesto: articuloClick.id_impuesto,
          total_impuesto:
            parseFloat(articuloClick.precio) *
            parseFloat(cantidad) *
            parseFloat(articuloClick.porcentaje),
          total:
            parseFloat(articuloClick.precio) *
              cantidad *
              parseFloat(articuloClick.porcentaje) +
            parseFloat(articuloClick.precio) * parseFloat(cantidad),
        },
      ]);

      setDetallesPromo([
        ...detallesPromo,
        {
          secuencia_det: parseInt(det),
          id_articulo: articuloClick.id_articulo,
          id_promo: 1,
        },
      ]);

      resetSubTotal();
      setCantidad(1);
    } else {
      actualizarArticulo(articuloClick.cod_articulo, articuloClick.precio);
      actualizarData(articuloClick.id_articulo);
      setArticuloClick({});
      resetSubTotal();
    }
  };

  //cuando se agrega un articulos repetido a la lista
  const actualizarArticulo = (cod, newPrec) => {
    const newListaCompras = listaCompras.map((art) => {
      if (art.cod === cod) {
        return {
          ...art,
          cant: art.cant + cantidad,
          total: (art.cant + cantidad) * newPrec,
        };
      }
      return art;
    });
    setListaCompras(newListaCompras);

    resetSubTotal();
  };

  //cuando se agrega un articulos repetido a la lista --ACTUALIZAR DATA VENTA
  const actualizarData = (id) => {
    const newDetalles = detalles.map((item) => {
      if (item.id_articulo === id) {
        return {
          ...item,
          cantidad: item.cantidad + cantidad,

          total_impuesto:
            item.total_impuesto +
            parseFloat(articuloClick.precio) *
              parseFloat(cantidad) *
              parseFloat(articuloClick.porcentaje),

          total:
            item.total +
            (parseFloat(articuloClick.precio) *
              cantidad *
              parseFloat(articuloClick.porcentaje) +
              parseFloat(articuloClick.precio) * parseFloat(cantidad)),
        };
      }
      return item;
    });
    setDetalles(newDetalles);
    setCantidad(1);
  };

  //editar la cantidad de un articulo
  const actualizarCantidad = () => {
    const newListaCompras = listaCompras.map((art) => {
      if (art.cod === articuloEdit.cod) {
        return {
          ...art,
          cant: cantidadEdit,
          total: cantidadEdit * articuloEdit.prec,
        };
      }
      return art;
    });
    setListaCompras(newListaCompras);
    actualizarDataCantidad();
    resetSubTotal();
  };

  //editar la cantidad de un articulo --ACTUALIZAR DATA VENTA
  const actualizarDataCantidad = () => {
    const newDetalles = detalles.map((item) => {
      if (item.id_articulo === articuloEdit.id) {
        return {
          ...item,
          cantidad: cantidadEdit,

          total_impuesto:
            parseFloat(articuloEdit.prec) *
            parseFloat(cantidadEdit) *
            parseFloat(articuloEdit.porc),

          total:
            parseFloat(articuloEdit.prec) *
              cantidadEdit *
              parseFloat(articuloEdit.porc) +
            parseFloat(articuloEdit.prec) * parseFloat(cantidadEdit),
        };
      }
      return item;
    });
    setDetalles(newDetalles);
    setCantidad(1);
  };

  //Eliminar un articulo de la lista
  const eliminarArticulo = () => {
    const newLista = listaCompras.filter((art) => art.id !== articuloDelete);
    setListaCompras(newLista);
    eliminarDataArticulo();
    resetSubTotal();
  };

  //Eliminar un articulo de la lista --ACTUALIZAR DATA VENTA
  const eliminarDataArticulo = () => {
    const newLista = detalles.filter(
      (item) => item.id_articulo !== articuloDelete
    );
    setDetalles(newLista);

    const newData = detallesPromo.filter(
      (item) => item.id_articulo !== articuloDelete
    );
    setDetallesPromo(newData);
  };

  //resetea el valores de subtotal
  const resetSubTotal = () => {
    setSubTotal(0);
  };

  //Para generar factura/imprimir
  const handlePrint = useReactToPrint({
    content: () => componenteRef.current,
    documentTitle: "Factura",
    onAfterPrint: () => resetValores(),
  });

  //resetea el valores
  const resetValores = () => {
    setSubTotal(0);
    setImpuesto(0);
    setTotal(0);
    setListaCompras([]);
    setCantidad(1);
    Enc();
    setDetalles([]);
    setDetallesPromo([]);
    setTipoPedido(0);
    Refrescar();
  };

  //resetea el valores
  const dataCliente = (valores) => {
    setCliente({ ...cliente, descripcion: valores.nombre });
  };

  //resetea el valores
  const Refrescar = () => {
    //window.location.reload();
  };

  //calcular el cambio a entregar
  const Calcular_Cambio = (monto) => {
    let cambio = monto - total;

    if (cambio < 0) {
      setCambio(0);
    } else if (isNaN(cambio)) {
      setCambio(0);
    } else {
      setCambio(parseFloat(cambio));
    }
  };

  //detalles de pago
  const Detalles_Pago = () => {
    setDetallesPago([
      ...detallesPago,
      { secuencia_enc: parseInt(enc), id_metodo_pago: tipoPago, monto: total },
    ]);
  };

  //detalles de desc
  const Detalles_Desc = () => {
    let dato = detalles.map((item) => ({
      secuencia_det: item.secuencia_det,
      id_articulo: item.id_articulo,
      id_descuento: porcDescuento[0].id_descuento,
      monto:parseFloat(porcDescuento[0].porcentaje) *(parseFloat(item.precio) * parseFloat(item.cantidad)),
    }));
    setDetallesDesc(...detallesDesc, dato);

    let newData = detalles.map((items) => ({
      secuencia_det: items.secuencia_det,
      secuencia_enc: items.secuencia_enc,
      id_articulo: items.id_articulo,
      id_modo_pedido: items.id_modo_pedido,
      precio: items.precio,
      cantidad: items.cantidad,
      id_impuesto: items.id_impuesto,
      total_impuesto:(parseFloat(items.precio) * parseFloat(items.cantidad)-parseFloat(items.precio) *parseFloat(items.cantidad) *parseFloat(porcDescuento[0].porcentaje)) *
        (parseFloat(items.total_impuesto) /
          (parseFloat(items.precio) * parseFloat(items.cantidad))),
      total:
      parseFloat(items.precio) * parseFloat(items.cantidad) -
      parseFloat(items.precio) *
        parseFloat(items.cantidad) *
        parseFloat(porcDescuento[0].porcentaje) +
      (parseFloat(items.precio) * parseFloat(items.cantidad) -
        parseFloat(items.precio) *
          parseFloat(items.cantidad) *
          parseFloat(porcDescuento[0].porcentaje)) *
        (parseFloat(items.total_impuesto) /
          (parseFloat(items.precio) * parseFloat(items.cantidad))),
    }));
    setNewDetalles(...newDetalles, newData);
  };

  const Calc_Desc = () => {
    setMontoDesc(subTotal * porcDescuento[0].porcentaje);
  };

  useEffect(() => {
    if (porcDescuento.length > 0) {
      Calc_Desc();
    } else if (porcDescuento.length === 0) {
      setMontoDesc(0);
    }
  }, [porcDescuento, detalles]);

  //preparar data de la venta
  const PrepararData = () => {
    /**if (!porcDescuento === []) {
      setDetalles(newDetalles);
      console.log(porcDescuento)
      console.log("datos Descuento 2")
    } */
    setVenta({
      ...venta,
      fecha: fechaCorta,
      nombre_cliente: cliente.descripcion,
      rtn: cliente.rtn,
      id_usuario: userdata.data.id,
      id_sucursal:idSucursal,
      cod_sucursal:codSucursal,
      id_pos:idPos,
      secuencia_enc: parseInt(enc),
      detalle: (porcDescuento.length > 0? newDetalles : detalles),
      detalle_pago: detallesPago,
      detalle_promo: detallesPromo,
      detalle_desc: detallesDesc,
    });
  };

  useEffect(() => {
    if (venta.detalle.length > 0) {
      InsertVenta(venta);
      console.log("DATA VENTA:");
      console.log(venta);
      setListo(true)
    }
  }, [venta]);

  //Ventana modal cliente
  const [modalCliente2, setModalCliente2] = useState(false);
  const abrirModalCliente2 = () => setModalCliente2(!modalCliente2);

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
  const abrirModalEliminarArticulo = () =>
    setModalEliminarArticulo(!modalEliminarArticulo);

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
              setArticuloDelete(row.id);
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
            <div className="col-3">
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

            <div className="col-5">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <p className="nav-link" aria-current="page">
                      {DescSucursal}
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link">{descTerminal}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-3">
              <li className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{hora}</div>
                  <p>{fecha}</p>
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
                      <Link
                        className="dropdown-item"
                        to={"/admin/cierre-caja/" + 10}
                      >
                        Corte de Caja
                      </Link>
                    </li>
                    <li>
                      {/**<Link className="dropdown-item" to="#">
                        Información
                      </Link> */}
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
                <i className="bi bi-search"></i>
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
              {categorias &&
                categorias.map((categ, i) => (
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
              {articulosMostrar &&
                articulosMostrar.map((artic, i) => (
                  <div className="col-sm-4 mb-2" key={i}>
                    <div
                      className="card colorCards"
                      type="button"
                      onClick={() => {
                        abrirModalCantidad();
                        setArticuloClick(artic);
                        Det();
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{artic.descripcion}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {"Código: " + artic.cod_articulo}
                        </h6>
                        <p className="card-text">
                          <span className="badge bg-primary rounded-pill">
                            {"Precio: " + parseFloat(artic.precio)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-4">
            <div className="row divDetalles">
              {listaCompras.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={listaCompras}
                  highlightOnHover
                  fixedHeader
                  fixedHeaderScrollHeight="200px"
                />
              ) : (
                <p className="text-center">Ningún Artículo en Lista</p>
              )}
            </div>

            <hr />
            <Formik
              //valores iniciales
              initialValues={{
                id_descuento: "",
                id_modo_pedido: "",
              }}
              //Funcion para validar
              validate={(valores) => {
                let errores = {};

                // Validacion de modo pedido
                if (!valores.id_modo_pedido) {
                  errores.id_modo_pedido = "Requerido";
                }

                return errores;
              }}
              onSubmit={async (valores) => {
                // Validacion de modo pedido
                if (!listaCompras.length > 0) {
                  MostrarAlertas("agregar");
                } else {
                  //procedimineto para guardar el los cambios
                  abrirModalVenta();
                  setDetallesPago([]);
                  Detalles_Pago();
                  setTipoPedido(valores.id_modo_pedido);
                  setTotalEnLetras(numeroALetras(parseFloat(total)));
                  setDetallesDesc([]);
                  setNewDetalles([]);
                  Detalles_Desc();
                }
              }}
            >
              {({ errors, values }) => (
                <Form>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            name="id_descuento"
                            onClick={handlerDescuento}
                          >
                            <option value="">Ninguno</option>
                            {tiposDescuentos.map((item, i) => (
                              <option key={i} value={item.id_descuento}>
                                {item.descripcion}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="floatingSelectGrid">Descuento:</label>
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            name="id_modo_pedido"
                          >
                            <option value="">Seleccionar...</option>
                            {pedidos.map((item, i) => (
                              <option key={i} value={item.id_modo_pedido}>
                                {item.descripcion}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="floatingSelectGrid">
                            Tipo de Pedido:
                          </label>

                          <ErrorMessage
                            name="id_modo_pedido"
                            component={() => (
                              <div className="error">
                                {errors.id_modo_pedido}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Sub Total
                          <span className="">{"L. " + subTotal}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Descuento
                          <span className="">{"L. " + montoDesc}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Impuesto
                          <span className="">{"L. " + Impuesto}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <h4>Total</h4>
                          <span className="">
                            <h4>{"L. " + parseFloat(total)}</h4>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-success" type="submit">
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Ventana Modal de cliente*/}
      <Modal isOpen={modalCliente} toggle={abrirModalCliente} centered>
        <ModalHeader toggle={abrirModalCliente}>Datos del Cliente</ModalHeader>
        <ModalBody>
          <Formik
            //valores iniciales
            initialValues={{
              id_cliente: "",
            }}
            //Funcion para validar
            validate={(valores) => {
              let errores = {};

              // Validacion id
              if (!valores.id_cliente) {
                errores.id_cliente = "Ingrese un ID o RTN Correcto";
              } else if (!/^[0-9]+$/.test(valores.id_cliente)) {
                errores.id_cliente = "ID o RTN Incorrecto";
              }

              return errores;
            }}
            onSubmit={async (valores) => {
              getCliente(valores.id_cliente);

              setTimeout(function () {
                //PrepararData()
              }, 3000);
          
            }}
          >
            {({ errors, values }) => (
              <Form>
                <div className="row">
                  <div className="input-group mb-2">
                    <span className="input-group-text">ID</span>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="escriba el ID o RTN..."
                      aria-label="Recipient's username"
                      //aria-describedby="button-addon2"
                      name="id_cliente"
                    />

                    <button
                      className="btn btn-success"
                      type="submit"
                      id="button-addon2"
                    >
                      Buscar
                    </button>
                  </div>
                  <div className="row">
                    <ErrorMessage
                      name="id_cliente"
                      component={() => (
                        <div className="error">{errors.id_cliente}</div>
                      )}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <hr />

          <div className="row">
            <div className="alert alert-primary" role="alert">
              {cliente.descripcion ? (
                <>
                  <p>{"ID: " + (cliente.rtn || "")}</p>
                  <p>{" Nombre: " + cliente.descripcion}</p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr />

          {/**FACTURA**/}
          <div ref={componenteRef} className="imprimir">
            <Factura />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              //InsertVenta(venta);

              if(cliente.descripcion === undefined){
                setCliente({ ...cliente, descripcion: "CONSUMIDOR FINAL"});
                //setListo(true)
              }

              setPreparar(true)
              if(listo === true){
                handlePrint();
                abrirModalCliente();
              }
             
            }}
          >
            Aceptar
          </Button>

          <Button color="secondary" onClick={abrirModalCliente}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de Datos cliente*/}
      <Modal isOpen={modalCliente2} toggle={abrirModalCliente2} centered>
        <Formik
          //valores iniciales
          initialValues={{
            nombre: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion id
            if (!valores.nombre) {
              errores.nombre = "Nombre requerido";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            setCliente({ ...cliente, descripcion: valores.nombre });
            //dataCliente(valores);
            abrirModalCliente2();
            abrirModalCliente();            
          }}
        >
          {({ errors, values }) => (
            <Form>
              <ModalHeader toggle={abrirModalCliente2}>
                Nombre del Cliente
              </ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="alert alert-danger" role="alert">
                    Cliente no encontrado
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="input-group mb-2">
                    <span className="input-group-text">Nombre: </span>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Nombre del Cliente..."
                      aria-label="Recipient's username"
                      //aria-describedby="button-addon2"
                      name="nombre"
                    />
                  </div>
                  <div className="row">
                    <ErrorMessage
                      name="nombre"
                      component={() => (
                        <div className="error">{errors.nombre}</div>
                      )}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Guardar
                </Button>
                <Button color="secondary" onClick={abrirModalCliente2}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Ventana Modal de Procesar ventas*/}
      <Modal isOpen={modalVenta} toggle={abrirModalVenta} centered>
        <Formik
          //valores iniciales
          initialValues={{
            metodo_pago: "",
            monto_recibido: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion tipo de pago
            if (!valores.metodo_pago) {
              errores.metodo_pago = "Requerido";
            }

            // Validacion de monto
            if (!valores.monto_recibido) {
              errores.monto_recibido = "Requerido";
            } else if (valores.monto_recibido < total) {
              errores.monto_recibido =
                "El monto recibido debe ser mayor o igual al total";
            } else if (!/^[0-9]+(.[0-9]+)?$/.test(valores.monto_recibido)) {
              errores.monto_recibido = "Monto Incorrecto";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            setTipoPago(valores.metodo_pago);
            abrirModalVenta();
            abrirModalFactura();
          }}
        >
          {({ errors, values }) => (
            <Form>
              <ModalHeader toggle={abrirModalVenta}>Caja</ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="row text-center">
                    <h5>Total a Pagar:</h5>
                    <h1>{"L. " + parseFloat(total)}</h1>
                    <p>{"(" + totalEnLetras + ")"}</p>
                  </div>
                  <hr />
                  <div className="row">
                    <h5>Método de Pago:</h5>
                  </div>
                  <div className="row">
                    <Field
                      className="form-select"
                      id="country"
                      as="select"
                      name="metodo_pago"
                    >
                      <option value="">Seleccionar...</option>
                      {metodosPago.map((item, i) => (
                        <option key={i} value={item.id_metodo_pago}>
                          {item.descripcion}
                        </option>
                      ))}
                      {/** <option value="">COMPARTIDO</option> */}
                    </Field>

                    <ErrorMessage
                      name="metodo_pago"
                      component={() => (
                        <div className="error">{errors.metodo_pago}</div>
                      )}
                    />
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
                          <Field
                            type="text"
                            className="form-control"
                            id="monto"
                            name="monto_recibido"
                            placeholder="L.0.0"
                            onKeyUp={Calcular_Cambio(values.monto_recibido)}
                          />
                          <ErrorMessage
                            name="monto_recibido"
                            component={() => (
                              <div className="error">
                                {errors.monto_recibido}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="row">
                        <h5>Cambio:</h5>
                      </div>
                      <div className="row">
                        <h2>{"L." + cambio}</h2>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" onClick={() => {}}>
                  Aceptar
                </Button>
                <Button color="secondary" onClick={abrirModalVenta}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Ventana Modal de cancelar la venta*/}
      <Modal isOpen={modalCancelar} toggle={abrirModalCancelar} centered>
        <ModalHeader toggle={abrirModalCancelar}>
          Cancelar la Venta Actual
        </ModalHeader>
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
              abrirModalCliente();
            }}
          >
            Imprimir
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              abrirModalFactura();
            }}
          >
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
            <div
              className="btn-group me-2"
              role="group"
              aria-label="First group"
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (cantidad > 1) {
                    setCantidad(cantidad - 1);
                  }
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled
              >
                {cantidad}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setCantidad(cantidad + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              agregarArticulos();
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
      <Modal
        isOpen={modalCantidadEdit}
        toggle={abrirModalCantidadEdit}
        centered
      >
        <ModalHeader toggle={abrirModalCantidadEdit}>Editar</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <div
              className="btn-group me-2"
              role="group"
              aria-label="First group"
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (cantidadEdit > 1) {
                    setCantidadEdit(cantidadEdit - 1);
                  }
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled
              >
                {cantidadEdit}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setCantidadEdit(cantidadEdit + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              actualizarCantidad();
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
      <Modal
        isOpen={modalEliminarArticulo}
        toggle={abrirModalEliminarArticulo}
        centered
      >
        <ModalHeader toggle={abrirModalEliminarArticulo}>
          Eliminar Artículo
        </ModalHeader>
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