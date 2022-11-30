// obtener la fecha formato largo
export function getCurrentDate () {
    // crea un nuevo objeto `Date`
   const currentDate = new Date(),
   options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
   var data = currentDate.toLocaleDateString('es', options)
   return data;
 }

 // obtener la fecha formato corto
export function getCurrentDateShort () {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var data = `${year}-${month}-${day}`;
 return data;
}
 
  
 // obtener la hora
 export function getCurrentTime () {
   // crea un nuevo objeto `Date`
   var today = new Date();
   var now = today.toLocaleTimeString('en-US');
   return now;
 };
  
 setInterval(getCurrentTime, 1000)
 