import axios from "axios";
import { setGlobalState } from "../../../globalStates/globalStates";

//procedimineto para insertar la venta
const urlCompra = "http://190.53.243.69:3001/compras/insertar/";
export const InsertCompra = async (valores) => {
  console.log("valores a enviar");
  console.log(valores);
  try {
    const res = await axios.post(urlCompra, valores);
    console.log("Data Respuesta");
    console.log(res.data);
    setGlobalState("dataCompra", res.data);
  } catch (error) {
    console.log(error);
    setGlobalState("dataCompra", {});
  }
};
