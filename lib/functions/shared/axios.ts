import type {CustomApiResponse} from '@/types/CustomTypes';
import type {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import axios from 'axios';
import {toast} from 'react-toastify';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const handler = async (promise: AxiosPromise): Promise<CustomApiResponse> => {
    try {
        const { data, status } = await promise;
        if (data.message) toast.success(data.message, {
            autoClose: 5000,
            closeButton: true,
            position: 'bottom-center'
        });
        return { data, status, error: null, type: 'success' };
    } catch (error) {
        /*form errors*/
        if (error?.response?.data?.errors) return {
            data: null,
            status: error.response.status,
            errors: error.response.data.errors,
            type: 'form'
        };

        if (error?.response?.data?.message || error?.response?.data) {
            toast.error(error.response.data.message || error.response.data, {
                autoClose: 5000,
                closeButton: true,
                position: 'bottom-center'
            });
            return {
                data: null,
                status: error.response.status,
                error: error.response.data?.message || error.response.data,
                type: 'string'
            };
        }

        toast.error(error.message, {
            autoClose: 5000,
            closeButton: true,
            position: 'bottom-center'
        });
        return { data: null, status: 400, error: error.message, type: 'default' };
    }
};

const toExport = {
    ...axiosInstance,
    simpleGet: (url: string, config?: AxiosRequestConfig): Promise<CustomApiResponse> => {
        return handler(axiosInstance.get(url, config));
    },
    simplePost: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiResponse> => {
        return handler(axiosInstance.post(url, data, config));
    },
    simplePut: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiResponse> => {
        return handler(axiosInstance.put(url, data, config));
    },
    simplePatch: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiResponse> => {
        return handler(axiosInstance.patch(url, data, config));
    },
    simpleDelete: (url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomApiResponse> => {
        return handler(axiosInstance.delete(url, config));
    }
} as CustomAxiosInstance;

interface CustomAxiosInstance extends AxiosInstance {
    simpleGet<DATA = any, RESPONSE = CustomApiResponse<DATA>>(url: string, config?: AxiosRequestConfig): Promise<RESPONSE>;

    simpleDelete<DATA = any, RESPONSE = CustomApiResponse<DATA>>(url: string, config?: AxiosRequestConfig): Promise<RESPONSE>;

    simplePost<DATA = any, RESPONSE = CustomApiResponse<DATA>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<RESPONSE>;

    simplePut<DATA = any, RESPONSE = CustomApiResponse<DATA>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<RESPONSE>;

    simplePatch<DATA = any, RESPONSE = CustomApiResponse<DATA>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<RESPONSE>;
}


export default toExport;