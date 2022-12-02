import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
    //Encabezado de las columnas
    const encabezado = [["DESCRIPCIÓN", "MONTO"]];
   
    //Registros de la tabla
    const datos = data.map(elt=> [elt.descripcion, elt.monto]);
      
  
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