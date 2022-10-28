import { createGlobalState } from "react-hooks-global-state";

export const { useGlobalState } = createGlobalState({
    registroEdit: {}
});

//Esto permite guardar los datos a editar de un registro