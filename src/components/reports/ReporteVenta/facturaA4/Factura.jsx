import React from 'react'
import { useGlobalState } from "../../../globalStates/globalStates";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState, useEffect } from 'react';

export default function Factura() {
    const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
    const logo1 =DatosEmpresa.logo1;

    const [totalDesc, setTotalDesc] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const [venta] = useGlobalState('dataVenta')
    const detalles = venta.detalle;


    useEffect(() => {
        setTotalDesc(0)
        setSubTotal(0)
        if(detalles){
            
            detalles.map((list) =>
            setTotalDesc((prevValores) => prevValores + (parseFloat(list.monto_descuento || 0)))
            );

            detalles.map((item) =>
            setSubTotal((prevValores) => prevValores + ((parseFloat(item.cantidad)*parseFloat(item.precio))-(parseFloat(item.monto_descuento)||0)))
            );
        }
    }, [detalles]);
    

  return (
    <div className='print2 text'>
        <div className='row'>
            <div className='col-7'>
                <div className='row'>
                    <Link to="#" className="d-flex align-items-center">
                         <img src={`data:image/png;base64,${logo1}`} alt="Logo Empresa" className="imgfactura"/>
                    </Link>
                </div>
                <div className='row'>
                    <div>
                        <strong className='h6 fw-bold'>{(DatosEmpresa.descripcion || "NO HAY NOMBRE DEFINIDO")}</strong><br />
                        <strong>{"R.T.N.: "+(DatosEmpresa.rtn ||"")}</strong>
                    </div>
                    <div>
                        <span>{"DIRECCIÓN: "+(DatosEmpresa.direccion || "")}</span><br />
                        <span>{"TEL: "+(DatosEmpresa.telefono || "")}</span><br />
                        <span>{"Correo: "+(DatosEmpresa.correo || "")}</span><br />
                        <span>C.A.I.:000000-000000-00000-000000-000000-00</span><br />
                        <strong>RANGO AUTORIZADO DEL: 0000-0000-000-0000000000 AL 0000-0000-000-0000000000 </strong><br />
                        <span>Fecha Limite de Emisión: XX/XX/XXXX</span><br />
                    </div>
                </div>
            </div>

            <div className='col'>
                <div className='row text-center'>
                    <h5><strong>FACTURA</strong></h5>
                    <h5><strong className='h6 fw-bold'>No.</strong>000-001-01-<strong>000000</strong></h5>
                </div>
                <br /> <br />
                <div className='row text-center'>
                    <h6>{"Fecha: "+venta.fecha}</h6>
                </div>
            </div>

        </div>
<br />
        <div className='row'>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text color1" id="basic-addon1"><strong>CLIENTE: </strong></span>
                <input type="text" class="form-control" placeholder="" aria-label="Username" value={(venta.nombre_cliente||"")}/>
                <span class="input-group-text color1"><strong>R.T.N: </strong></span>
                <input type="text" class="form-control" placeholder="" aria-label="Server" value={(venta.rtn||"")}/>
            </div>
        </div>

        <div className='row regul'>
            <table class="table table-sm table-bordered border-dark table-responsive">
                <thead class="color1 border-dark">
                <tr>
                    <th scope="col">CANT.</th>
                    <th scope="col">DESCRIPCIÓN</th>
                    <th scope="col">PRECIO UNITARIO</th>
                    <th scope="col">DESCUENTOS Y REBAJAS OTORGADAS</th>
                    <th scope="col">TOTAL</th>
                </tr>
                </thead>
                <tbody>
                    {detalles && 
                        detalles.map((item, i) =>(
                            <tr key={i}>
                                <td>{item.cantidad}</td>
                                <td>{item.descripcion_articulo}</td>
                                <td>{"L. "+item.precio}</td>
                                <td>{"L. "+(item.monto_descuento ||0)}</td>
                                <td>{"L. "+((parseFloat(item.precio)*parseFloat(item.cantidad))-(parseFloat(item.monto_descuento)||0))}</td>
                             </tr>
                        ))

                    }


                <tr>                    
                    <td  className='text-end' colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>{"L. "+totalDesc}</strong></td>
                    <td><strong>{"L. "+subTotal}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div className='row'>
            <div className='col-md-6'>

                <div class="row color1 regul">
                    <label className='fw-bolder' for="floatingInputGrid">VALOR EN LETRAS:</label>
                    <span className='fw-bolder' for="floatingInputGrid">######### ####### ########## ###########</span>
                </div>
            <br />
                <div className='row regul'>
                    <table class="table table-sm table-bordered border-dark table-responsive">
                    <tbody>
                        <tr>
                            <td>N° Correlativo de orden de compra exenta</td>
                            <td className='color1'>   </td>
                        </tr>
                        <tr>
                            <td>N° Correlativo de constancia de registro exonerado</td>
                            <td className='color1'><span> </span></td>
                        </tr>
                        <tr>
                            <td>N° identificativo del registro de la SAG</td>
                            <td className='color1'>   </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
<br />
                <div className='row'>
                    <div className='col'>
                        <p><strong>ORIGINAL: CLIENTE</strong></p>
                    </div>
                    <div className='col'>
                         <p><strong>COPIA: EMISOR</strong></p>
                    </div>
                </div>

            </div>

            <div className='col-md-2'></div>
            <div className='col-md-4'>
                <div className='row'>
                    
                    <div className='col'>
                        <table class="table table-sm table-bordered border-dark table-responsive">
                            <tbody className='text-end'>
                                <tr>
                                    <td>IMPORTE EXONERADO</td>
                                    <td className='color1'>L. 0.0</td>
                                </tr>
                                <tr>
                                    <td>IMPORTE EXENTO</td>
                                    <td className='color1'>L. 0.0</td>
                                </tr>
                                <tr>
                                    <td>IMPORTE GRAVADO 15%</td>
                                    <td className='color1'>{"L. "+subTotal}</td>
                                </tr>
                                <tr>
                                    <td>IMPORTE GRAVADO 18%</td>
                                    <td className='color1'>L. 0.0</td>
                                </tr>
                                <tr>
                                    <td>I.S.V 15%</td>
                                    <td className='color1'>{"L. "+(subTotal)}</td>
                                </tr>
                                <tr>
                                    <td>I.S.V 18%</td>
                                    <td className='color1'>L. 0.0</td>
                                </tr>
                                <tr>
                                    <td><strong>TOTAL A PAGAR L.</strong></td>
                                    <td><strong>L. 0.0</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
        <br />
        <div className='row'>
            <strong className='text-center'>"GRACIAS POR SU COMPRA"</strong>
            <strong className='text-center'>"LA FACTURA ES BENEFICIO DE TODOS, ¡EXIJALA!"</strong>
        </div>

    </div>
  )
}
