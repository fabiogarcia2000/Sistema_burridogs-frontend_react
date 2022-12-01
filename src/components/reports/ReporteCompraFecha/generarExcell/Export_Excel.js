import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
   //Encabezado de las columnas
   const encabezado = ["FECHA", "BODEGA", "CODIGO", "TIPO", "DESCRIPCIÓN", "MONTO IMPUESTO", "MONTO TOTAL","ESTADO", "FACTURA", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];
   
   //Registros de la tabla
   const datos = data.map(elt=> [elt.fecha,elt.cod_centro_costo,elt.cod_socio_negocio,elt.referencia,elt.descripcion_centro_costo,elt.monto_impuesto_total,elt.monto_total,elt.descripcion_estado, elt.referencia, elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
       
  
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Reporte de Compras por Fecha",
    sheet: "Reporte de Compras por Fecha",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};