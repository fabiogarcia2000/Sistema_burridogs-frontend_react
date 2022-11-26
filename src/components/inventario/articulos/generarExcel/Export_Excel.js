import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  //Encabezado de las columnas
  const encabezado = [
    "CODIGO",
    "TIPO",
    "DESCRIPCION",
    "DESCRIPCION CORTA",
    "IMPUESTO",
    "CATEGORIA",
    "PRECIO",
    "CANT. MIN",
    "CANT. MAX",
    "CODIGO BARRA",
    "UNIDAD MEDIDA",
    "ESTADO",
    "CREADO POR",
    "FECHA CREACION",
    "MODIFICADO POR",
    "FECHA MODIFICACION",
  ];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [
    elt.cod_articulo,
    elt.tipo === "V" ? "VENTA" : "INVENTARIO",
    elt.descripcion_articulo,
    elt.descripcion_corta,
    elt.descripcion_impuesto,
    elt.descripcion_categoria,
    elt.precio,
    elt.inventario_minimo,
    elt.inventario_maximo,
    /*elt.id_unidad_venta,
    elt.id_unidad_compra,*/
    elt.codigo_barra,
    elt.descripcion_unidad_medida,
    elt.activo === "1" ? "ACTIVO" : "INACTIVO",
    elt.creado_por,
    elt.fecha_creacion,
    elt.modificado_por,
    elt.fecha_modificacion,
  ]);

  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Articulo",
    sheet: "Articulo",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
}
