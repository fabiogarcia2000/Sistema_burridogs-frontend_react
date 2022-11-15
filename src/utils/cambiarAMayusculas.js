//función comvertir a mayuscula
export function cambiarAMayusculasDescripcion(valores) {
  try {
    let texto = valores.descripcion;
    valores.descripcion = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

//función comvertir a mayuscula código unidad medida
export function cambiarAMayusculasCodigoUND(valores) {
  try {
    let texto = valores.cod_unidad_medida;
    valores.cod_unidad_medida = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}
//función comvertir a mayuscula código socio
export function cambiarAMayusculasCodigoSocio(valores) {
  try {
    let texto = valores.cod_socio_negocio;
    valores.cod_socio_negocio = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasCAI(valores) {
  try {
    let texto = valores.cai;
    valores.cai = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

export function cambiarAMayusculasDescripcionPOS(valores) {
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

//función convertir a mayuscula descripción articulo
export function cambiarAMayusculasDescripArticulo(valores) {
  try {
    let texto = valores.descripcion_articulo;
    valores.descripcion_articulo = texto.toUpperCase();
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

//función convertir a mayuscula descripción correo
export function cambiarAMayusculasCorreo(valores) {
  try {
    let texto = valores.correo;
    valores.correo = texto.toUpperCase();
  } catch (error) {
    console.log(error);
  }
}

//función convertir a mayuscula
export function cambiarAmayusculasContacto(valores) {
  try {
    let texto = valores.contacto;
    valores.contacto = texto.toUpperCase();
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
  //función convertir a mayuscula descripción corta

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
