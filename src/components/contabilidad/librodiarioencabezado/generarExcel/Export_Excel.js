import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "PERIODO CONTABLE","ESTADO","FECHA INCIAL", "FECHA FINAL","MONTO DEBE","MONTO HABER"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_libro_diario_enca, elt.id_periodo_contable, elt.tipo_estado, elt.fecha_inicial, elt.fecha_final,elt.monto_debe,elt.monto_haber]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Libro Diario Encabezado",
    sheet: "Libro Diario Encabezado",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
