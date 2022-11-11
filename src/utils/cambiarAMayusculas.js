//función comvertir a mayuscula
export function cambiarAMayusculasDescripcion(valores) {
  try {
    let texto = valores.descripcion;
    valores.descripcion = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

//función convertir a mayuscula descripción corta
export function cambiarAMayusculasDescripCorta(valores) {
  try {
    let texto = valores.descripcion_corta;
    valores.descripcion_corta = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasDirección(valores) {
  try {
    let texto = valores.direccion;
    valores.direccion = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}
