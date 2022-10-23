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
