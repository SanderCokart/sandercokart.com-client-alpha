import {createContext, useContext, Dispatch, SetStateAction} from 'react';

export const DropdownMenuContext = createContext({});
export const useDropdownMenu = () => useContext(DropdownMenuContext) as {
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
    initialMenu: string;
    setMenuHeight: Dispatch<SetStateAction<number>>;
};