import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalState } from "../Layout/responseClass";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import Footer from "../Layout/Footer";

import Home from "../pages/Home";
import Productos from "../pages/inventario/Productos";
import MostrarSucursales from "../components/administracion_pos/sucursales/MostrarSucursales";
import CrearSucursal from "../components/administracion_pos/sucursales/PruebaCrearSucursal";
import EditarSucursal from "../components/administracion_pos/sucursales/EditarSucursal";
import MostrarCategorias from "../components/administracion_pos/categorias/MostrarCategorias";
import CrearCategoria from "../components/administracion_pos/categorias/CrearCategoria";
import MostrarDescuentos from "../components/administracion_pos/descuentos/MostrarDescuentos";
import CrearDescuento from "../components/administracion_pos/descuentos/CrearDescuentos";
import MostrarImpuestos from "../components/administracion_pos/impuestos/MostrarImpuestos";
import CrearImpuestos from "../components/administracion_pos/impuestos/CrearImpuesto";
import MostrarMetodosPagos from "../components/administracion_pos/metodoPago/MostrarMetodoPago";
import CrearMetodoPago from "../components/administracion_pos/metodoPago/CrearMetodoPago";
import CrearModoPedido from "../components/administracion_pos/modoPedido/CrearModoPedido";
import EditarModoPedido from "../components/administracion_pos/modoPedido/EditarModoPedido"
import MostrarModoPedido from "../components/administracion_pos/modoPedido/MostrarModoPedido";
import CrearTalonarioSAR from "../components/administracion_pos/talonarioSAR/crearTaSAR";
import EditarTalonarioSAR from "../components/administracion_pos/talonarioSAR/editarTaSAR"
import MostrarTalonarioSAR from "../components/administracion_pos/talonarioSAR/mostrarTaSAR";
import CrearPOS from "../components/administracion_pos/POS/CrearPOS";
import EditarPOS from "../components/administracion_pos/POS/EditarPOS";
import MostrarPOS from "../components/administracion_pos/POS/MostrarPOS";
import CrearMesas from "../components/administracion_pos/mesas/CrearMesas";
import EditarMesas from "../components/administracion_pos/mesas/EditarMesas";
import MostrarMesas from "../components/administracion_pos/mesas/MostrarMesas";

import MostrarArticulos from "../components/inventario/articulos/MostrarArticulos";
import CrearArticulo from "../components/inventario/articulos/CrearArticulo";
import EditarArticulo from "../components/inventario/articulos/EditarArticulo";

import MostrarMateriales from "../components/inventario/materiales/MostrarMateriales";
import CrearMaterial from "../components/inventario/materiales/CrearMaterial";
import EditarMaterial from "../components/inventario/materiales/EditarMateriales";

import MostrarUnidadesMedida from "../components/inventario/unidades_medida/MostrarUnidadesMedida";
import CrearUnidadMedida from "../components/inventario/unidades_medida/CrearUnidadMedida";
import EditarUnidadMedida from "../components/inventario/unidades_medida/EditarUnidadMedida";

import MostrarIngresoMds from "../components/inventario/ingresar_mds/MostrarIngresoMds";
import CrearIngresoMds from "../components/inventario/ingresar_mds/CrearIngresoMds";
import EditarIngresoMds from "../components/inventario/ingresar_mds/EditarIngresoMds";

import MostrarSalidaMds from "../components/inventario/salida_mds/MostrarSalidaMds";
import CrearSalidaMds from "../components/inventario/salida_mds/CrearSalidaMds";
import EditarSalidaMds from "../components/inventario/salida_mds/EditarSalidaMds";

//---------------------------------------------------- MÓDULO DE SEGURIDAD -----------------------------------------------------------------
//USUARIOS

//import MostrarUsuarios from "../pages/seguridad/usuarios/Usuarios";
//import CrearUsuario from "../components/seguridad/usuario/CrearUsuario";
//import EditarUsuario from "../components/seguridad/usuario/MostrarUsuarios";
//import Login from "../pages/seguridad/login/Login"
//import Registro from "../pages/seguridad/registro/Registro"

import Login from "../pages/seguridad/login/Login"
import Registro from "../pages/seguridad/registro/Registro"
import Pregunta from "../pages/seguridad/preguntas/Preguntas"
import Usuarios from "../pages/seguridad/usuarios/Usuarios"
import CambioContra from "../pages/seguridad/cambio_contrasena/cambio_contrasena"
import RecuperacionContra from "../pages/seguridad/recuperacion_contrasena/recuperacion_contrasena"
import RecuperacionCorreo from "../pages/seguridad/recuperacion_correo/recuperacion_correo"
import RecuperacionPreguntas from "../pages/seguridad/recuperacion_preguntas/recuperacion_preguntas"


import MostrarUsuarios from "../pages/seguridad/usuarios/Usuarios";
//import CrearUsuario from "../components/seguridad/usuario/CrearUsuario";
//import EditarUsuario from "../components/seguridad/usuario/MostrarUsuarios";
//import Login from "../pages/seguridad/login/Login"
//import Registro from "../pages/seguridad/registro/Registro"




function Rutas() {
  const [main_class] = useGlobalState("main_class");

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <main id="main" className={main_class}>
        <section className="section dashboard">
          <Routes>
            <Route path="/" element={<Home />} />
            {/*Rutas Administración POS*/}
            <Route path="/mostrarsucursales" element={<MostrarSucursales />} />
            <Route
              path="/crearsucursales/:id/:type"
              element={<CrearSucursal />}
            />
            <Route
              path="/editarsucursal/:id/:type"
              element={<EditarSucursal />}
            />
            <Route path="/mostrarcategorias" element={<MostrarCategorias />} />
            <Route path="/crearcategoria" element={<CrearCategoria />} />
            <Route path="/mostrardescuentos" element={<MostrarDescuentos />} />
            <Route path="/creardescuento" element={<CrearDescuento />} />
            <Route path="/mostrarimpuestos" element={<MostrarImpuestos />} />
            <Route path="/crearimpuesto" element={<CrearImpuestos />} />
            <Route
              path="/mostrarmetodopago"
              element={<MostrarMetodosPagos />}
            />
            <Route path="/crearmetodopago" element={<CrearMetodoPago />} />
            <Route path="/mostrarmodopedido" element={<MostrarModoPedido />}/>
            <Route path="/crearmodopedido" element={<CrearModoPedido />} />
            <Route
              path="/editarmodopedido/:id/:type"
              element={<EditarModoPedido />}
            />
            <Route path="/creartalonarioSAR" element={<CrearTalonarioSAR />}/>
            <Route
              path="/editarTaSAR/:id/:type"
              element={<EditarTalonarioSAR />}
            />
            <Route path="/mostrartalonarioSAR" element={<MostrarTalonarioSAR />} />
            <Route path="/crearPOS" element={<CrearPOS />}/>
            
            <Route path="/mostrarPOS" element={<MostrarPOS />} />
            <Route
              path="/editarPOS/:id/:type"
              element={<EditarPOS />}
            />
            <Route path="/crearMesas" element={<CrearMesas />}/>
            
            <Route path="/mostrarMesas" element={<MostrarMesas />} />
            <Route
              path="/editarMesas/:id/:type"
              element={<EditarMesas />}
            />
              
            <Route path="/productos" element={<Productos />} />
            {/*Rutas inventario*/}

            <Route path="/mostrararticulos" element={<MostrarArticulos />} />
            <Route path="/creararticulo" element={<CrearArticulo />} />
            <Route
              path="/editararticulo/:id/:type"
              element={<EditarArticulo />}
            />
            <Route path="/mostrarmateriales" element={<MostrarMateriales />} />
            <Route path="/crearmaterial" element={<CrearMaterial />} />
            <Route
              path="/editarmaterial/:id/:type"
              element={<EditarMaterial />}
            />

            <Route
              path="/mostrarunidadesmedida"
              element={<MostrarUnidadesMedida />}
            />
            <Route path="/crearunidadmedida" element={<CrearUnidadMedida />} />
            <Route
              path="/editarunidadmedida/:id/:type"
              element={<EditarUnidadMedida />}
            />

            <Route path="/mostraringresomds" element={<MostrarIngresoMds />} />
            <Route path="/crearingresomds" element={<CrearIngresoMds />} />
            <Route
              path="/editaringresomds/:id/:type"
              element={<EditarIngresoMds />}
            />

            <Route path="/mostrarsalidamds" element={<MostrarSalidaMds />} />
            <Route path="/crearsalidamds" element={<CrearSalidaMds />} />
            <Route
              path="/editarsalidamds/:id/:type"
              element={<EditarSalidaMds />}
            />
            {/*Rutas contabilidad*/}

            {/*Rutas seguridad*/}


            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/Preguntas" element={<Pregunta />} />
            <Route path="/cambio_contrasena" element={<CambioContra />} />
            <Route path="/recuperacion_contrasena" element={<RecuperacionContra />} />
            <Route path="/recuperacion_correo" element={<RecuperacionCorreo />} />
            <Route path="/recuperacion_preguntas" element={<RecuperacionPreguntas />} />
            <Route path="/usuarios" element={<MostrarUsuarios />} />



            {/*Rutas reportes*/}

            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </section>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default Rutas;
