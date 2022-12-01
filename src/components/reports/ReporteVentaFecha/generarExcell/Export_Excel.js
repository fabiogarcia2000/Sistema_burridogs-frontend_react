import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["FECHA", "RTN", "SUCURSAL", "NÚMERO DE CUENTA", "CORRELATIVO", "POS", "DESCRIPCION", "VENTA 15%","VENTA 18%","VENDEDOR","VENTAL TOTAL","ESTADO"];
   
  //Registros de la tabla
  const datos = data.map(elt=> [elt.fecha,elt.rtn,elt.cod_sucursal,elt.numero_cuenta,elt.correlativo,elt.cod_pos,elt.descripcion_pos,elt.venta_grabada_15,elt.venta_grabada_18,elt.usuario,elt.venta_total,elt.descripcion_estado]);
  
  
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Reporte de Ventas por Fecha",
    sheet: "Reporte de Ventas por Fecha",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};