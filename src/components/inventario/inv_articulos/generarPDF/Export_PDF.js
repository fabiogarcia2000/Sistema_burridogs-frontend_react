import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "./logo1.png"; //Logo de la empresa

export function Export_PDF(data) {
  const unit = "pt";
  const size = "A2"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const doc = new jsPDF(orientation, unit, size);

  //Encabezado de las columnas
  const encabezado = [
    [
      "CÓDIGO ART.",
      "DESCRIPCION",
      "CODIGO",
      "CENTRO DE COSTO",
      "EN MANO",
      "CANT. MIN",
      "CANT. MAX",
    ],
  ];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [
    elt.cod_articulo,
    elt.descripcion_articulo,
    elt.cod_centro_costo,
    elt.descripcion_centro_costo,
    elt.en_mano,
    elt.inventario_minimo,
    elt.inventario_maximo,
  ]);

  //Tabla
  const tabla = {
    startY: 100,
    head: encabezado,
    body: datos,
  };

  //Parametros que se deben obtener
  var sucursal = "Principal";
  var usuario = "jperez";
  var fecha = "22-11-2022";

  var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

  //Preparacion del documento
  doc.setFontSize(14);
  doc.addImage(logo, 1500, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
  doc.text(
    [
      "Reporte de Articulos Por Bodega",
      `Sucursal: ${sucursal}`,
      `Fecha: ${fecha}`,
      `Usuario: ${usuario}`,
    ],
    width / 2,
    30,
    { align: "center" }
  );
  doc.autoTable(tabla);

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
    //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
  }

  //Se guarda el documento
  doc.save("Artic_Bdg.pdf");
}
