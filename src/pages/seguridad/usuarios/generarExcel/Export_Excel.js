import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "USUARIO","NOMBRE","ESTADO", "ROL", "FECHA DE VENCIMIENTO","CORREO"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_usuario, elt.usuario, elt.nombre_usuario, elt.descripcion, elt.rol, elt.fecha_vencimiento, elt.correo_electronico]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Usuarios",
    sheet: "Usuarios",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
