//import contenido from "./Contenido";
//import encabezado from "./Encabezado";

import { Link } from "react-router-dom";
import React from "react";
import { downloadExcel } from "react-export-table-to-excel";

import {encabezado, contenido} from "./Datos";

const FormatoExcelMetodo = () => {

  //const header = encabezado;
  //const header = ["Firstname", "Lastname", "Age"];
  /*
  const body = [
    ["Edison", "Padilla", 14],
    ["Cheila", "Rodrigez", 56],
  ];
  */

  /*
   * @description:
   *  also accepts an array of objects; the method (downloadExcel) will take
   *  as order of each column, the order that each property of the object brings with it.
   *  the method(downloadExcel) will only take the value of each property.
   */

  /*
  const body2 = [
    { firstname: "Edison", lastname: "Padilla", age: 14 },
    { firstname: "Cheila", lastname: "Rodrigez", age: 56 },
  ];
  */


  function handleDownloadExcel() {
    downloadExcel({
      fileName: "ArchivoExcel",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: encabezado,
        // accept two different data structures
        body: contenido,
      },
    });
  }

  return (
    <div>
      <Link
        type="button"
        className="btn btn-success"
        title="Exportar a Excel"
        onClick={handleDownloadExcel}
      >
        <i className="fa-solid fa-file-excel"></i>
      </Link>
    </div>
  );
};

export default FormatoExcelMetodo;
