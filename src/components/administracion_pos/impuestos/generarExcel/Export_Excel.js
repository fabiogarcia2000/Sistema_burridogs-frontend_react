import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["CODIGO", "DESCRIPCION", "TIPO", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.cod_impuesto, elt.descripcion, elt.tipo, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Impuestos",
    sheet: "Impuestos",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
