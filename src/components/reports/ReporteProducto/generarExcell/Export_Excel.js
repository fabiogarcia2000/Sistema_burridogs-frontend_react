import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
   //Encabezado de las columnas
   const encabezado = ["SUCURSAL", "CATEGORIA", "CODIGO", "DESCRIPCION", "PRECIO", "CANTIDAD", "VENTA NETA","VENTA TOTAL"];
   
   //Registros de la tabla
   const datos = data.map(elt=> [elt.cod_sucursal, elt.categoria, elt.cod_articulo, elt.descripcion, elt.precio, elt.cantidad, elt.venta_neta, elt.venta_total]);
      
  
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Reporte de Ventas por Producto",
    sheet: "Reporte de Ventas por Producto",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};