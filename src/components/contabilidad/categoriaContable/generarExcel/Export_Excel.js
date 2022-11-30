import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "CATEGORIA"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_categoria  , elt.nombre_categoria]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Categorías de Cuentas",
    sheet: "Categorías de Cuentas",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
