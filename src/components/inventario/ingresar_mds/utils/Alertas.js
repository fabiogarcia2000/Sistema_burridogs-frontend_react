import Swal from "sweetalert2";

    //Alertas de éxito o error
    export const MostrarAlertas = (alerta) => {
    switch (alerta) {
      case "exito":
        Swal.fire({
          title: "¡Guardado!",
          text: "La categoría se creó con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

        case "errorcargar":
            Swal.fire({
              title: "Error al Cargar",
              text: "En este momento no se pueden cargar todos los datos, puede ser por un error de red o con el servidor. Intente más tarde.",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
        break;

      case "agregar":
        Swal.fire({
          text: "Aún no hay artículos en la lista de venta",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });

        break;

      default:
        break;
    }
  };

