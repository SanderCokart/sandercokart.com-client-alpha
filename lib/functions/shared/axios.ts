import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

interface CustomApiPromise {
    data: any | null,
    status: number,
    error: unknown[] | null
}

const handler = async (promise: AxiosPromise): Promise<CustomApiPromise> => {
    try {
        const { data, status } = await promise;
        return { data: status >= 200 && status < 300 ? data : [], status, error: null };
    } catch (error) {
        console.error(error);
        return { data: [], status: error.response.status, error: error };
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
};

export default toExport;