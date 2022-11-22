import axios from "axios";




//procedimineto para obtener la secuencia det
const urlDet = "http://190.53.243.69:3001/venta/secuencia_det_getone";
export const Det = async () => {
  let det;
    try {
      const res = await axios.get(urlDet);
      det = (res.data.ft_secuencia_det_getone);
      //console.log("dentro de DET" ,res.data.ft_secuencia_det_getone);
    } catch (error) {
      console.log(error);
      alert("error de red")
    }

    return det;
  };

  //procedimineto para obtener la secuencia enc
  const urlEnc = "http://190.53.243.69:3001/venta/secuencia_enc_getone";
export const Enc = async () => {
  let enc;
    try {
      const res = await axios.get(urlEnc);
      enc = (res.data.ft_secuencia_enc_getone);
      //console.log("dentro de ENC" ,enc);
    } catch (error) {
      console.log(error);
      alert("error de red")
    }
    return enc;
  };
