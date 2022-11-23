import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["CODIGO", "DESCRIPCION", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.cod_unidad_medida, elt.descripcion, elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Unidad de Medida",
    sheet: "Uidad de Medida",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
