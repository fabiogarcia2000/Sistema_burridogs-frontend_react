import { createGlobalState } from "react-hooks-global-state";


const { setGlobalState, useGlobalState } = createGlobalState({
    sidebar_class: 'sidebar',
    main_class: 'main',
    footer_class:'footer',
});


export { setGlobalState, useGlobalState };