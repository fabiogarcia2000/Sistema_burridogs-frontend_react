import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { MostrarAlertas } from "../ingresar_mds/utils/Alertas";
import { numeroALetras } from "./utils/num_a_letras";
import Swal from "sweetalert2";
import {
  cambiarAMayusculasDescripCorta,
  cambiarAMayusculasDescripArticulo,
} from "../../../utils/cambiarAMayusculas";
import { RegistroEnVitacora } from "../../seguridad/bitacora/RegistroBitacora";


const URLCrear = "http://190.53.243.69:3001/articulo/actualizar-insertar/";

const UrlMostrarSocios = "http://190.53.243.69:3001/socio_negocio/getall";
const UrlCategorias = "http://190.53.243.69:3001/categoria/getall_active";
const UrlArticulos = "http://190.53.243.69:3001/articulo/getallactiveinv/";
const UrlArticulosCategoria =
  "http://190.53.243.69:3001/articulo/getallbycategoria/";
const UrlDescuentos = "http://190.53.243.69:3001/descuento/getall/";
const isv = 0.15;

const objeto = "FORM_COMPRAS"

const Formulario = () => {
  const navigate = useNavigate();

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

  const [subTotal, setSubTotal] = useState(0.0);
  const [Impuesto, setImpuesto] = useState(0.0);
  const [montoDesc, setMontoDesc] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const [tipoPago, setTipoPago] = useState(1);
  const [tipoPedido, setTipoPedido] = useState(2);
  const [porcDescuento, setPorcDescuento] = useState({});

  const [totalEnLetras, setTotalEnLetras] = useState("");
  const [cambio, setCambio] = useState(0);

  useEffect(() => {
    getCategorias();
    getArticulos();
  }, []);

/*****Obtener y corroborar Permisos*****/
const [temp, setTemp] = useState([]);
const [permisos, setPermisos] = useState([]);
const [permitido, setPermitido] = useState(true)

const Permisos = () =>{
  const newData = temp.filter(
    (item) => item.objeto === objeto
  );
  setPermisos(newData);
}

useEffect(() => {
  let data = localStorage.getItem('permisos')
  if(data){
    setTemp(JSON.parse(data))
  }
}, []);

useEffect(() => {
  Permisos();
}, [temp]);


useEffect(() => {
  if(permisos.length > 0){
    TienePermisos();
  }
}, [permisos]);


const TienePermisos = () =>{
  setPermitido(permisos[0].permiso_consultar)
}

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

  //procedimineto para obtener todos los modos de pedido y mostrarlas en select
  const [pedidos, setPedidos] = useState([]);

  //Descuento
  const handlerDescuento = function (e) {
    let id = e.target.value;
    Desc(id);
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
    setTipoPedido(0);
    Refrescar();
  };

  //resetea el valores
  const Refrescar = () => {
    //window.location.reload();
  };

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

  //Ventana modal procesar venta
  const [modalVenta, setModalVenta] = useState(false);
  const abrirModalVenta = () => setModalVenta(!modalVenta);

  const columns = [
    {
      name: "CÓDIGO ARTÍCULO",
      selector: (row) => row.cod,
      sortable: true,
    },
    {
      name: "UNIDAD DE MEDIDA",
      selector: (row) => row.unidad,
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
    /*{
      name: "IMPUESTO",
      selector: (row) => row.impuesto,
      sortable: true,
    },
    {
      name: "MONTO IMPUESTO",
      selector: (row) => row.descripcion,
      sortable: true,
    },*/

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
    <div className="container">

      {permitido? (
     
     <div>
      <Formik
        //valores iniciales
        initialValues={{
          secuencia_enc: "",
          id_socio_negocio: "",
          fecha: "",
          referencia: "",
          monto_total: "",
          monto_impuesto_total: "",
          creado_por: "eaplicano",
          fecha_creacion: "2022-11-21",
          modificado_por: "eaplicano",
          fecha_modificacion: "2022-11-21",
          id_usuario: "",
          id_centro_costo: "",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion socio
          if (!valores.id_socio_negocio) {
            errores.id_socio_negocio = "Por favor seleccione una opción";
          }

          // Validacion referencia
          if (!valores.referencia) {
            errores.referencia = "Por favor ingrese una referencia";
          }

          // Validacion monto
          if (!valores.monto_total) {
            errores.monto_total = "Por favor ingrese un monto";
          } else if (!/^^[0-9]+$/.test(valores.monto_total)) {
            errores.monto_total = "El monto solo pueden contener números";
          }

          // Validacion unidad
          if (!valores.unidad) {
            errores.unidad = "Por favor ingrese una unidad";
          }
          // Validacion cantidad
          if (!valores.cantidad) {
            errores.cantidad = "Por favor ingrese la cantidad";
          } else if (!/^^[0-9]+$/.test(valores.id)) {
            errores.cantidad = "La cantidad solo puede contener números";
          }
          // Validacion precio unitario
          if (!valores.preciou) {
            errores.preciou = "Por favor ingrese un precio";
          }

          // Validacion total
          if (!valores.total) {
            errores.total = "Por favor ingrese el total";
          } else if (!/^^[0-9]+$/.test(valores.total)) {
            errores.id = "El total solo puede contener números";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //validar si existe un registro con el codigo ingresado
          try {
            const res = await axios.put(`${URLCrear}`, valores);
            console.log(res);
            if (res.status === 200) {
              mostrarAlertas("guardado");
              RegistroEnVitacora(permisos[0].id_objeto, "CREAR", "CREAR COMPRA"); //Insertar bitacora
              navigate("/admin/mostrarmateriales");
            } else {
              mostrarAlertas("error");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/admin/mostrarmateriales");
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <h3 className="mb-3">Nueva orden de compra</h3>
            <hr />
            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="socioCompra" className="form-label">
                    Socio de Negocio:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="socioCompra"
                    name="id_socio_negocio"
                  >
                    <option value="">Seleccionar...</option>
                    {socios.map((item, i) => (
                      <option key={i} value={item.id_socio_negocio}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="id"
                    component={() => <div className="error">{errors.id}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="fechaCompra" className="form-label">
                    Fecha:
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fechaCompra"
                    name="fecha"
                    placeholder="Descripcion del Artículo..."
                  />

                  <ErrorMessage
                    name="fecha"
                    component={() => (
                      <div className="error">{errors.fecha}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="RefCompra" className="form-label">
                    Referencia:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="RefCompra"
                    name="referencia"
                    placeholder="Referencia..."
                  />

                  <ErrorMessage
                    name="referencia"
                    component={() => (
                      <div className="error">{errors.referencia}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="rtnSucursal" className="form-label">
                    Impuesto Total:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="rtnSucursal"
                    name="preciou"
                    disabled
                  />

                  <ErrorMessage
                    name="preciou"
                    component={() => (
                      <div className="error">{errors.precio}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Id Usuario:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="total"
                    disabled
                  />

                  <ErrorMessage
                    name="total"
                    component={() => (
                      <div className="error">{errors.total}</div>
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb-3">
                  <label htmlFor="centroCostoSucursal" className="form-label">
                    Centro de Costo:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="centroCostoSucursal"
                    name="total"
                    disabled
                  />

                  <ErrorMessage
                    name="total"
                    component={() => (
                      <div className="error">{errors.total}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/*Mostrar categorias
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
            </div>*/}
            <hr />
            {/*Mostrar productos*/}
            <div className="row divCards">
              <br />
              {articulosMostrar &&
                articulosMostrar.map((artic, i) => (
                  <div className="col-sm-3 mb-2" key={i}>
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
                          <span className="badge bg-success rounded-pill">
                            {"Precio: " + artic.precio}
                          </span>
                        </p>
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
                  //valores iniciales
                  initialValues={{
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
                          {/*<div className="col">
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
                              <label htmlFor="floatingSelectGrid">
                                Descuento:
                              </label>
                            </div>
                          </div>*/}

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
                                <option value="1">Contado</option>
                                <option value="2">Crédito</option>
                              </Field>
                              <label htmlFor="floatingSelectGrid">
                                Modo de Compra:
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
                            <button className="btn btn-primary" type="submit">
                              Realizar Compra
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

            <div className="col-sm-3">
              <div className="mb-3">
                <label htmlFor="montoCompra" className="form-label">
                  Monto Total:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="montoCompra"
                  name="monto_total"
                  disabled
                />

                <ErrorMessage
                  name="monto_total"
                  component={() => (
                    <div className="error">{errors.monto_total}</div>
                  )}
                />
              </div>
            </div>
            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/admin/mostraringresomds"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
      </div>

) : (
  <p className="text-center text-danger">Lo siento, no tienes permisos para realizar esta acción.</p>
)}
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

export default Formulario;
