import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
    const header = ["ID", "Código", "Descripción", "Porcentaje", "Estado", "Creado por", "Fecha creado", "Modificado por", "Fecha modificado"];

    downloadExcel({
        fileName: "Descuentos",
        sheet: "Descuentos",
        tablePayload: {
          header,
          body: data,
        },
      });

};
