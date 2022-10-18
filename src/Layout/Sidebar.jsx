import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "./responseClass";

function Sidebar() {
  const [classSidebar] = useGlobalState("sidebar_class");

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
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
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
            <span>Administración POS</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="otros-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
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
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
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
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
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
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 5</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 6</span>
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
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Reporte 1</span>
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

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            to="/"
          >
            <i className="bi bi-gem"></i>
            <span>Otros</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="icons-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 1</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 2</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bi bi-circle"></i>
                <span>Opción 3</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-heading">Más</li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i class="bi bi-person"></i> <span>Opción 1</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-question-circle"></i> <span>Opción 2</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-envelope"></i> <span>Opción 3</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-card-list"></i> <span>Opción 4</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-box-arrow-in-right"></i> <span>Opción 5</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-dash-circle"></i> <span>Opción 6</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className="bi bi-file-earmark"></i> <span>Opción 7</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
