import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  const encabezado = ["CODIGO", "DESCRIPCION", "DIRECCION", "TELEFONO", "RTN", "CENTRO DE COSTO", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

  //Se establecen los campos que se desean exportar
  const datos = data.map(elt=> [elt.cod_sucursal, elt.descripcion, elt.direccion, elt.telefono, elt.rtn, elt.id_centro_costo, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Sucursal",
    sheet: "Sucursal",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};