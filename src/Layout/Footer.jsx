import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../globalStates/globalStates";

function Footer() {
  const [footer_class] = useGlobalState("footer_class");
  return (
    <footer id="footer" className={footer_class}>
      <div className="copyright">
        &copy; Copyright
        <strong>
          <span> BURRIDOGS</span>
        </strong>
        . Todos los derechos reservados
      </div>
      <div className="credits">
        Sistema creado por: 
        <Link to=""> Enigma y The Fifth System</Link>
      </div>
    </footer>
  );
}

export default Footer;
