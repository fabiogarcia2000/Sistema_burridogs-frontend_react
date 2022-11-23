import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa


export function Export_PDF (data) {
    const unit = "pt";
    const size = "Legal"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //Encabezado de las columnas
    const encabezado = [["ARTICULO", "MATERIAL", "CANTIDAD", "COMENTARIO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"]];

    //Se establecen los campos que se desean exportar
    const datos = data.map(elt=> [elt.id_articulo_padre, elt.id_articulo_hijo, elt.cantidad, elt.comentario, elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
   
    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Parametros que se deben obtener
    var sucursal = "Principal";
    var usuario = "jperez"
    var fecha = "22-11-2022"

    var width = doc.internal.pageSize.getWidth() //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 850, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text(["Reporte de Materiales", "Del 1 al 31 de nobiembre de 2022", `Sucursal: ${sucursal}`, `Fecha: ${fecha}`, `Usuario: ${usuario}`], width/2, 30, { align: 'center' });
    doc.autoTable(tabla);

    //Se recorre el documento para encontrar el numero de paginas
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    var i = 0;
    for(i = 0; i < pageCount; i++) { 
      doc.setPage(i); 
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(12);
      doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 10, doc.internal.pageSize.height - 10);
      //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
    }

    //Se guarda el documento
    doc.save("Materiales.pdf")

};