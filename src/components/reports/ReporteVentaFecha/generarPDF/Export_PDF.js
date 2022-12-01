import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';
import { UsuarioConectado } from "../../../seguridad/bitacora/UsuarioActivo";

export function Export_PDF (data, sucursalConectado) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //Encabezado de las columnas
  const encabezado = [["DESCRIPCIÓN", "MONTO"]];
   
  //Registros de la tabla
  const datos = data.map(elt=> [elt.descripcion, elt.monto]);
     
    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "Reporte de Ventas por Cajero";
    let sucursal = sucursalConectado;
    let usuario =  UsuarioConectado();
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data);

    var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 650, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`Reporte de ${reporte}`, `${sucursal}`, `Usuario ${usuario}`], width/2, 30, { align: 'center' });
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
    //doc.save("Reporte de Ventas por Fecha.pdf")
    window.open(doc.output('bloburl', '_blank'));
};