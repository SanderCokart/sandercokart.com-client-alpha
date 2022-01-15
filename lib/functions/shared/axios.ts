import type {CustomApiPromise} from '@/types/CustomTypes';
import type {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import axios, {AxiosResponse} from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});


const handler = async (promise: AxiosPromise): Promise<CustomApiPromise> => {
    try {
        const { data, status } = await promise;
        if (status >= 200 && status < 400)
            return { data, status, error: null };
        else
            throw new Error('Something went wrong');
    } catch (error) {
        console.error(error);
        return { data: null, status: error.response.status, error: error };
    }
};

const toExport = {
    ...axiosInstance,
    simpleGet: (url: string, config?: AxiosRequestConfig): Promise<CustomApiPromise> => {
        return handler(axiosInstance.get(url, config));
    },
    simplePost: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise> => {
        return handler(axiosInstance.post(url, data, config));
    },
    simplePut: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise> => {
        return handler(axiosInstance.put(url, data, config));
    },
    simplePatch: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise> => {
        return handler(axiosInstance.patch(url, data, config));
    },
    simpleDelete: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise> => {
        return handler(axiosInstance.delete(url, config));
    }
} as CustomAxiosInstance;

interface CustomAxiosInstance extends AxiosInstance {
    simpleGet<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<CustomApiPromise<T>>;

    simpleDelete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<CustomApiPromise<T>>;

    simplePost<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise<T>>;

    simplePut<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise<T>>;

    simplePatch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiPromise<T>>;
}



export default toExport;