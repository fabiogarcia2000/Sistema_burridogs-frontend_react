import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  //Encabezado de las columnas
  const encabezado = [
    [
      "CÓDIGO ART",
      "DESCRIPCION",
      "CODIGO",
      "CENTRO DE COSTO",
      "EN MANO",
      "CANT MIN",
      "CANT MAX",
    ],
  ];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [
    elt.cod_articulo,
    elt.descripcion_articulo,
    elt.cod_centro_costo,
    elt.descripcion_centro_costo,
    elt.en_mano,
    elt.inventario_minimo,
    elt.inventario_maximo,
  ]);

  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Artic_Bdg",
    sheet: "Articulos por Bodega",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
}
