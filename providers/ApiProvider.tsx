import type {AxiosInstance} from 'axios';
import axios from 'axios';
import type {FC} from 'react';
import {createContext, useContext, useEffect} from 'react';

export const ApiContext = createContext({} as AxiosInstance);

export const useApi = () => useContext(ApiContext);

export const ApiProvider: FC = ({children}) => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
  });

  useEffect(() => {
    axiosInstance.get('/sanctum/csrf-cookie')
        .catch(() => {
          alert('Could not get CSRF cookie!');
        });
  }, []);

  return (
      <ApiContext.Provider value={axiosInstance}>
        {children}
      </ApiContext.Provider>
  );
};


export default ApiProvider;
