import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["CODIGO", "DESCRIPCION", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Registros de la tabla
  const datos = data.map(elt=> [elt.cod_modo_pedido, elt.descripcion, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);

  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Modo de Pedido",
    sheet: "Modo de Pedido",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
