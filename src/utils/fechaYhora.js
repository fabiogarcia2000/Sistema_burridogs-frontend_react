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
  // crea un nuevo objeto `Date`
  var today = new Date();
 var data = today.toLocaleDateString();
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
 