import Swal from "sweetalert2";


 function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            
            ctr++;
        });
        result += lineDelimiter;
    });
 console.log('resul',result)
    return result;
}

function downloadCSV(array,titleReport) {
  console.log('Array',array)
  // console.log('Colum Report',columReport)
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
  console.log('csv',csv)
    if (csv == null) return;

    const filename = titleReport+((new Date()).toDateString())+'.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

function toUpperCaseField(word) {
  // let wordReplacer=String(word).replace(/\s/g,'')
  let wordReplacer=String(word)
  return wordReplacer.toUpperCase()
}




function toReplaceSpace(word) {
  return String(word).replace(/\s/g, '')
}



const getOneParam = (objectJson,nameParam) => {
  return objectJson.filter(
    (item) => item.parametro === nameParam,
  )[0] || {};
}

 /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
   const urlAPi="http://localhost:3001"
   const getAllSettingsParams = async () => {
    return fetch(urlAPi + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      
  };


  
  const showAlerts = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "Los cambios se guardaron con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudieron guardar los cambios',
        icon: 'error',
        confirmButtonColor: 'red',
        confirmButtonText: 'Ok'
      })
      break;

      default: break;
    }
  };


  function translateUperCase(key,value) {
    let texto = key[value] || "";
    try {
      key[value] = (String(texto)).toUpperCase() ;
    } catch (error) {
      // key[value] = "";
      console.log(error);
    }
  }
  
  function isSpace(value) {
    var re = /^[ ]*$/
    return re.test(String(value));
  }
  function isText(value) {
    var re = /^[a-zA-Z]*$/
    return re.test(String(value));
  }
  function isTextWhitSpace(value) {
    var re = /^[a-zA-Z ]*$/
    return re.test(String(value));
  }
  function isNumber(value) {
    var re = /^[0-9]*$/
    return re.test(value);
  }
  function isChar(value) {
    var re = /^[!@#$%&*()_+-={};':<>,.?/|]*$/
    return re.test(value);
  }
  function isEmail(value) {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return re.test(value);
  }
  function isRange(value,minValue,maxValue) {
    return ((value.length || " ") >= minValue && (value.length || " ") <= maxValue) ? false:true;
  }
  function isComent(value) {
    var re = /^[a-zA-Z0-9., ]*$/
    return re.test(String(value));
  }



export {
  downloadCSV,
  toUpperCaseField,
  translateUperCase,
  getOneParam,
  getAllSettingsParams,
  toReplaceSpace,
  showAlerts,
  isSpace,
  isText,
  isTextWhitSpace,
  isNumber,
  isChar,
  isRange,
  isEmail,
  isComent,
}