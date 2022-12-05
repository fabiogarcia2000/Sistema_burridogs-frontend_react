import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
  const encabezado = ["FECHA", "CLIENTE", "RTN", "VENTA TOTAL", "FACTURA", "VENDEDOR", "ESTADO"];
   
  //Registros de la tabla
  const datos = data.map(elt=> [elt.fecha, elt.nombre_cliente, elt.rtn, elt.venta_total, elt.correlativo, elt.usuario, elt.descripcion_estado]);
   
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Reporte de Facturas",
    sheet: "Facturas",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
