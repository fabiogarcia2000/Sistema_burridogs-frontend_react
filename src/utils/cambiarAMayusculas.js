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

//CONTABILIDAD----------------------------------------------------------------
export function cambiarAMayusculasCodigo(valores) {
  try {
    let texto = valores.codigo_cuenta;
    valores.codigo_cuenta = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasNombreCuenta(valores) {
  try {
    let texto = valores.nombre_cuenta;
    valores.nombre_cuenta = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasNombreCategoria(valores) {
  try {
    let texto = valores.nombre_categoria;
    valores.nombre_categoria = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}
 //SUBCUENTA
 export function cambiarAMayusculasNombreSubcuenta(valores) {
  try {
    let texto = valores.nombre_subcuenta;
    valores.nombre_subcuenta = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

//ESTADO 
export function cambiarAMayusculasTipoEstado(valores) {
  try {
    let texto = valores.tipo_estado;
    valores.tipo_estado = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

//PERIODO CONTABLE
export function cambiarAMayusculasDescripcionPeriodo(valores) {
  try {
    let texto = valores.descripcion_periodo;
    valores.descripcion_periodo = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasNombreUsuario(valores) {
  try {
    let texto = valores.nombre_usuario;
    valores.nombre_usuario = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

