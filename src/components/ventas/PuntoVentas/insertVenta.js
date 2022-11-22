import axios from "axios";

//procedimineto para insertar la venta
const urlVenta = "http://190.53.243.69:3001/venta/insertar/";
export const InsertVenta = async (valores) => {
  console.log("Data a enviar: ", valores)
  try {
    const res = await axios.post(urlVenta, valores);

      if (res.status === 200) {
        alert("guardado");
      } else {
        alert("error");
      }
    
  } catch (error) {
    console.log(error);

  }
  };