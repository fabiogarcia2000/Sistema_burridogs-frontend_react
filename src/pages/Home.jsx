import React, { useEffect, useState } from "react";
import axios from "axios";
import hello from "../assets/img/hello.png";
import "./home/styles.css";
import { setGlobalState } from "../globalStates/globalStates";
import { useLocation, useNavigate } from "react-router-dom";
import { getOneParam } from "../utils/utils";

const UrlDatosEmpresa = "http://190.53.243.69:3001/empresa/getone/"

function Home() {
  var dataPar = JSON.parse(localStorage.getItem("params")) || [];

  var urlApiParam = getOneParam(dataPar, "URL_API");
  const urlAPi = urlApiParam.valor;

  let navigate = useNavigate();
  console.log(localStorage);
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

  /***********DATOS DE EMPRESA**************/
//procedimineto para obtener los valores de la empresa
useEffect(() => {
  getDatos();
}, []);

//petición a api datos empresa
const getDatos = async () => {
  try {
    const res = await axios.get(UrlDatosEmpresa);
    if(res.status === 200){
      localStorage.setItem("dataEmpresa", JSON.stringify(res.data));
    }
    
  } catch (error) {
    console.log(error);
  }
};


  /***********DATOS DE EMPRESA**************/

  return (
    <div className="container">
      {/**<h1 id="Bienvenido">Bienvenido Al Sistema POS</h1> */}
          <div className="row">
            <div className="col">
                <img src={hello} alt="hello" className="imgHi"/>
            </div>
            <div className="col-sm-10 padre">
              <div className="hijo">
                  <h1 className="h1s"><strong>¡HOLA!</strong></h1>
                  <p className="ps">BIENVENIDO AL PANEL DE ADMINISTRACIÓN</p>
              </div>
            </div>
          </div>
<br />
          <div className="row">
            <div className="container bootstrap snippets bootdey">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                      <div className="panel panel-dark panel-colorful" onClick={()=>{navigate("/admin/login-pos")}} type="button">
                        <div className="panel-body text-center">
                          <p className="text-uppercase mar-btm text-sm"><strong>Punto de Ventas</strong></p>
                          <i className="bi bi-cart3 fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                      <div className="panel panel-danger panel-colorful" onClick={()=>{navigate("/admin/panelcompras")}} type="button">
                        <div className="panel-body text-center">
                          <p className="text-uppercase mar-btm text-sm"><strong>Compras</strong></p>
                          <i className="bi bi-bag-plus fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                      <div className="panel panel-primary panel-colorful" onClick={()=>{navigate("/admin/mostrarlibromayor")}} type="button">
                        <div className="panel-body text-center">
                          <p className="text-uppercase mar-btm text-sm"><strong>Libro Mayor</strong></p>
                          <i className="bi bi-coin fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                      <div className="panel panel-info panel-colorful" onClick={()=>{navigate("/admin/mostrarlibroencabezado")}} type="button">
                        <div className="panel-body text-center">
                          <p className="text-uppercase mar-btm text-sm"><strong>Libro Diario</strong></p>
                          <i className="bi bi-journal-plus fs-1"></i>
                        </div>
                      </div>
                    </div>    
              </div>
            </div>
          </div>

      
    </div>
  );
}

export default Home;
