import { createGlobalState } from "react-hooks-global-state";


export const { setGlobalState, useGlobalState } = createGlobalState({
    sidebar_class: 'sidebar',
    main_class: 'main',
    footer_class:'footer',
    registroEdit: {},
    dataVenta:{},
    datosEmpresa:{}
});