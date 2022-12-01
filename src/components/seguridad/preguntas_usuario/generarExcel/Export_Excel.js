import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "USUARIO", "PREGUNTA", "RESPUESTA"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_preguntas_usuario, elt.nombre_usuario, elt.pregunta, elt.respuesta]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Preguntas usuario",
    sheet: "Preguntas usuario",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
