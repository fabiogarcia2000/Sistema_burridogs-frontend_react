import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
  
  //Encabezado de las columnas
  //const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO"];
  const encabezado = ["ID SUBCUENTA", "NOMBRE CUENTA", "NOMBRE SUBCUENTA", "SALDO"];

  //Se establecen los campos que se desean exportar
  //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
  const datos = data.map(elt=> [elt.id_subcuenta, elt.nombre_cuenta, elt.nombre_subcuenta, elt.saldo]);
    
  //Se genera el archivo de Excel
  downloadExcel({
    fileName: "Subcuentas",
    sheet: "Subcuentas",
    tablePayload: {
      header: encabezado,
      body: datos,
    },
  });
};
