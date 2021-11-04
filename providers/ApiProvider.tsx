import type {AxiosError, AxiosInstance, AxiosPromise} from 'axios';
import axios from 'axios';
import type {FC} from 'react';
import {createContext, useContext, useEffect} from 'react';

export const ApiContext = createContext({} as AxiosInstance);

export const useApi = () => useContext(ApiContext);

export const ApiProvider: FC = ({ children }) => {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true
    });

    useEffect(() => {
        axiosInstance.get('/sanctum/csrf-cookie')
            .catch((err) => {
                alert('Could not get CSRF cookie!');
            });
    }, []);

    return (
        <ApiContext.Provider value={axiosInstance}>
            {children}
        </ApiContext.Provider>
    );
};

export const handler = async (promise: AxiosPromise): Promise<{ data: any | null, status: number, error: Error | AxiosError | null }> => {
    try {
        const { data, status } = await promise;
        return { data: status === 200 ? data : null, status, error: null };
    } catch (err) {
        const { response: { status } } = err;
        console.error(err);
        return { data: null, status, error: err };
    }
};


export default ApiProvider;
