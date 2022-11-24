import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './logo1.png' //Logo de la empresa


export function Export_PDF (data) {
    const unit = "pt";
    const size = "Letter"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    //const header = ["ID", "Código", "Descripción", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];
    const encabezado = [["ID", "ESTADO"]];
   
    //Registros de la tabla
    const datos = data.map(elt=> [elt.id_estado, elt.tipo_estado]);
    
    //Tabla
    const tabla = {
      startY: 100,
      head: encabezado,
      body: datos
    };

    //Para mostrar la fecha en formato DD/MM/AAAA
    let date = new Date()
    let dia = `${(date.getDate())}`.padStart(2,'0');
    let mes = `${(date.getMonth()+1)}`.padStart(2,'0');
    let anio = date.getFullYear();

    //Parametros que se deben obtener
    var sucursal = "Principal";
    var usuario = "jperez";
    var fecha = (`${dia}/${mes}/${anio}`);

    var width = doc.internal.pageSize.getWidth() //Para centrar el texto

    //Preparacion del documento
    doc.setFontSize(12);
    doc.addImage(logo, 650, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text(["ESTADOS CONTABLES", `Sucursal: ${sucursal}`, `Fecha: ${fecha}`, `Usuario: ${usuario}`], width/2, 30, { align: 'center' });
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
    doc.save("Estados contables.pdf")

};