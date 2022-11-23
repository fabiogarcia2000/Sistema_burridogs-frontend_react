// obtener la fecha
export function getCurrentDate () {
    // crea un nuevo objeto `Date`
   const currentDate = new Date(),
   options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
   var data = currentDate.toLocaleDateString('es', options)
   return data;
 }
 
  
 // obtener la hora en la configuración regional
 export function getCurrentTime () {
   // crea un nuevo objeto `Date`
   var today = new Date();
   var now = today.toLocaleTimeString('en-US');
   return now;
 };
  
 setInterval(getCurrentTime, 1000)
 