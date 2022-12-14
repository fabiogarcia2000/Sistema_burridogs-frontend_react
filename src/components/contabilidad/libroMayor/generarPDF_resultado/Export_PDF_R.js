import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCurrentDateShort } from "../../../../utils/fechaYhora";
import { getCurrentTime } from "../../../../utils/fechaYhora";

export function Export_PDF_R(data) {
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 = DatosEmpresa.logo1;

  const unit = "pt";
  const size = "Letter"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const doc = new jsPDF(orientation, unit, size);

  //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
  const encabezado = [
    ["ID", "NOMBRE CUENTA", "NOMBRE SUBCUENTA", "CATEGORIA", "SALDO"],
  ];

  //Registros de la tabla
  const datos = data.map((elt) => [
    elt.id_destino_cuenta,
    elt.nombre_cuenta,
    elt.nombre_subcuenta,
    elt.nombre_categoria,
    elt.saldo,
  ]);

  //Tabla
  const tabla = {
    theme: "striped", // 'striped', 'grid' or 'plain'
    startY: 100,
    head: encabezado,
    body: datos,
  };

  const encabezado2 = [["TOTAL NETO"]];

  //Registros de la tabla
  //const datos2 = data2.map((elt) => [elt.total]);

  //Tabla
  //const tabla2 = {
  //theme: "striped", // 'striped', 'grid' or 'plain'
  //startY: 400,
  //head: encabezado2,
  //body: datos2,
  //};

  //Parametros que se deben obtener
  let empresa = DatosEmpresa.descripcion;
  let reporte = "ESTADO DE RESULTADOS";
  let espacio = " ";
  let fecha = getCurrentDateShort(data);
  let hora = getCurrentTime(data);

  var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

  //Preparacion del documento
  doc.setFontSize(12);
  doc.addImage(logo1, 650, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
  doc.text(
    [`${empresa}`, `${espacio}`, `REPORTE DE ${reporte}`],
    width / 2,
    30,
    { align: "center" }
  );
  doc.autoTable(tabla);
  //doc.autoTable(tabla2);

  //Se recorre el documento para encontrar el numero de paginas
  var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  var i = 0;
  for (i = 0; i < pageCount; i++) {
    doc.setPage(i);
    let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
    doc.setFontSize(12);
    doc.text(
      "Pagina: " + pageCurrent + " de " + pageCount,
      10,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Fecha y hora: ${fecha}, ${hora}`,
      width - 10,
      doc.internal.pageSize.height - 10,
      { align: "right" }
    );
    //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
  }

  //Abre el documento en una nueva pestaña
  window.open(URL.createObjectURL(doc.output("blob")), "_blank");
}
