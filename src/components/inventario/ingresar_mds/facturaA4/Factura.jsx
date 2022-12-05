import React from "react";
import { useGlobalState } from "../../../../globalStates/globalStates";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState, useEffect } from "react";
import { numeroALetras } from "../utils/num_a_letras";

export default function Factura() {
  const [totalDesc, setTotalDesc] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalEnLetras, setTotalEnLetras] = useState("");

  const [compra] = useGlobalState("dataCompra");
  const detalles = compra.detalle;

  //const [DatosEmpresa] = useGlobalState('datosEmpresa');
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 = DatosEmpresa.logo1;

  useEffect(() => {
    setTotalDesc(0);
    setSubTotal(0);
    if (detalles) {
      detalles.map((list) =>
        setTotalDesc(
          (prevValores) => prevValores + parseFloat(list.monto_descuento || 0)
        )
      );

      detalles.map((item) =>
        setSubTotal(
          (prevValores) =>
            prevValores +
            (parseFloat(item.cantidad) * parseFloat(item.precio_unit) -
              (parseFloat(item.monto_descuento) || 0))
        )
      );
    }
  }, [detalles]);

  useEffect(() => {
    setTotalEnLetras(numeroALetras(parseFloat(compra.monto_total || 0)));
  }, [compra]);

  return (
    <div className="print2 text">
      <div className="row">
        <div className="col-7">
          <div className="row">
            <Link to="#" className="d-flex align-items-center">
              <img
                src={`data:image/png;base64,${logo1}`}
                alt="Logo"
                className="imgfactura"
              />
            </Link>
          </div>
          <div className="row">
            <div>
              <strong className="h6 fw-bold">
                {DatosEmpresa.descripcion || "NO HAY NOMBRE DEFINIDO"}
              </strong>
              <br />
              <strong>{"R.T.N.: " + (DatosEmpresa.rtn || "")}</strong>
            </div>
            <div>
              <span>{"DIRECCIÓN: " + (DatosEmpresa.direccion || "")}</span>
              <br />
              <span>{"TEL: " + (DatosEmpresa.telefono || "")}</span>
              <br />
              <span>{"Correo: " + (DatosEmpresa.correo || "")}</span>
              <br />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="row text-center">
            <h5>
              <strong>ORDEN DE COMPRA</strong>
            </h5>
            <h5>
              <strong className="h6 fw-bold">No.</strong>
              <strong>{compra.secuencia_enc || ""}</strong>
            </h5>
          </div>
          <br /> <br />
          <div className="row text-center">
            <h6>{"Fecha: " + (compra.fecha || "")}</h6>
          </div>
        </div>
      </div>
      <br />
      {/* <div className="row">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text color1" id="basic-addon1">
            <strong>PROVEEDOR: </strong>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder=""
            aria-label="Username"
            value={compra.descripcion || ""}
          />
          <span class="input-group-text color1">
            <strong>R.T.N: </strong>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder=""
            aria-label="Server"
            value={compra.rtn || ""}
          />
        </div>
      </div> */}

      <div className="row regul">
        <table class="table table-sm table-bordered border-dark table-responsive">
          <thead class="color1 border-dark">
            <tr>
              <th scope="col">CANT.</th>
              <th scope="col">DESCRIPCIÓN</th>
              <th scope="col">PRECIO UNITARIO</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {detalles &&
              detalles.map((item, i) => (
                <tr key={i}>
                  <td>{item.cantidad}</td>
                  <td>{item.descripcion_articulo}</td>
                  <td>{"L. " + item.precio_unit}</td>
                  <td>
                    {"L. " +
                      (parseFloat(item.precio_unit) *
                        parseFloat(item.cantidad) -
                        (parseFloat(item.monto_descuento) || 0))}
                  </td>
                </tr>
              ))}

            <tr>
              <td className="text-end" colspan="3">
                <strong>SUBTOTAL</strong>
              </td>
              <td>
                <strong>{"L. " + subTotal}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div class="row color1 regul">
            <label className="fw-bolder" for="floatingInputGrid">
              <strong>VALOR EN LETRAS:</strong>
            </label>
            <span className="fw-bolder" for="floatingInputGrid">
              {totalEnLetras || ""}
            </span>
          </div>
          <br />
        </div>

        <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col">
              <table class="table table-sm table-bordered border-dark table-responsive">
                <tbody className="text-end">
                  <tr>
                    <td>I.S.V 15%</td>
                    <td className="color1">
                      {"L. " + (compra.monto_impuesto_total || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>TOTAL A PAGAR L.</strong>
                    </td>
                    <td>
                      <strong>{"L. " + (compra.monto_total || 0)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
