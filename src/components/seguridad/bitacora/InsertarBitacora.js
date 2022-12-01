import axios from "axios";
import { IdUsuarioConectado } from "./UsuarioActivo";

//URL API insertar bitacora
const URLInsertarBitacora = "http://190.53.243.69:3001/bitacora/insertar/";

//Funcion para insertar en bitacora con parametros
export function InsertarBitacora(pObjeto, pAccion, pDescripcion) {

  //Valores que se insertan en bitacora
  var valores={
    fecha: new Date(),
    id_usuario: IdUsuarioConectado(),
    id_objeto: pObjeto,
    accion: pAccion,
    descripcion: pDescripcion
  };

  //procedimiento para guardar el nuevo registro en el caso de que no exista
  const registrar = axios.post(`${URLInsertarBitacora}`,valores);

  return(
    registrar
  );
};