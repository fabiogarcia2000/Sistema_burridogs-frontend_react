import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';

export function Export_PDF (data,data2,data3) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = [["DESTINO CUENTA","CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
    //const encabezadoActivo = [["ACTIVOS"]];
    //Registros de la tabla
    const datos = data.map(elt=> [elt.id_destino_cuenta, elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo]);
    
    //Tabla
    const tabla = {
      theme: 'striped', // 'striped', 'grid' or 'plain'
      startY: 100,
      head: encabezado,
      //head: encabezadoActivo,
      body: datos
    };
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado2 = [["DESTINO CUENTA","CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
   
    //Registros de la tabla
    const datos2 = data2.map(elt=> [elt.id_destino_cuenta, elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo]);

    //Tabla #2
    const tabla2 = {
      theme: 'striped',
      startY: 100,
      head: encabezado2,
      body: datos2
    };

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado3 = [["DESTINO CUENTA","CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
   
    //Registros de la tabla
    const datos3 = data3.map(elt=> [elt.id_destino_cuenta, elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo]);

    //Tabla #3
    const tabla3 = {
      theme: 'striped',
      startY: 100,
      head: encabezado3,
      body: datos3
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "Balance general";
    let sucursal = "Principal";
    let usuario = "jperez"
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data)

    var width = doc.internal.pageSize.getWidth() //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 38, 20, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`Reporte de ${reporte}`, `Sucursal ${sucursal}`, `Usuario ${usuario}`], width/2, 30, { align: 'center' });
    doc.autoTable(tabla);
    doc.addPage();
    doc.autoTable(tabla2);
    doc.addPage();
    doc.autoTable(tabla3);
    

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
    doc.save("Balance general.pdf")

};