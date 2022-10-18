import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext({});
export const useTheme = () => useContext(ThemeContext) as {
    theme: 'dark' | 'light' | 'device';
    setTheme: (theme: string) => void;
};

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'device';
        document.documentElement.setAttribute('data-theme', theme);
        setTheme(theme);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const dataAttr = theme === 'device' ? deviceTheme : theme;
        document.documentElement.setAttribute('data-theme', dataAttr);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;