import {debounce} from 'lodash';
import type { ChangeEvent} from 'react';
import {useState, useCallback} from 'react';

const UseColorDebounce = () => {
    const [color, setColor] = useState('#f00505');

    const changeColor = debounce((value: string) => {
        setColor(value);
    }, 200);

    const debounceChangeColor = useCallback((value: string) => changeColor(value), []);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounceChangeColor(e.target.value);
    };
    return { color, setColor, onChange };
};

export default UseColorDebounce;