import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa
import { getCurrentDateShort } from '../../../../utils/fechaYhora';
import { getCurrentTime } from '../../../../utils/fechaYhora';

export function Export_PDF (data,dataActivo,dataPasivo,dataPatrimonio) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = [["DESTINO CUENTA","CUENTA", "SUBCUENTA", "CATEGORIA", "SALDO"]];
    //const encabezadoActivo = [["ACTIVOS"]];
    //Registros de la tabla
    const datos = dataActivo.map(elt1=> [elt1.id_destino_cuenta, elt1.nombre_cuenta, elt1.nombre_subcuenta, elt1.descripcion, elt1.saldo]);
    
    //Tabla
    const tabla = {
      theme: 'striped', // 'striped', 'grid' or 'plain'
      startY: 100,
      head: encabezado,
      //head: encabezadoActivo,
      body: datos
    };
    
    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado2 = [["CUENTA", "DESCRIPCION"]];
   
    //Registros de la tabla
    const datos2 = dataPasivo.map(elt2=> [elt2.nombre_cuenta, elt2.nombre_subcuenta]);

    //Tabla #2
    const tabla2 = {
      theme: 'striped',
      startY: 100,
      head: encabezado2,
      body: datos2
    };

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado3 = [["TABLA 3", "DESCRIPCION"]];
   
    //Registros de la tabla
    const datos3 = dataPatrimonio.map(elt3=> [elt3.id_categoria, elt3.nombre_categoria]);

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
      //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
    }

    //Se guarda el documento
    doc.save("Balance general.pdf")

};