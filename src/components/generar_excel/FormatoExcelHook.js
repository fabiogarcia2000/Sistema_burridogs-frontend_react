import React, {useRef} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const FormatoExcelHook = () =>  {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'ArchivoExcel',
        sheet: 'Users'
    })

        return (
            <div>
                <button onClick={onDownload}> Export excel </button>

                 <table  ref={tableRef}>
                  <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Edison</td>
                        <td>Padilla</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Alberto</td>
                        <td>Lopez</td>
                        <td>94</td>
                    </tr>
                  </tbody>
                </table>

            </div>
        );
};

export default FormatoExcelHook;


/*
return (
    <div>
        <button onClick={onDownload}> Export excel </button>

         <table  ref={tableRef}>
          <tbody>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
            </tr>
            <tr>
                <td>Edison</td>
                <td>Padilla</td>
                <td>20</td>
            </tr>
            <tr>
                <td>Alberto</td>
                <td>Lopez</td>
                <td>94</td>
            </tr>
          </tbody>
        </table>

    </div>
);
*/
