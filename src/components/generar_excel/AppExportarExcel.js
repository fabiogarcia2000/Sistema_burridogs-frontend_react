//Usando componentes
import FormatoExcelComponente from "./FormatoExcelComponente";
//<FormatoExcelComponente />

//Usando hooks
import FormatoExcelHook from "./FormatoExcelHook";
//<FormatoExcelHook />

//Usando metodos
import FormatoExcelMetodo from "./FormatoExcelMetodo";


function AppExportarExcel() {
  return (
    <div className="App">
      <FormatoExcelHook />
    </div>
  );
}

export default AppExportarExcel;
