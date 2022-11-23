import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["ARTICULO", "MATERIAL", "CANTIDAD", "COMENTARIO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  const datos = data.map(elt=> [elt.id_articulo_padre, elt.id_articulo_hijo, elt.cantidad, elt.comentario, elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Materiales",
    sheet: "Materiales",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
