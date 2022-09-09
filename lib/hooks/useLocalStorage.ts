import React, {useDebugValue, useEffect, useState} from 'react';

export const useLocalStorage = <State>
(key: string, initialState?: State | (() => State)): [State, React.Dispatch<React.SetStateAction<State>>] => {
    const [state, setState] = useState<State>(initialState as State);
    useDebugValue(state);

    useEffect(() => {
        const item = localStorage.getItem(key);
        if (item) setState(parse(item));
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useLocalStorage;