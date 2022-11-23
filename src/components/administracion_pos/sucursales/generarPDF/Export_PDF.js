import { Link } from "react-router-dom";

import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {encabezado, contenido} from '../../../generar_excel/Datos' //Encabezado y contenido de la tabla
import logo from '../../../generar_pdf/imagen/logo1.png'


class Export_PDF extends React.Component {

    exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    //const marginLeft = 40;
    //const marginRight = 40;
    const doc = new jsPDF(orientation, unit, size);


    const headers = [encabezado];
    const data = contenido.map(elt=> [elt.cod_categoria, elt.depscripcion, elt.activo]);

    //Datos
    let tabla = {
      startY: 100,
      head: headers,
      body: data
    };

    var sucursal = "Principal";
    var usuario = "jperez"
    var fecha = "22-11-2022"

    var width = doc.internal.pageSize.getWidth() //Para centrar el texto




    doc.setFontSize(12);
    doc.addImage(logo, 490, 10, 100, 50); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.text(["Reporte de Categorias", "Del 1 al 31 de nobiembre de 2022", `Sucursal: ${sucursal}`, `Fecha: ${fecha}`, `Usuario: ${usuario}`], width/2, 30, { align: 'center' });
    doc.autoTable(tabla);

    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    var i = 0;
    for(i = 0; i < pageCount; i++) { 
      doc.setPage(i); 
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(12);
      doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 10, doc.internal.pageSize.height - 10);
      //doc.text('Pagina: ' + pageCurrent + ' de ' + pageCount, 210-20, 297-30, null, null);
    }

    doc.save("Documento.pdf")

  }

  render() {
    return (
      <div>
       <Link
          type="button"
          className="btn btn-danger"
          title="Exportar a PDF"
          onClick={() => this.exportPDF()}
        >
          <i className="fa-solid fa-file-pdf"></i>
        </Link>
      </div>
    );
  }
};

/*
    <div>
        <button onClick={() => this.exportPDF()}>Generate Report</button>
      </div>
*/

export default Export_PDF;