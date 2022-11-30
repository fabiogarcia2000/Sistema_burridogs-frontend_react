import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID","ROL","OBJETO","PERMISO DE INSERCIÓN","PERMISO DE ELIMINACIÓN","PERMISO DE ACTUALIZACIÓN","PERMISO DE CONSULTA"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_permiso, elt.rol, elt.objeto, elt.permiso_insercion, elt.permiso_eliminacion, elt.permiso_actualizacion, elt.permiso_consultar]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Permisos",
    sheet: "Permisos",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
