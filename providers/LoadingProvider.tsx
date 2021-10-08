import type {FC} from 'react';
import {createContext, useEffect, useState} from 'react';
import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';

interface LoadingContext {
    loading: boolean,
    setLoading: (value: boolean) => void;
}

const LoadingContext = createContext({} as LoadingContext);

const LoadingProvider: FC = ({ children }) => {

    const { loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!authLoading) setLoading(false);
    }, [authLoading]);

    if (loading)
        return <Loader/>;
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;