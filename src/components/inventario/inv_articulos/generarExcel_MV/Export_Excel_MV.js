import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel_MV(data) {
  //Encabezado de las columnas
  const encabezado = [["FECHA", "TIPO", "CANTIDAD"]];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [elt.fecha, elt.tipo, elt.cantidad]);

  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Artic_BdgMov",
    sheet: "Movmnto de Artic",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
}
