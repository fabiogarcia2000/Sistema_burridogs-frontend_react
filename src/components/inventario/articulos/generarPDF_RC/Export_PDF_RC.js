import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCurrentDateShort } from "../../../../utils/fechaYhora";
import { getCurrentTime } from "../../../../utils/fechaYhora";

export function Export_PDF_RC(data) {
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 = DatosEmpresa.logo1;

  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const doc = new jsPDF(orientation, unit, size);

  //Encabezado de las columnas
  const encabezado = [
    [
      "CODIGO ARTÍCULO",
      "NOMBRE ARTÍCULO",
      "CÓDIGO MATERIAL",
      "NOMBRE MATERIAL",
      "CANTIDAD",
      "COMENTARIO",
    ],
  ];

  //Se establecen los campos que se desean exportar
  const datos = data.map((elt) => [
    elt.cod_articulo_padre,
    elt.descripcion_articulo_padre,
    elt.cod_articulo_hijo,
    elt.descripcion_articulo_hijo,
    elt.cantidad,
    elt.comentario,
  ]);

  //Tabla
  const tabla = {
    startY: 100,
    head: encabezado,
    body: datos,
  };

  //Parametros que se deben obtener
  let empresa = DatosEmpresa.descripcion;
  let reporte = "RECETAS";
  let espacio = " ";
  let fecha = getCurrentDateShort(data);
  let hora = getCurrentTime(data);

  var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

  //Preparacion del documento
  doc.setFontSize(14);
  doc.addImage(logo1, 1500, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
  doc.text(
    [`${empresa}`, `${espacio}`, `REPORTE DE ${reporte}`],
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
    doc.text(
      `Fecha y hora: ${fecha}, ${hora}`,
      width - 10,
      doc.internal.pageSize.height - 10,
      { align: "right" }
    );
  }
  //Se guarda el documento
  //doc.save("Categorias.pdf")
  window.open(doc.output("bloburl", "_blank"));
}
