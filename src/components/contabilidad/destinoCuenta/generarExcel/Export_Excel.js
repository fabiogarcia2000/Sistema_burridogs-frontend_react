import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "CUENTA","INFORME FINANCIERO"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_destino_cuenta, elt.id_cuenta, elt.id_informe_financiero]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Destinos de Cuenta",
    sheet: "Destinos de Cuenta",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
