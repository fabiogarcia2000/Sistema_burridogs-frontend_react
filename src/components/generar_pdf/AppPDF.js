import { Link } from "react-router-dom";

/*
//Descargar PDF
import { PDFDownloadLink } from '@react-pdf/renderer';
import FormatoDescargarPDF from './FormatoDescargarPDF';


const MiDocumento = () => (
  <FormatoDescargarPDF />
);



const AppPDF = () => (
  <div>
      <PDFDownloadLink 
        to="/"
        type="button"
        className="btn btn-danger"
        title="Exportar a PDF"
        document={<MiDocumento />} fileName="Documento.pdf">
          <i className="fa-solid fa-file-pdf"></i>
      </PDFDownloadLink>
  </div>
);


export default AppPDF;
*/



/*
//Ver PDF
import FormatoVerPDF from "./FormatoVerPDF";

function AppPDF() {
  return (
    <div className="AppPDF">
        <FormatoVerPDF />
    </div>
  );
}

export default AppPDF;
*/





//Descargar Tabla a PDF
import FormatoTablaPDF from "./FormatoTablaPDF";

function AppPDF() {
  return (
    <div className="AppPDF">
        <FormatoTablaPDF />
    </div>
  );
};

export default AppPDF;
