export const quitarTildes = (texto) => {
    let dato = texto.replace(/á/g, "a");
    dato = dato.replace(/é/g, "e");
    dato = dato.replace(/í/g, "i");
    dato = dato.replace(/ó/g, "o");
    dato = dato.replace(/ú/g, "u");

return dato;
};