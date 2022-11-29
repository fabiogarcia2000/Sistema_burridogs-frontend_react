import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';

export function Export_PDF (data,data2,data3, data4, data5, data6) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = [["CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO", "TOTAL"]];
    //const encabezadoActivo = [["ACTIVOS"]];
    //Registros de la tabla
    const datos = data.map(elt=> [elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo, elt.sumtotal]);
    
    //Tabla
    const tabla = {
      theme: 'striped', // 'striped', 'grid' or 'plain'
      startY: 100,
      head: encabezado,
      //head: encabezadoActivo,
      body: datos
    };
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado2 = [["CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
   
    //Registros de la tabla
    const datos2 = data2.map(elt=> [elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo]);

    //Tabla #2
    const tabla2 = {
      theme: 'striped',
      startY: 50,
      head: encabezado2,
      body: datos2
    };

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado3 = [["CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
   
    //Registros de la tabla
    const datos3 = data3.map(elt=> [elt.nombre_cuenta, elt.nombre_subcuenta, elt.descripcion, elt.saldo]);

    //Tabla #3
    const tabla3 = {
      theme: 'striped',
      startY: 100,
      head: encabezado3,
      body: datos3
    };

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado4 = [["TOTAL ACTIVOS"]];
   
    //Registros de la tabla
    const datos4 = data4.map(elt=> [elt.sumtotal]);

    //Tabla #4
    const tabla4 = {
      theme: 'striped',
      startY: 550,
      head: encabezado4,
      body: datos4
    };


    const encabezado5 = [["TOTAL PASIVOS"]];
   
    //Registros de la tabla
    const datos5 = data5.map(elt=> [elt.sumtotal_pasivo]);

    //Tabla #5
    const tabla5 = {
      theme: 'striped',
      startY: 350,
      head: encabezado5,
      body: datos5
    };

    const encabezado6 = [["TOTAL PATRIMONIO"]];
   
    //Registros de la tabla
    const datos6 = data6.map(elt=> [elt.sumtotal_patrimonio]);

    //Tabla #6
    const tabla6 = {
      theme: 'striped',
      startY: 180,
      head: encabezado6,
      body: datos6
    };

    //Parametros que se deben obtener
    let empresa = "INVERSIONES TURISTICAS DE COMAYAGUA";
    let reporte = "Balance general";
    let sucursal = "Principal";
    let usuario = "jperez"
    let fecha = getCurrentDateShort(data);
    let hora = getCurrentTime(data);
    //let total = datos4;

    var width = doc.internal.pageSize.getWidth() //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 38, 20, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text([`${empresa}`,`Reporte de ${reporte}`, `Sucursal ${sucursal}`, `Usuario ${usuario}`], width/2, 30, { align: 'center' });
   // doc.text(`ACTIVOS:`);
    doc.autoTable(tabla);
   // doc.addPage();
    doc.autoTable(tabla4);
    //doc.text([`Total activos: `,`${total}`], width/2, 30, { align: 'center' });
    doc.addPage();
    doc.autoTable(tabla2);
    doc.autoTable(tabla5);
    doc.addPage();
    doc.autoTable(tabla3);
    doc.autoTable(tabla6);
    //doc.addPage();
    //doc.text([`Total activos: `,`${total}`], width/2, 30, { align: 'center' });
    

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