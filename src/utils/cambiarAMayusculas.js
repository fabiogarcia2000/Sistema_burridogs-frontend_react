//función comvertir a mayuscula
export function cambiarAMayusculasDescripcion(valores) {
  try {
    let texto = valores.descripcion;
    valores.descripcion = texto.toUpperCase();
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

