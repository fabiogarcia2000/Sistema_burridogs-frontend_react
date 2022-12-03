import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalState } from "../globalStates/globalStates";

import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import Footer from "../Layout/Footer";

import Home from "../pages/Home";
import PanelCompras from "../components/inventario/ingresar_mds/PanelCompras";

import Productos from "../pages/inventario/Productos";

import LoginPos from "../components/ventas/loginPOS/LoginPos";
import PuntoDeVentas from "../components/ventas/PuntoVentas/PuntoDeVentas";
import VentasRealizadas from "../components/ventas/listaVentas/ListaVentas";
import FacturaA4 from "../components/ventas/facturaA4/Factura";
import Corte from "../components/ventas/corte/Corte";

import DatosEmpresa from "../components/empresa/Empresa";

import MostrarSucursales from "../components/administracion_pos/sucursales/MostrarSucursales";
import CrearSucursal from "../components/administracion_pos/sucursales/CrearSucursal";
import EditarSucursal from "../components/administracion_pos/sucursales/EditarSucursal";

import MostrarSociosNegocio from "../components/administracion_pos/socios_negocio/MostrarSocios";
import CrearSocioNegocio from "../components/administracion_pos/socios_negocio/CrearSocio";
import EditarSocioNegocio from "../components/administracion_pos/socios_negocio/EditarSocio";

import MostrarCategorias from "../components/administracion_pos/categorias/MostrarCategorias";
import CrearCategoria from "../components/administracion_pos/categorias/CrearCategoria";
import EditarCategoria from "../components/administracion_pos/categorias/EditarCategoria";

import MostrarDescuentos from "../components/administracion_pos/descuentos/MostrarDescuentos";
import CrearDescuento from "../components/administracion_pos/descuentos/CrearDescuentos";
import EditarDescuento from "../components/administracion_pos/descuentos/EditarDescuento";

import MostrarImpuestos from "../components/administracion_pos/impuestos/MostrarImpuestos";
import CrearImpuestos from "../components/administracion_pos/impuestos/CrearImpuesto";
import EditarImpuestos from "../components/administracion_pos/impuestos/EditarImpuesto";

import MostrarMetodosPagos from "../components/administracion_pos/metodoPago/MostrarMetodoPago";
import CrearMetodoPago from "../components/administracion_pos/metodoPago/CrearMetodoPago";
import EditarMetodoPago from "../components/administracion_pos/metodoPago/EditarMetodoPago";

import CrearModoPedido from "../components/administracion_pos/modoPedido/CrearModoPedido";
import EditarModoPedido from "../components/administracion_pos/modoPedido/EditarModoPedido";
import MostrarModoPedido from "../components/administracion_pos/modoPedido/MostrarModoPedido";

import CrearTalonarioSAR from "../components/administracion_pos/Correlativo/crearTaSAR";
import EditarTalonarioSAR from "../components/administracion_pos/Correlativo/editarTaSAR";
import MostrarTalonarioSAR from "../components/administracion_pos/Correlativo/mostrarTaSAR";

import CrearPOS from "../components/administracion_pos/POS/CrearPOS";
import EditarPOS from "../components/administracion_pos/POS/EditarPOS";
import MostrarPOS from "../components/administracion_pos/POS/MostrarPOS";

import CrearMesas from "../components/administracion_pos/mesas/CrearMesas";
import EditarMesas from "../components/administracion_pos/mesas/EditarMesas";
import MostrarMesas from "../components/administracion_pos/mesas/MostrarMesas";

import MostrarArticulos from "../components/inventario/articulos/MostrarArticulos";
import CrearArticulo from "../components/inventario/articulos/CrearArticulo";
import EditarArticulo from "../components/inventario/articulos/EditarArticulo";
import MostrarInvArt from "../components/inventario/inv_articulos/MostrarInvArt";

import CrearCentroCosto from "../components/inventario/centro_Costo/CrearCentroCosto";
import EditarCentroCosto from "../components/inventario/centro_Costo/EditarCentroCosto";
import MostrarCentroCosto from "../components/inventario/centro_Costo/MostrarCentroCosto";

import MostrarMateriales from "../components/inventario/materiales/MostrarMateriales";
import CrearMaterial from "../components/inventario/articulos/CrearMaterial";
import EditarMaterial from "../components/inventario/materiales/EditarMateriales";

import MostrarUnidadesMedida from "../components/inventario/unidades_medida/MostrarUnidadesMedida";
import CrearUnidadMedida from "../components/inventario/unidades_medida/CrearUnidadMedida";
import EditarUnidadMedida from "../components/inventario/unidades_medida/EditarUnidadMedida";

import MostrarIngresoMds from "../components/inventario/ingresar_mds/MostrarIngresoMds";
import CrearCompra from "../components/inventario/ingresar_mds/CrearCompra";
import EditarIngresoMds from "../components/inventario/ingresar_mds/EditarIngresoMds";

import MostrarSalidaMds from "../components/inventario/salida_mds/MostrarSalidaMds";
import CrearSalidaMds from "../components/inventario/salida_mds/CrearSalidaMds";
import EditarSalidaMds from "../components/inventario/salida_mds/EditarSalidaMds";

import ReporteVentaResumen from "../components/reports/ReporteVenta/VentaResumen";
import ReporteVentaFecha from "../components/reports/ReporteVentaFecha/ReporteVentaFecha";
import ReporteCompraFecha from "../components/reports/ReporteCompraFecha/ReporteCompraFecha";
import ReporteProducto from "../components/reports/ReporteProducto/ReporteProducto";
import ReporteVentaCajero from "../components/reports/ReporteVentaCajero/ReporteVentaCajero";
//---------------------------------------------------- MÓDULO DE SEGURIDAD -----------------------------------------------------------------
//USUARIOS
import MostrarUsuarios from "../pages/seguridad/usuarios/Usuarios";
//import CrearUsuario from "../components/seguridad/usuario/CrearUsuario";
import EditarUsuario from "../components/seguridad/usuario/EditarUsuario";
import Login from "../pages/seguridad/login/Login";
import Parametros from "../pages/seguridad/parametros/Parametros";

//import Logs from "../pages/seguridad/logs/Logs";
import Pregunta from "../pages/seguridad/preguntas/Preguntas";
import Layout from "../Layout/Layout";
import Registro from "../pages/seguridad/registro/Registro";
import CreateUser from "../pages/seguridad/createUser/CreateUser";
import CambioContra from "../pages/seguridad/cambio_contrasena/cambio_contrasena";
import RecuperacionContra from "../pages/seguridad/recuperacion_contrasena/recuperacion_contrasena";
import RecuperacionCorreo from "../pages/seguridad/recuperacion_correo/recuperacion_correo";
import RecuperacionPreguntas from "../pages/seguridad/recuperacion_preguntas/recuperacion_preguntas";
//import desbloquearUsuario from "../pages/seguridad/desbloquearUsuario/desbloquearUsuario"
//import UnlockUser from "../pages/seguridad/UnlockUser/UnlockUser";
import MyProfile from "../pages/seguridad/MyProfile/MyProfile";

//Preguntas de seguridad
import CrearPregunta from "../pages/seguridad/preguntas/CrearPreguntas";
import EditarPregunta from "../pages/seguridad/preguntas/EditarPreguntas";

//Parametros
import CrearParametro from "../pages/seguridad/parametros/CrearParametro";
import EditarParametro from "../pages/seguridad/parametros/EditarParametro";
//import EditarParametro from "../pages/seguridad/parametros/";

//Objeto
import MostrarObjeto from "../components/seguridad/objetos/MostrarObjetos";
import CrearObjeto from "../components/seguridad/objetos/CrearObjetos";
import EditarObjeto from "../components/seguridad/objetos/EditarObjetos";

//Permisos
import MostrarPermiso from "../components/seguridad/permisos/MostrarPermiso";
import CrearPermiso from "../components/seguridad/permisos/CrearPermiso";
import EditarPermiso from "../components/seguridad/permisos/EditarPermiso";

//PREG USUARIO
import MostrarPregUsuario from "../components/seguridad/preguntas_usuario/MostrarPregUsuario";
import EditarPregUsuario from "../components/seguridad/preguntas_usuario/EditarPregUsuario";

//ROLES
import Roles from "../pages/seguridad/roles/Roles";
import CrearRol from "../pages/seguridad/roles/CrearRol";
import EditarRol from "../pages/seguridad/roles/EditarRol";
//---------------------------------------------------- MÓDULO DE CONTABILIDAD -----------------------------------------------------------------
//CATEGORIA CONTABLE
import CrearCategoriaCont from "../components/contabilidad/categoriaContable/CrearCategoriaCont";
import MostrarCategoriasCont from "../components/contabilidad/categoriaContable/MostrarCategoriasCont";
import EditarCategoriaCont from "../components/contabilidad/categoriaContable/EditarCategoriaCont";

//CATALOGO DE CUENTAS
import CrearCuenta from "../components/contabilidad/catalogoCuentas/CrearCuenta";
import MostrarCuentas from "../components/contabilidad/catalogoCuentas/MostrarCuentas";
import EditarCuenta from "../components/contabilidad/catalogoCuentas/EditarCuenta";

//DESTINO DE CUENTAS
import CrearDestino from "../components/contabilidad/destinoCuenta/CrearDestino";
import MostrarDestino from "../components/contabilidad/destinoCuenta/MostrarDestino";
import EditarDestino from "../components/contabilidad/destinoCuenta/EditarDestino";

//INFORME FINANCIERO
import CrearInformeFinanciero from "../components/contabilidad/informeFinanciero/CrearInformeFinanciero";
import MostrarInformeFinanciero from "../components/contabilidad/informeFinanciero/MostrarInformeFinanciero";
import EditarInformeFinanciero from "../components/contabilidad/informeFinanciero/EditarInformeFinanciero";

//LIBRO MAYOR
import MostrarLibroMayor from "../components/contabilidad/libroMayor/MostrarLibroMayor";
import EditarLibroMayor from "../components/contabilidad/libroMayor/EditarLibroMayor";
import Mayorizar from "../components/contabilidad/libroMayor/Mayorizar"; //AGREGADO

//SUBCUENTA
import MostrarSubCuentas from "../components/contabilidad/subcuenta/MostrarSubcuenta";
import CrearSubCuenta from "../components/contabilidad/subcuenta/CrearSubcuenta";
import EditarSubCuenta from "../components/contabilidad/subcuenta/EditarSubcuenta";

//ESTADO
import MostrarEstado from "../components/contabilidad/estado/MostrarEstado";
import CrearEstado from "../components/contabilidad/estado/CrearEstado";
import EditarEstado from "../components/contabilidad/estado/EditarEstado";

//DETALLE LIBRO DIARIO
import MostrarLibroDetalle from "../components/contabilidad/librodiariodetalle/MostrarLibroDetalle";
import CrearLibroDetalle from "../components/contabilidad/librodiariodetalle/CrearLibroDetalle";
import EditarLibroDetalle from "../components/contabilidad/librodiariodetalle/EditarLibroDetalle";

//ENCABEZADO LIBRO encabezado
import MostrarLibroEncabezado from "../components/contabilidad/librodiarioencabezado/MostrarLibroEncabezado";
import CrearLibroEncabezado from "../components/contabilidad/librodiarioencabezado/CrearLibroEncabezado";
import EditarLibroEncabezado from "../components/contabilidad/";

//PERIODO CONTABLE
import MostrarPeriodoContable from "../components/contabilidad/periodocontable/MostrarPeriodoContable";
import CrearPeriodoContable from "../components/contabilidad/periodocontable/CrearPeriodoContable";
import EditarPeriodoContable from "../components/contabilidad/periodocontable/EditarPeriodoContable";

import ReporteLibroMayor from "../components/reports/LibroMayor";

//--------------------------------------------MI PERFIL--------------------------------------------------
import EditarMiUsuario from "../components/seguridad/mi_perfil/EditarUsuario";
import CambioContrasena from "../components/seguridad/mi_perfil/CambioContrasena";
import MostrarObjetos from "../components/seguridad/objetos/MostrarObjetos";
import DesbloqueoUsuario from "../pages/seguridad/desbloqueo_usuario/desbloqueo_usuario";

function Rutas() {
  const [main_class] = useGlobalState("main_class");

  return (
    <BrowserRouter>
      {/*-------------------------------------------RUTAS DE LOGIN-------------------------------*/}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Preguntas" element={<Pregunta />} />
        <Route path="/desbloqueo_usuario" element={<DesbloqueoUsuario />} />
        <Route
          path="/cambio_contrasena/:id/:token"
          element={<CambioContra />}
        />
        <Route
          path="/recuperacion_contrasena"
          element={<RecuperacionContra />}
        />
        <Route path="/recuperacion_correo" element={<RecuperacionCorreo />} />
        <Route
          path="/recuperacion_preguntas/:id_usuario"
          element={<RecuperacionPreguntas />}
        />
        {/* <Route path="/desbloquearUsuario/" element={<desbloquearUsuario />} />*/}
      </Routes>

      <Routes>
        {/*-------------------------------------------RUTAS DE SEGURIDAD------------------------------*/}
        <Route path="/admin" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<MostrarUsuarios />} />
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="editUser/:id" element={<EditarUsuario />} />
          {/*<Route path="logs" element={<Logs />} />*/}
          {/*PARÁMETROS*/}
          <Route path="params" element={<Parametros />} />
          <Route path="crearparametro" element={<CrearParametro />} />
          <Route path="editarparametro" element={<EditarParametro />} />
          {/*PREGUNTAS DE SEGURIDAD*/}
          <Route path="questions" element={<Pregunta />} />
          <Route path="crearpregunta" element={<CrearPregunta />} />
          <Route path="editarpregunta" element={<EditarPregunta />} />
          {/*OBJETOS*/}
          <Route path="mostrarobjetos" element={<MostrarObjeto />} />
          <Route path="crearobjetos" element={<CrearObjeto />} />
          <Route path="editarobjetos" element={<EditarObjeto />} />
          {/*PERMISOS*/}
          <Route path="mostrarpermiso" element={<MostrarPermiso />} />
          <Route path="crearpermiso" element={<CrearPermiso />} />
          <Route path="editarpermiso" element={<EditarPermiso />} />
          {/*PREG USUARIO*/}
          <Route path="mostrarpregusuario" element={<MostrarPregUsuario />} />
          <Route path="editarpregusuario" element={<EditarPregUsuario />} />
          {/*ROLES*/}
          <Route path="roles" element={<Roles />} />
          <Route path="crearrol" element={<CrearRol />} />
          <Route path="editarrol" element={<EditarRol />} />
          {/*------------------------------Rutas Administración POS----------------------------------*/}
          {/*Ruta Datos de Empresa*/}
          <Route path="datos-empresa" element={<DatosEmpresa />} />
          {/*Rutas Administración POS*/}
          <Route path="login-pos" element={<LoginPos />} />
          <Route path="punto-de-ventas/:idPos" element={<PuntoDeVentas />} />
          <Route path="ventas-realizadas" element={<VentasRealizadas />} />
          <Route path="factura-generada" element={<FacturaA4 />} />
          <Route path="corte-caja/:id" element={<Corte />} />
          <Route path="mostrarsucursales" element={<MostrarSucursales />} />
          <Route path="crearsucursal" element={<CrearSucursal />} />
          <Route path="editarsucursal" element={<EditarSucursal />} />
          <Route path="mostrarsocios" element={<MostrarSociosNegocio />} />
          <Route path="crearsocio" element={<CrearSocioNegocio />} />
          <Route path="editarsocio" element={<EditarSocioNegocio />} />
          <Route path="mostrarcategorias" element={<MostrarCategorias />} />
          <Route path="crearcategoria" element={<CrearCategoria />} />
          <Route path="editarcategoria" element={<EditarCategoria />} />
          <Route path="mostrardescuentos" element={<MostrarDescuentos />} />
          <Route path="creardescuento" element={<CrearDescuento />} />
          <Route path="editardescuento" element={<EditarDescuento />} />
          <Route path="mostrarimpuestos" element={<MostrarImpuestos />} />
          <Route path="crearimpuesto" element={<CrearImpuestos />} />
          <Route path="editarimpuesto" element={<EditarImpuestos />} />
          <Route path="mostrarmetodospago" element={<MostrarMetodosPagos />} />
          <Route path="crearmetodopago" element={<CrearMetodoPago />} />
          <Route path="editarmetodopago" element={<EditarMetodoPago />} />
          <Route path="mostrarmodopedido" element={<MostrarModoPedido />} />
          <Route path="crearmodopedido" element={<CrearModoPedido />} />
          <Route path="editarmodopedido" element={<EditarModoPedido />} />
          <Route path="creartalonarioSAR" element={<CrearTalonarioSAR />} />
          <Route path="editarTaSAR" element={<EditarTalonarioSAR />} />
          <Route path="mostrartalonarioSAR" element={<MostrarTalonarioSAR />} />
          <Route path="crearPOS" element={<CrearPOS />} />
          <Route path="mostrarPOS" element={<MostrarPOS />} />
          <Route path="editarPOS" element={<EditarPOS />} />
          <Route path="crearMesas" element={<CrearMesas />} />
          <Route path="mostrarMesas" element={<MostrarMesas />} />
          <Route path="editarMesas" element={<EditarMesas />} />
          <Route path="productos" element={<Productos />} />
          {/*--------------------------------------Rutas inventario-----------------------------------*/}
          <Route path="mostrarcentrocosto" element={<MostrarCentroCosto />} />
          <Route path="crearcentrocosto" element={<CrearCentroCosto />} />
          <Route path="editarcentrocosto" element={<EditarCentroCosto />} />
          <Route path="mostrararticulos" element={<MostrarArticulos />} />
          <Route path="creararticulo" element={<CrearArticulo />} />
          <Route path="editararticulo" element={<EditarArticulo />} />
          <Route path="mostrarinvart" element={<MostrarInvArt />} />
          <Route path="mostrarmateriales" element={<MostrarMateriales />} />
          <Route path="crearmaterial" element={<CrearMaterial />} />
          <Route path="editarmaterial" element={<EditarMaterial />} />
          <Route
            path="mostrarunidadesmedida"
            element={<MostrarUnidadesMedida />}
          />
          <Route path="crearunidadmedida" element={<CrearUnidadMedida />} />
          <Route path="editarunidadmedida" element={<EditarUnidadMedida />} />
          <Route path="mostraringresomds" element={<MostrarIngresoMds />} />
          <Route path="panelcompras" element={<PanelCompras />} />

          <Route path="crearcompra" element={<CrearCompra />} />
          <Route path="editaringresomds" element={<EditarIngresoMds />} />
          <Route path="mostrarsalidamds" element={<MostrarSalidaMds />} />
          <Route path="crearsalidamds" element={<CrearSalidaMds />} />
          <Route path="editarsalidamds" element={<EditarSalidaMds />} />
          {/*Rutas contabilidad*/}
          {/*-----------------------------------RUTAS CONTABILIDAD-----------------------------------------------*/}
          {/*CATEGORIA CONTABLE*/}
          <Route path="crearcategoriacont" element={<CrearCategoriaCont />} />
          <Route
            path="mostrarcategoriacont"
            element={<MostrarCategoriasCont />}
          />
          <Route path="editarcategoriacont" element={<EditarCategoriaCont />} />
          {/*CATALOGO DE CUENTAS*/}
          <Route path="crearcatalogo" element={<CrearCuenta />} />
          <Route path="mostrarcatalogo" element={<MostrarCuentas />} />
          <Route path="editarcatalogo" element={<EditarCuenta />} />
          {/*DESTINO CUENTA*/}
          <Route path="creardestino" element={<CrearDestino />} />
          <Route path="mostrardestino" element={<MostrarDestino />} />
          <Route path="editardestino" element={<EditarDestino />} />
          {/*INFORME FINANCIERO*/}
          <Route
            path="crearinformefinanciero"
            element={<CrearInformeFinanciero />}
          />
          <Route
            path="mostrarinformefinanciero"
            element={<MostrarInformeFinanciero />}
          />
          <Route
            path="editarinformefinanciero"
            element={<EditarInformeFinanciero />}
          />
          {/*LIBRO MAYOR*/}
          <Route path="mostrarlibromayor" element={<MostrarLibroMayor />} />
          <Route path="editarlibromayor" element={<EditarLibroMayor />} />
          <Route path="mayorizar" element={<Mayorizar />} />
          {/*SUBCUENTA*/}
          <Route path="mostrarsubcuenta" element={<MostrarSubCuentas />} />
          <Route path="editarsubcuenta" element={<EditarSubCuenta />} />
          <Route path="crearsubcuenta" element={<CrearSubCuenta />} />
          {/*ESTADO*/}
          <Route path="mostrarestado" element={<MostrarEstado />} />
          <Route path="editarestado" element={<EditarEstado />} />
          <Route path="crearestado" element={<CrearEstado />} />
          {/*DETALLE LIBRO DIARIO*/}
          <Route
            path="mostrarlibrodetalle"
            element={<MostrarLibroDetalle />}
          />
          <Route path="editarlibrodetalle" element={<EditarLibroDetalle />} />
          <Route path="crearlibrodetalle" element={<CrearLibroDetalle />} />
          {/*ENCABEZADO LIBRO DIARIO*/}
          <Route
            path="mostrarlibroencabezado"
            element={<MostrarLibroEncabezado />}
          />
          <Route path="/admin/home" element={<EditarLibroEncabezado />} />
          <Route
            path="/admin/CrearLibroEncabezado"
            element={<CrearLibroEncabezado />}
          />
          {/*PERIODO CONTABLE*/}
          <Route path="mostrarperiodo" element={<MostrarPeriodoContable />} />
          <Route path="editarperiodo" element={<EditarPeriodoContable />} />
          <Route path="crearperiodo" element={<CrearPeriodoContable />} />
          {/*-----------------------------------RUTAS MI PERFIL-----------------------------------------------*/}
          <Route path="editarusuario" element={<EditarMiUsuario />} />
          <Route path="cambiocontrasena" element={<CambioContrasena />} />
          {/*--------------------------------------Rutas reportes--------------------------------------------*/}
          {/*reportes POS*/}
          <Route path="reporte-venta-fecha" element={<ReporteVentaFecha />} />
          <Route path="reporte-compra-fecha" element={<ReporteCompraFecha />} />
          <Route path="reporte-producto" element={<ReporteProducto />} />
          <Route path="reporte-cajero" element={<ReporteVentaCajero />} />
          <Route
            path="reporte-venta-resumen"
            element={<ReporteVentaResumen />}
          />
          <Route path="reporte-libro-mayor" element={<ReporteLibroMayor />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
