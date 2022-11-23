import { downloadExcel } from "react-export-table-to-excel";

export function Export_Excel(data) {

    const header = ["ID_CORRELATIVO",	"ID_POS	CAI	SUCURSAL_SAR",	"TERMINAL_SAR",	"TIPO_DOCUMENTO_SAR",	"CORRELATIVO_INICIAL",	"CORRELATIVO_FINAL",	"CORRELATIVO_ACTUAL",	"FECHA_VENCIMIENTO",	"ACTIVO",	"SIGUIENTE",	"CREADO_POR",	"FECHA_CREACION",	"MODIFICADO_POR",	"FECHA_MODIFICACION"];

    downloadExcel({
        fileName: "Correlativo",
        sheet: "Correlativo",
        tablePayload: {
          header,
          body: data,
        },
      });

};
