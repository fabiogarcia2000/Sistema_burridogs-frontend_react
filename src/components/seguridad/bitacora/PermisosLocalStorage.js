import { useState, useEffect } from "react";

const objeto = "FORM_CATEGORIA_PDV"

export function PermisosLocalStorage(){

    /*****Obtener y corroborar Permisos*****/
    const [temp, setTemp] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [permitido, setPermitido] = useState(true)

    const Permisos = () =>{
        const newData = temp.filter(
        (item) => item.objeto === objeto
        );
        setPermisos(newData);
    }

    useEffect(() => {
        let data = localStorage.getItem('permisos')
        if(data){
        setTemp(JSON.parse(data))
        }
    }, []);

    useEffect(() => {
        Permisos();
    }, [temp]);

    useEffect(() => {
        if(permisos.length > 0){
        TienePermisos();
        }
    }, [permisos]);

    const TienePermisos = () =>{
        setPermitido(permisos[0].permiso_consultar)
    }
    /*******************/

    let id_objeto = permisos[0].id_objeto;

    return(
        id_objeto
    );
};