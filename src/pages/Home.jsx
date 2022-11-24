import React, { useEffect } from "react";
import logoEmpresa from "../assets/img/logo1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getOneParam } from "../utils/utils";

function Home() {
  var dataPar = JSON.parse(localStorage.getItem("params")) || [];

  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlAPi = urlApiParam.valor;

  let navigate = useNavigate();

  /**
   ** Validando estado de usuario
   * validando estado de usuario para crear cambio de pass
   * */
  const validateUserState = async () => {
    console.log(urlAPi);
    const userdata = JSON.parse(localStorage.getItem("data"));
    let data = {
      fecha: new Date(),
      id_usuario: userdata.data.id || 0,
    };
    fetch(urlAPi + "/ms_registro/validateUserState", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
          return;
        }
        let statusUser = responseJson.object.estado_usuario;
        if (statusUser === 1) {
          console.log("Usuario NUEVO");
          navigate("/recuperacion_preguntas/" + userdata.data.id || 0);
          //navigate("/admin/home");
        }
        if (statusUser === 2) {
          // console.log('USUARIO ACTIVO')
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    //saveLog();
    validateUserState();
  }, []);

  return (
    <div>
      <h1 id="Bienvenido">Bienvenido Al Sistema POS Burridogs</h1>
      {/*<img id="LogoEmpresa" src={logoEmpresa} alt="Logo Empresa" />*/}
    </div>
  );
}

export default Home;

