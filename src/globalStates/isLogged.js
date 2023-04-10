import { create } from 'zustand'

export const useLoggedStore = create((set) =>({
    isLogged: false,
    removeIsLogged: (newValue) => set(state =>  ({
        isLogged: newValue
    }))
}))