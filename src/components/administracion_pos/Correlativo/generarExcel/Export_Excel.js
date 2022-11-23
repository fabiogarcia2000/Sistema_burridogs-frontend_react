import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID CORRELATIVO",	"ID POS",	"CAI",	"SUCURSAL SAR",	"TERMINAL SAR",	"TIPO DOCUMENTO SAR",	"CORRELATIVO INICIAL",	"CORRELATIVO FINAL",	"CORRELATIVO ACTUAL",	"FECHA VENCIMIENTO", "ESTADO", "SIGUIENTE", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  //const datos = data.map(elt=> [elt.cod_categoria, elt.descripcion, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
  const datos = data.map(elt=> [elt.id_correlativo, elt.id_pos, elt.cai, elt.sucursal_sar, elt.terminal_sar, elt.tipo_documento_sar, elt.correlativo_inicial, elt.correlativo_final, elt.correlativo_actual, elt.fecha_vencimiento, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), (elt.siguiente === "1" ? "SI" : "NO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);

  
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Correlativos",
    sheet: "Correlativos",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
