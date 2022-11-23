import axios from "axios";


//petición a api
const urlCliente = "http://190.53.243.69:3001/socio_negocio/getone/"
const getCliente = async (id) => {
  try {
    const res = await axios.get(urlCliente+id);
    return(res.data);
  } catch (error) {
    console.log(error);
  }
};
