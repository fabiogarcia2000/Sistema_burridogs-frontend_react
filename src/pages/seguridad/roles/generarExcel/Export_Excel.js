import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "ROL", "DESCRIPCION", "CREADO POR", "FECHA CREACION"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_rol, elt.rol, elt.descripcion, elt.creado_por, elt.fecha_creacion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Roles",
    sheet: "Roles",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
