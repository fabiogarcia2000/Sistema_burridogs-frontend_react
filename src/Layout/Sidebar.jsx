import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../globalStates/globalStates";

function Sidebar() {
  const [classSidebar] = useGlobalState("sidebar_class");
  console.log(classSidebar);

  return (
    <aside id="sidebar" className={classSidebar}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/">
            <i className="bi bi-grid"></i> <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#components-nav2"
            data-bs-toggle="collapse"
            to="/"
          >
            <i className="bi bi-person-fill"></i>
            <span>Mi Perfil</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="components-nav2"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/editarusuario">
                <i className="bi bi-circle"></i>
                <span>Editar mi usuario</span>
              </Link>
            </li>
            <li>
              <Link to="/cambiocontrasena">
                <i className="bi bi-circle"></i>
                <span>Cambiar mi contraseña</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            to="/"
          >
            <i className="bi bi-cart3"></i>
            <span>Ventas</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/punto-de-ventas">
                <i className="bi bi-circle"></i>
                <span>Punto de venta</span>
              </Link>
            </li>
            <li>
              <Link to="/ventas-realizadas">
                <i className="bi bi-circle"></i>
                <span>Ventas Realizadas</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 4</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#otros-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-ui-checks"></i>
            <span>Administración PDV</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="otros-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrarcategorias">
                <i className="bi bi-circle"></i>
                <span>Categorías</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsucursales">
                <i className="bi bi-circle"></i>
                <span>Sucursales</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsocios">
                <i className="bi bi-circle"></i>
                <span>Socios de Negocio</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarimpuestos">
                <i className="bi bi-circle"></i>
                <span>Impuestos</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrardescuentos">
                <i className="bi bi-circle"></i>
                <span>Descuentos</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarmetodospago">
                <i className="bi bi-circle"></i>
                <span>Métodos de Pago</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarmodopedido">
                <i className="bi bi-circle"></i>
                <span>Modo Pedido</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrartalonarioSAR">
                <i className="bi bi-circle"></i>
                <span>Correlativo</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarPOS">
                <i className="bi bi-circle"></i>
                <span>POS</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>Inventario</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrararticulos">
                <i className="bi bi-circle"></i>
                <span>Artículos</span>
              </Link>
            </li>

            <li>
              <Link to="/MostrarCentroCosto">
                <i className="bi bi-circle"></i>
                <span>Bodega</span>
              </Link>
            </li>

            <li>
              <Link to="/mostrarmateriales">
                <i className="bi bi-circle"></i>
                <span>Materiales</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarunidadesmedida">
                <i className="bi bi-circle"></i>
                <span>Unidades de Medida</span>
              </Link>
            </li>
            <li>
              <Link to="/crearcompra">
                <i className="bi bi-circle"></i>
                <span>Compras</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsalidamds">
                <i className="bi bi-circle"></i>
                <span>Salida de Mercadería</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Contabilidad</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mostrarcatalogo">
                <i className="bi bi-circle"></i>
                <span>Catalogo de cuentas</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarcategoriacont">
                <i className="bi bi-circle"></i>
                <span>Categoria contable</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrardestino">
                <i className="bi bi-circle"></i>
                <span>Destino de cuenta</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarinformefinanciero">
                <i className="bi bi-circle"></i>
                <span>Informe Financiero</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibromayor">
                <i className="bi bi-circle"></i>
                <span>Libro Mayor</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarsubcuenta">
                <i className="bi bi-circle"></i>
                <span>SubCuentas</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarestado">
                <i className="bi bi-circle"></i>
                <span>Estado Libro Diario</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibrodetalle">
                <i className="bi bi-circle"></i>
                <span>Libro Diario Detalle</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarlibroencabezado">
                <i className="bi bi-circle"></i>
                <span>Libro Diario Encabezado</span>
              </Link>
            </li>
            <li>
              <Link to="/mostrarperiodo">
                <i className="bi bi-circle"></i>
                <span>Periodo Contable</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            to="#"
          >
            <i className="bi bi-graph-up-arrow"></i>
            <span>Reportes</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="charts-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/reporte-venta-resumen">
                <i className="bi bi-circle"></i>
                <span>Resumen de Ventas</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 2</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 3</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 4</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 5</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 6</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 7</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
