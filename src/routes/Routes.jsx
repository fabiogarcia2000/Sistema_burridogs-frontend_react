import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalState } from "../Layout/responseClass";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import Footer from "../Layout/Footer";

import Home from "../pages/Home";
import Productos from "../pages/inventario/Productos";
import MostrarSucursales from "../components/administracion_pos/sucursales/MostrarSucursales";
import CrearSucursal from "../components/administracion_pos/sucursales/CrearSucursal";
import EditarSucursal from "../components/administracion_pos/sucursales/EditarSucursal";
import MostrarCategorias from "../components/administracion_pos/categorias/MostrarCategorias";
import CrearCategoria from "../components/administracion_pos/categorias/CrearCategoria"
import MostrarDescuentos from "../components/administracion_pos/descuentos/MostrarDescuentos";
import CrearDescuento from "../components/administracion_pos/descuentos/CrearDescuentos"
import MostrarImpuestos from "../components/administracion_pos/impuestos/MostrarImpuestos";
import CrearImpuestos from "../components/administracion_pos/impuestos/CrearImpuesto";
import MostrarMetodosPagos from "../components/administracion_pos/metodoPago/MostrarMetodoPago";
import CrearMetodoPago from "../components/administracion_pos/metodoPago/CrearMetodoPago";


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
            <Route path="/crearsucursales" element={<CrearSucursal />} />
            <Route path='/editarsucursal/:id/:type' element={<EditarSucursal />} />
            <Route path="/mostrarcategorias" element={<MostrarCategorias />} />
            <Route path="/crearcategoria" element={<CrearCategoria />} />
            <Route path="/mostrardescuentos" element={<MostrarDescuentos />} />
            <Route path="/creardescuento" element={<CrearDescuento />} />
            <Route path="/mostrarimpuestos" element={<MostrarImpuestos />} />
            <Route path="/crearimpuesto" element={<CrearImpuestos />} />
            <Route path="/mostrarmetodopago" element={<MostrarMetodosPagos />} />
            <Route path="/crearmetodopago" element={<CrearMetodoPago />} />


            <Route path="/productos" element={<Productos />} />
            {/*Rutas inventario*/}

            {/*Rutas contabilidad*/}

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
