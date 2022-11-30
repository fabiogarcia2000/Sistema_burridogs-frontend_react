import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID PERIODO", "DESCRIPCIÓN", "FECHA INICIAL", "FECHA FINAL", "NOMBRE USUARIO", "FECHA CREACIÓN"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_periodo_contable, elt.descripcion_periodo, elt.fecha_inicial, elt.fecha_final, elt.nombre_usuario, elt.fecha_creacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Periodos Contables",
    sheet: "Periodos Contables",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
