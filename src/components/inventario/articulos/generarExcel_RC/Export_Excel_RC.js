import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel_RC(data) {
  //Encabezado de las columnas
  const encabezado = [
    "CODIGO ARTÍCULO",
    "NOMBRE ARTÍCULO",
    "CÓDIGO MATERIAL",
    "NOMBRE MATERIAL",
    "CANTIDAD",
    "COMENTARIO",
  ];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [
    elt.cod_articulo_padre,
    elt.descripcion_articulo_padre,
    elt.cod_articulo_hijo,
    elt.descripcion_articulo_hijo,
    elt.cantidad,
    elt.comentario,
  ]);

  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Receta",
    sheet: "Receta",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
}
