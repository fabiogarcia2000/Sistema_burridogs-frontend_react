import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';


export function Export_PDF (data) {
    const unit = "pt";
    const size = "A2"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //Encabezado
    const encabezado = [["ID CORRELATIVO",	"ID POS",	"CAI",	"SUCURSAL SAR",	"TERMINAL SAR",	"TIPO DOCUMENTO SAR",	"CORRELATIVO INICIAL",	"CORRELATIVO FINAL",	"CORRELATIVO ACTUAL",	"FECHA VENCIMIENTO", "ESTADO", "SIGUIENTE", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"]];

    //Se establecen los campos que se desean exportar
    //const datos = data.map(elt=> [elt.id_categoria, elt.cod_categoria, elt.descripcion, elt.activo]);
    //const datos = data.map(elt=> [elt.cod_categoria, elt.descripcion, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);
    const datos = data.map(elt=> [elt.id_correlativo, elt.id_pos, elt.cai, elt.sucursal_sar, elt.terminal_sar, elt.tipo_documento_sar, elt.correlativo_inicial, elt.correlativo_final, elt.correlativo_actual, elt.fecha_vencimiento, (elt.activo === "1" ? "ACTIVO" : "INACTIVO"), (elt.siguiente === "1" ? "SI" : "NO"), elt.creado_por, elt.fecha_creacion, elt.modificado_por, elt.fecha_modificacion]);


    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "Correlativos";
    let sucursal = "Principal";
    let usuario = "jperez";
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data)

    var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(14);
    doc.addImage(logo, 1500, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`Reporte de ${reporte}`, `Sucursal ${sucursal}`, `Usuario ${usuario}`], width/2, 30, { align: 'center' });
    doc.autoTable(tabla);

    //Se recorre el documento para encontrar el numero de paginas
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    var i = 0;
    for(i = 0; i < pageCount; i++) { 
      doc.setPage(i); 
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(14);
      doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 10, doc.internal.pageSize.height - 10);
      doc.text(`Fecha y hora: ${fecha}, ${hora}`, width - 10, doc.internal.pageSize.height - 10, { align: 'right' });
      //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
    }

    //Se guarda el documento
    doc.save("Correlativos.pdf")

};
