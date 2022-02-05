import {useAuth} from '@/providers/AuthProvider';
import {PaginatedModelContext} from '@/types/ContextTypes';
import type {PaginatedModels, PaginatedResponses} from '@/types/CustomTypes';
import type {PaginatedModelProviderProps} from '@/types/PropTypes';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';

const Context = createContext({});
export const usePaginatedContext = <T extends PaginatedModels>() => useContext(Context) as PaginatedModelContext<T>;


const PaginatedModelProvider: FC<PaginatedModelProviderProps> = ({ children, modelName, url, middleware = 'auth' }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const { isAdmin } = useAuth({ middleware });
    const { data, error, mutate } = useSWR<PaginatedResponses>(isAdmin ? `${url}?page=${pageIndex}` : null);
    const { [modelName]: modelData = [], links = [], meta = [] } = data || { modelData: [], links: [], meta: [] };

    useEffect(() => {
        setHasMore(!!data?.links.next);
        setHasLess(!!data?.links.prev);
    }, [data]);


    const nextPage = () => {
        setPageIndex(prev => prev + 1);
    };

    const prevPage = () => {
        setPageIndex(prev => prev - 1);
    };

    return (
        <Context.Provider value={{
            data: modelData,
            links,
            meta,
            isLoading: !error && !data,
            error,
            nextPage,
            prevPage,
            setPageIndex,
            hasMore,
            hasLess
        }}>
            {children}
        </Context.Provider>
    );
};

export default PaginatedModelProvider;