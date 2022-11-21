/*
//Descargar PDF
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import FormatoDescargarPDF from './FormatoDescargarPDF';


const MiDocumento = () => (
  <FormatoDescargarPDF />
);



const App = () => (
  <div>
    <button>
    <PDFDownloadLink document={<MiDocumento />} fileName="Documneto.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Cargando PDF...' : 'Descargar PDF'
      }
    </PDFDownloadLink>
    </button>
  </div>
);

export default App;
*/



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