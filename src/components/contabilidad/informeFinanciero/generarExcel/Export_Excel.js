import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "INFORME FINANCIERO"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_informe_financiero, elt.descripcion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Informes Financieros",
    sheet: "Informes Financieros",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
