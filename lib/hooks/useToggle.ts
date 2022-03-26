import {useState} from 'react';

export const useToggle = <T>(initialValue: T, options: [T, T]): readonly [T, () => void] => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => {
        setValue(prev => prev === options[0] ? options[1] : options[0]);
    };

    return [value, toggle];
};


export const useBooleanToggle = (initialValue = false): readonly [boolean, () => void] => {
    return useToggle(initialValue, [true, false]);
};