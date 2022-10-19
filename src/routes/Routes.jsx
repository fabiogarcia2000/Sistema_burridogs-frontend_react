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
