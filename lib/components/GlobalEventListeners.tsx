import {dropdownHandler} from '@/functions/client/dropdownHandler';
import type {FC} from 'react';
import {useEffect} from 'react';

const GlobalEventListeners: FC = () => {

    useEffect(() => {
        document.addEventListener('click', dropdownHandler);
        return () => {
            document.removeEventListener('click', dropdownHandler);
        };
    }, []);
    return null;
};

export default GlobalEventListeners;