import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["CODIGO", "TIPO", "DESCRIPCION", "DESCRIPCION CORTA", "IMPUESTO", "CATEGORIA", "PRECIO", "UNIDAD VENTA", "SOCIO NEGOCIO", "UNIDAD COMPRA", "CODIGO BARRA", "UNIDAD MEDIDA", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  const datos = data.map(elt=> [elt.cod_articulo, elt.tipo, elt.descripcion, elt.descripcion_corta, elt.id_impuesto, elt.id_categoria, elt.precio, elt.id_unidad_venta, elt.id_socio_negocio, elt.id_unidad_compra, elt.codigo_barra, elt.id_unidad_medida, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Articulo",
    sheet: "Articulo",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
