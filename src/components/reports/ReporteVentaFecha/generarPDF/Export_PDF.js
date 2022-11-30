import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';

export function Export_PDF (data) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = ["SUCURSAL", "FECHA", "NÚMERO DE CUENTA", "VENTA GRABADA 15", "VENTA GRABADA 18", "VENTA EXENTA", "15%", "18%","VENTAL TOTAL","CAI","CORRELATIVO","RTN","NOMBRE DEL CLIENTE","CODIGO DE USUARIO","USUARIO","NOMBRE","POS","DESCRIPCION","ESTADO"];
 
    //Registros de la tabla
    const datos = data.map(elt=> [elt.cod_sucursal,elt.fecha,elt.numero_cuenta,elt.venta_grabada_15,elt.venta_grabada_18,elt.venta_exenta,elt.impuesto_15,elt.impuesto_18,elt.venta_total,elt.cai,elt.correlativo,elt.rtn,elt.nombre_cliente,elt.id_usuario,elt.cod_pos,elt.descripcion_pos,elt.descripcion_estado]);
     
    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "Reporte de Ventas por Fecha";
    let sucursal = "Principal";
    let usuario = "SYSTEMUSER";
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data);

    var width = doc.internal.pageSize.getWidth(); //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 650, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`Reporte de ${reporte}`, `Sucursal ${sucursal}`, `Usuario ${usuario}`], width/2, 30, { align: 'center' });
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
    doc.save("Reporte de Ventas por Fecha.pdf")

};