import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { quitarTildes } from "./utils/textoSinTildes";
import { MostrarAlertas } from "../ingresar_mds/utils/Alertas";
import { InsertCompra } from "./insertCompra";
import { numeroALetras } from "./utils/num_a_letras";
import { useReactToPrint } from "react-to-print";
import { cambiarAMayusculasReferencia } from "../../../utils/cambiarAMayusculas";
import {
  getCurrentDate,
  getCurrentTime,
  getCurrentDateShort,
} from "../../../utils/fechaYhora";
import Swal from "sweetalert2";
import Factura from "../ingresar_mds/facturaA4/Factura";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";

const URLCrear = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const UrlMostrarSocios =
  "http://190.53.243.69:3001/socio_negocio/getallproveedores";
const UrlCategorias = "http://190.53.243.69:3001/categoria/getall_active";
const UrlMostrarMetodosPago = "http://190.53.243.69:3001/metodo_pago/getall/";
const UrlArticulos = "http://190.53.243.69:3001/articulo/getallactiveinv/";
const UrlArticulosCategoria =
  "http://190.53.243.69:3001/articulo/getallbycategoria/";
const UrlDescuentos = "http://190.53.243.69:3001/descuento/getall/";
const isv = 0.15;

const objeto = "FORM_COMPRAS";

const OrdenCompra = () => {
  const navigate = useNavigate();
  const componenteRef = useRef();

  const dataSec = JSON.parse(localStorage.getItem("bodsuc"));
  const idSucursal = dataSec[0].id_sucursal;
  const DescSucursal = dataSec[0].descripcion_sucursal;
  const codSucursal = dataSec[0].cod_sucursal;

  //const fecha = getCurrentDateShort();
  const userdata = JSON.parse(localStorage.getItem("data"));
  const usuario = userdata.data.nameUser;

  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosMostrar, setArticulosMostrar] = useState([]);
  const [det, setDet] = useState();
  const [newDetalles, setNewDetalles] = useState([]);

  // const [pagoCompartido, setPagoCompartido] = useState(true);

  const [cantidad, setCantidad] = useState(1);
  const [articuloClick, setArticuloClick] = useState({});
  const [articuloEdit, setArticuloEdit] = useState({});
  const [cantidadEdit, setCantidadEdit] = useState(1);
  const [articuloDelete, setArticuloDelete] = useState(0);
  const [listaCompras, setListaCompras] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [enc, setEnc] = useState();
  const [detallesPromo, setDetallesPromo] = useState([]);
  const [detallesPago, setDetallesPago] = useState([]);
  const [detallesDesc, setDetallesDesc] = useState([]);

  /***temp***/
  const [tempTotal, setTempTotal] = useState(0.0);
  const [tempIsv, setTempIsv] = useState(0.0);
  /***temp***/

  const [subTotal, setSubTotal] = useState(0.0);
  const [Impuesto, setImpuesto] = useState(0.0);
  const [montoDesc, setMontoDesc] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const [tipoPago, setTipoPago] = useState(1);
  const [tipoSocio, setTipoSocio] = useState(2);

  const [porcDescuento, setPorcDescuento] = useState({});

  const [totalEnLetras, setTotalEnLetras] = useState("");
  const [cambio, setCambio] = useState(0);

  const [listo, setListo] = useState(false);
  const [preparar, setPreparar] = useState(false);

  /**************Fecha y Hora*************************/
  const [fecha, setFecha] = useState("--/--/--");
  const [fechaCorta, setFechaCorta] = useState("--/--/----");
  const [hora, setHora] = useState("--:--:--");
  /***************************************************/

  useEffect(() => {
    getCategorias();
    getArticulos();
    getMetodosPago();
    getDescuentos();
    Enc();
    Fecha();
    Hora();
  }, []);

  /**********temp*********/
  useEffect(() => {
    setTempIsv(((subTotal || 0) - (montoDesc || 0)) * 0.15);
  }, [subTotal, montoDesc]);

  useEffect(() => {
    setTempTotal(subTotal - montoDesc + tempIsv);
  }, [tempIsv, montoDesc]);

  /**********temp*********/

  //Buscador --con expresiones regulares js
  const handleBuscador = (e) => {
    const buscar = quitarTildes(e.target.value.toLowerCase());
    let tmpArray = [];
    const limite = articulos.length;

    for (let index = 0; index < limite; index++) {
      const buscarEn = quitarTildes(articulos[index].descripcion.toLowerCase());
      const buscarEn2 = articulos[index].cod_articulo.toLowerCase();
      const patt = new RegExp(buscar);
      const res = patt.test(buscarEn, buscarEn2);

      if (res) {
        tmpArray.push(articulos[index]);
      }
    }
    setArticulosMostrar(tmpArray);
  };

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

  useEffect(() => {
    getCategorias();
    getArticulos();
  }, []);

  const valuesInicial = {
    secuencia_enc: undefined,
    id_socio_negocio: "",
    fecha: "",
    referencia: "",
    monto_total: 0,
    monto_impuesto_total: 0,
    creado_por: usuario,
    fecha_creacion: "",
    modificado_por: "Jonathan",
    fecha_modificacion: "2022-12-12",
    id_usuario: 0,
    id_centro_costo: 0,
    detalle: [],
  };
  const [compra, setCompra] = useState(valuesInicial);

  /*****Obtener y corroborar Permisos*****/
  const [temp, setTemp] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [permitido, setPermitido] = useState(true);

  const Permisos = () => {
    const newData = temp.filter((item) => item.objeto === objeto);
    setPermisos(newData);
  };

  //procedimiento registrar referencia
  const [referencia, setRef] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("permisos");
    if (data) {
      setTemp(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    Permisos();
  }, [temp]);

  useEffect(() => {
    if (permisos.length > 0) {
      TienePermisos();
    }
  }, [permisos]);

  const TienePermisos = () => {
    setPermitido(permisos[0].permiso_consultar);
  };

  /*******************/

  //detalles de pago
  const Detalles_Pago = () => {
    setDetallesPago([
      ...detallesPago,
      { secuencia_enc: parseInt(enc), id_metodo_pago: tipoPago, monto: total },
    ]);
  };

  //procedimineto para obtener los socios de negocio
  const [socios, setSocios] = useState([]);
  useEffect(() => {
    getSocios();
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
      const res = await axios.get(UrlArticulosCategoria + categoria);
      setArticulos(res.data);
      setArticulosMostrar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //petición a api
  const getSocios = async () => {
    try {
      const res = await axios.get(UrlMostrarSocios);
      setSocios(res.data);
    } catch (error) {
      console.log(error);
      mostrarAlertas("errormostrar");
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

  useEffect(() => {
    listaCompras.map((list) =>
      setSubTotal((prevValores) => prevValores + list.total)
    );
  }, [listaCompras]);

  useEffect(() => {
    setImpuesto(subTotal * isv);
  }, [subTotal]);

  useEffect(() => {
    setTotal(subTotal + Impuesto);
  }, [Impuesto, subTotal]);

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

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) => {
    switch (alerta) {
      case "guardado":
        Swal.fire({
          title: "¡Guardado!",
          text: "La compra se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      case "error":
        Swal.fire({
          title: "Error",
          text: "No se pudo ingresar la compra",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        break;

      case "duplicado":
        Swal.fire({
          text: "Ya existe un artículo con el código ingresado",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      default:
        break;
    }
  };

  //Descuento
  const handlerDescuento = function (e) {
    let id = e.target.value;
    Desc(id);
  };

  //Para generar factura/imprimir
  const handlePrint = useReactToPrint({
    content: () => componenteRef.current,
    documentTitle: "Factura",
    onAfterPrint: () => resetValores(),
  });

  //procedimineto para obtener la secuencia det y enc
  const urlDet = "http://190.53.243.69:3001/compras/secuencia_det_getone";
  const urlEnc = "http://190.53.243.69:3001/compras/secuencia_enc_getone";

  const Det = async () => {
    try {
      const res = await axios.get(urlDet);
      setDet(res.data.ft_secuencia_det_compras_getone);
    } catch (error) {
      console.log(error);
    }
  };

  const Enc = async () => {
    try {
      const res = await axios.get(urlEnc);
      setEnc(res.data.ft_secuencia_enc_compras_getone);
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
          idUnd: articuloClick.id_unidad_medida,
          und: articuloClick.cod_unidad_medida,
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
          secuencia_det: parseInt(det),
          secuencia_enc: parseInt(enc),
          id_articulo: articuloClick.id_articulo,
          precio_unit: parseFloat(articuloClick.precio),
          cantidad: cantidad,
          id_impuesto: articuloClick.id_impuesto,
          id_unidad_medida: articuloClick.id_unidad_medida,
          monto_impuesto:
            parseFloat(articuloClick.precio) *
            parseFloat(cantidad) *
            parseFloat(articuloClick.porcentaje),
          monto_total:
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

  //detalles de desc
  const Detalles_Desc = () => {
    let dato = detalles.map((item) => ({
      secuencia_det: item.secuencia_det,
      id_articulo: item.id_articulo,
      id_descuento: porcDescuento[0].id_descuento,
      monto:
        parseFloat(porcDescuento[0].porcentaje) *
        (parseFloat(item.precio) * parseFloat(item.cantidad)),
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
      total_impuesto:
        (parseFloat(items.precio) * parseFloat(items.cantidad) -
          parseFloat(items.precio) *
            parseFloat(items.cantidad) *
            parseFloat(porcDescuento[0].porcentaje)) *
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
    Refrescar();
  };

  //resetea el valores
  const Refrescar = () => {
    //window.location.reload();
  };

  //calcular el cambio a entregar
  const Calcular_Cambio = (monto) => {
    let cambio = monto - tempTotal;
    cambio = cambio.toFixed(2);

    if (cambio < 0) {
      setCambio(0);
    } else if (isNaN(cambio)) {
      setCambio(0);
    } else {
      setCambio(parseFloat(cambio));
    }
  };

  //preparar data de la compra
  const PrepararData = () => {
    setCompra({
      ...compra,
      id_socio_negocio: tipoSocio,
      fecha: fechaCorta,
      referencia: referencia,
      fecha_creacion: fechaCorta,
      creado_por: userdata.data.nameUser,
      id_usuario: userdata.data.id,
      id_centro_costo: idSucursal,
      cod_sucursal: codSucursal,
      secuencia_enc: parseInt(enc),
      detalle: porcDescuento.length > 0 ? newDetalles : detalles,
      monto_total: tempTotal,
      monto_impuesto_total: tempIsv,
    });
  };

  useEffect(() => {
    if (detalles.length > 0) {
      PrepararData();
    }
  }, [preparar]);

  useEffect(() => {
    if (compra.detalle.length > 0) {
      InsertCompra(compra);
      setListo(true);
    }
  }, [compra]);

  //Ventana modal cantidad
  const [modalCantidad, setModalCantidad] = useState(false);
  const abrirModalCantidad = () => setModalCantidad(!modalCantidad);

  //Ventana modal cantidad editar
  const [modalCantidadEdit, setModalCantidadEdit] = useState(false);
  const abrirModalCantidadEdit = () => setModalCantidadEdit(!modalCantidadEdit);

  //Ventana modal cancelar venta
  const [modalCancelar, setModalCancelar] = useState(false);
  const abrirModalCancelar = () => setModalCancelar(!modalCancelar);

  //Ventana modal eliminar artículo
  const [modalEliminarArticulo, setModalEliminarArticulo] = useState(false);
  const abrirModalEliminarArticulo = () =>
    setModalEliminarArticulo(!modalEliminarArticulo);

  //Ventana modal procesar compra
  const [modalVenta, setModalVenta] = useState(false);
  const abrirModalVenta = () => setModalVenta(!modalVenta);

  //Ventana modal confirmación de imprimir factura
  const [modalFactura, setModalFactura] = useState(false);
  const abrirModalFactura = () => setModalFactura(!modalFactura);

  const columns = [
    {
      name: "NOMBRE ARTÍCULO",
      selector: (row) => row.desc,
      sortable: true,
    },
    {
      name: "UND. MEDIDA",
      selector: (row) => row.und,
      sortable: true,
    },

    {
      name: "CANTIDAD",
      selector: (row) => row.cant,
      sortable: true,
    },
    {
      name: "PRECIO",
      selector: (row) => row.prec,
      sortable: true,
    },

    {
      name: "TOTAL",
      selector: (row) => row.total,
      sortable: true,
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
            <i class="bi bi-pencil-square"></i>
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
            <i class="bi bi-trash-fill"></i>
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
      {/** {/*permitido ? (*/}
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="col-3">
              <h3>Nueva Orden de Compra</h3>
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
                        to={"/admin/panelcompras"}
                      >
                        Salir
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
          {/*Mostrar la barra de busqueda*/}
          <div className="row">
            <div className="col-8">
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
          </div>
          <br />
          <br />
          <br />
          {/*Mostrar categorias*/}
          <div className="col-7">
            <h4>Categorías</h4>
            <div className="row colorcategorias">
              <div className="col d-grid gap-2 col-3 mx-auto">
                <button
                  className="btn btn-info m-2"
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
                      className="btn btn-info m-2"
                      onClick={() => {
                        getArticulosCategoria(categ.id_categoria);
                      }}
                    >
                      {categ.descripcion}
                    </button>
                  </div>
                ))}
            </div>
            <br />
          </div>
          <br />
          <hr />
          <br />
          {/*Mostrar productos*/}
          <h4>Artículos</h4>
          <br />
          <br />
          <div className="row divCards">
            <br />
            {articulosMostrar &&
              articulosMostrar.map((artic, i) => (
                <div className="col-sm-2 mb-2" key={i}>
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
                      <p className="card-title">{artic.descripcion}</p>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {"Código: " + artic.cod_articulo}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <hr />
          <div className="row">
            <div className="col-8">
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
                  <p className="text-center">Ningún Material en Lista</p>
                )}
              </div>
            </div>
            <div className="col-4">
              <Formik
                initialValues={{
                  id_descuento: "",
                  id_modo_pedido: "",
                }}
                //Funcion para validar
                onSubmit={async (valores) => {
                  // Validacion de modo pedido
                  if (!listaCompras.length > 0) {
                    MostrarAlertas("agregar");
                  } else {
                    //procedimineto para guardar el los cambios
                    abrirModalVenta();
                    setDetallesPago([]);
                    Detalles_Pago();
                    setTotalEnLetras(numeroALetras(parseFloat(tempTotal)));
                    setNewDetalles([]);
                  }
                }}
              >
                {({ errors, values }) => (
                  <Form>
                    <div className="container">
                      <div className="row">
                        <ul className="list-group">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Sub Total
                            <span className="">
                              {"L. " + (subTotal || 0).toFixed(2)}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Impuesto
                            <span className="">
                              {"L. " + (tempIsv || 0).toFixed(2)}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            <h4>Total</h4>
                            <span className="">
                              <h4>
                                {"L. " + parseFloat(tempTotal).toFixed(2)}
                              </h4>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="d-grid gap-2 col-12 mx-auto">
                          <Button className="btn btn-success" type="submit">
                            Realizar Compra
                          </Button>
                          <Button
                            className="btn btn-danger"
                            type="button"
                            onClick={abrirModalCancelar}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {/*) : (<p className="text-center text-danger">
          Lo siento, no tienes permisos para realizar esta acción.
        </p>
        )} */}
      </div>
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
              setPreparar(true);
              if (listo === true) {
                handlePrint();
                abrirModalFactura();
              }
            }}
          >
            Imprimir
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setPreparar(true);
              if (listo === true) {
                //handlePrint();
                resetValores();
                //abrirModalCliente();
                abrirModalFactura();
              }
              //abrirModalFactura();
            }}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ventana Modal de Procesar ventas*/}
      <Modal isOpen={modalVenta} toggle={abrirModalVenta} centered>
        <Formik
          //valores iniciales
          initialValues={{
            id_socio_negocio: "",
          }}
          //Funcion para validar
          validate={(valores) => {
            let errores = {};

            // Validacion socio negocio
            if (!valores.id_socio_negocio) {
              errores.id_socio_negocio = "Requerido";
            }

            // Validacion referencia
            if (!valores.referencia) {
              errores.referencia = "Requerido";
            }

            return errores;
          }}
          onSubmit={async (valores) => {
            setTipoSocio(valores.id_socio_negocio);
            setRef(valores.referencia);
            abrirModalVenta();
            abrirModalFactura();
          }}
        >
          {({ errors, values }) => (
            <Form>
              <ModalHeader toggle={abrirModalVenta}>Compra</ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="row text-center">
                    <h5>Monto Total:</h5>
                    <h1>{"L. " + parseFloat(tempTotal)}</h1>
                    <p>{"(" + totalEnLetras + ")"}</p>
                  </div>
                  <hr />
                  <div className="row">
                    <h5>Proveedor:</h5>
                  </div>
                  <div className="row">
                    <Field
                      className="form-select"
                      id="country"
                      as="select"
                      name="id_socio_negocio"
                    >
                      <option value="">Seleccionar...</option>
                      {socios.map((item, i) => (
                        <option key={i} value={item.id_socio_negocio}>
                          {item.descripcion}
                        </option>
                      ))}
                      {/** <option value="">COMPARTIDO</option> */}
                    </Field>

                    <ErrorMessage
                      name="id_socio_negocio"
                      component={() => (
                        <div className="error">{errors.id_socio_negocio}</div>
                      )}
                    />
                  </div>
                  <br />
                  <div className="row">
                    <h5>Referencia:</h5>
                  </div>
                  <div className="row">
                    <Field
                      type="text"
                      className="form-control"
                      name="referencia"
                      placeholder="Referencia de compra..."
                      onKeyUp={cambiarAMayusculasReferencia(values)}
                    />

                    <ErrorMessage
                      name="referencia"
                      component={() => (
                        <div className="error">{errors.referencia}</div>
                      )}
                    />
                  </div>
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

export default OrdenCompra;
