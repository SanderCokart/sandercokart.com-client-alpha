import {useAuth} from '@/providers/AuthProvider';
import {PaginatedModelContext} from '@/types/ContextTypes';
import type {PaginatableModels, PaginatedResponses} from '@/types/CustomTypes';
import type {PaginatedModelProviderProps} from '@/types/PropTypes';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';

const Context = createContext({});
export const usePaginatedContext = <T extends PaginatableModels>() => useContext(Context) as PaginatedModelContext<T>;


const PaginatedModelProvider: FC<PaginatedModelProviderProps> = ({ children, model, middleware = 'auth' }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const { isAdmin } = useAuth({ middleware });
    const { data, error, mutate } = useSWR<PaginatedResponses>(isAdmin ? `/${model}?page=${pageIndex}` : null);
    const { [model]: modelData = [], links = [], meta = [] } = data || { modelData: [], links: [], meta: [] };

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
            isError: error,
            nextPage,
            prevPage,
            hasMore,
            hasLess,
        }}>
            {children}
        </Context.Provider>
    );
};

export default PaginatedModelProvider;