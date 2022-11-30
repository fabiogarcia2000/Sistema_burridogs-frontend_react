import axios from "axios";
import { setGlobalState } from "../../../globalStates/globalStates";

//procedimineto para insertar la venta
const urlVenta = "http://190.53.243.69:3001/venta/insertar/";
export const InsertVenta = async (valores) => {
  console.log("valores a enviar")
  console.log(valores)
  try {
    const res = await axios.post(urlVenta, valores);
    console.log("Data Respuesta")
    console.log(res.data)
    setGlobalState("dataVenta", res.data);
    
  } catch (error) {
    console.log(error);

  }
  };