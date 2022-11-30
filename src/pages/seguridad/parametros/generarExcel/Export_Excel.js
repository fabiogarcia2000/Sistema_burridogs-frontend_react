import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "PARAMETRO","VALOR","CREADO POR","FECHA DE CREACIÓN","MODIFICADO POR","FECHA DE MODIFICACIÓN"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_parametro, elt.parametro, elt.valor, elt.creado_por, elt. fecha_creacion,elt.modificado_por,elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Parametros",
    sheet: "Parametros",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
