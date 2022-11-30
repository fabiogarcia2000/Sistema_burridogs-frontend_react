import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID", "USUARIO","CODIGO DE CUENTA","NOMBRE", "CATEGORIA", "DESTINO"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_cuenta, elt.nombre_usuario, elt.codigo_cuenta, elt.nombre_cuenta, elt.nombre_categoria, elt.descripcion]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Catálogo de Cuentas",
    sheet: "Catálogo de Cuentas",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
