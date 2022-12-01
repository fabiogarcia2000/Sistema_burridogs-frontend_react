export function UsuarioConectado(){
    //Se obtiene el nombre del usuario conectado al sistema
    const userdata = JSON.parse(localStorage.getItem('data'));
    let nombreUsuario = userdata.data.nameUser;

    return (
        nombreUsuario
    );
};

export function IdUsuarioConectado(){
    //Se obtiene el ID del usuario conectado al sistema
    const userdata = JSON.parse(localStorage.getItem('data'));
    let idUsuario = userdata.data.id;
    
    return (
        idUsuario
    );
};