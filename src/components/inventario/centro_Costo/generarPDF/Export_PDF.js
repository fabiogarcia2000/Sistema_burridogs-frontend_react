import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';

export function Export_PDF (data) {
  const DatosEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
  const logo1 =DatosEmpresa.logo1;

    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = [["CODIGO", "DESCRIPCION", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"]];
   
    //Registros de la tabla
    const datos = data.map(elt=> [elt.cod_centro_costo, elt.descripcion, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    
    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "BODEGAS";
    let espacio = " ";
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data);

    var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo1, 650, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`${espacio}`,`REPORTE DE ${reporte}`], width/2, 30, { align: 'center' });
    doc.autoTable(tabla);

    //Se recorre el documento para encontrar el numero de paginas
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    var i = 0;
    for(i = 0; i < pageCount; i++) { 
      doc.setPage(i); 
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(12);
      doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 10, doc.internal.pageSize.height - 10);
      doc.text(`Fecha y hora: ${fecha}, ${hora}`, width - 10, doc.internal.pageSize.height - 10, { align: 'right' });
      //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
    }

    //Se guarda el documento
    //doc.save("Bodega.pdf")
    window.open(doc.output('bloburl', '_blank'));

};