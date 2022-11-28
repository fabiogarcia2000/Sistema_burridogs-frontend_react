import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["SUCURSAL", "FECHA", "NÚMERO DE CUENTA", "VENTA GRABADA 15", "VENTA GRABADA 18", "VENTA EXENTA", "15%", "18%","VENTAL TOTAL","CAI","CORRELATIVO","RTN","NOMBRE DEL CLIENTE","CODIGO DE USUARIO","USUARIO","NOMBRE","POS","DESCRIPCION","ESTADO"];
   
  //Registros de la tabla
  const datos = data.map(elt=> [elt.cod_sucursal,elt.fecha,elt.numero_cuenta,elt.venta_grabada_15,elt.venta_grabada_18,elt.venta_exenta,elt.impuesto_15,elt.impuesto_18,elt.venta_total,elt.cai,elt.correlativo,elt.rtn,elt.nombre_cliente,elt.id_usuario,elt.cod_pos,elt.descripcion_pos,elt.descripcion_estado]);
    
  
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