import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {
    const header = ["ID", "CODIGO", "DESCRIPCION", "ESTADO", "CREADO POR", "FECHA CREACION", "MODIFICADO POR", "FECHA MODIFICACION"];

    downloadExcel({
        fileName: "Descuentos",
        sheet: "Descuentos",
        tablePayload: {
          header,
          body: data,
        },
      });

};
