import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext({});
export const useTheme = () => useContext(ThemeContext) as {
    theme: string;
    setTheme: (theme: string) => void;
};

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const [theme, setTheme] = useState('device');


    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'device';
        document.documentElement.setAttribute('data-theme', theme);
    }, []);


    useEffect(() => {
        const newTheme = (theme !== 'device')
                         ? theme :
                         (window.matchMedia('(prefers-color-scheme: dark)').matches)
                         ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;