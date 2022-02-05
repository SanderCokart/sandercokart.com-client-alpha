import {CursorModelPaginationContext} from '@/types/ContextTypes';
import {CursorPaginatedModels} from '@/types/CustomTypes';
import type {CursorPaginationProviderProps} from '@/types/PropTypes';
import {CursorPaginationResponse} from '@/types/ResponseTypes';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWRInfinite from 'swr/infinite';

const Context = createContext({});
export const useCursorPaginationContext = <T extends CursorPaginatedModels>() => useContext(Context) as CursorModelPaginationContext<T>;


const getKey = (pageIndex: any, previousPageData: any) => {
    return previousPageData ? previousPageData.links.next ? previousPageData.links.next : null : '/articles/posts/recent';
};

const CursorPaginationProvider: FC<CursorPaginationProviderProps> = (props) => {
    const { children, url, middleware, dataKey } = props;
    const { data, error, mutate, size, setSize } = useSWRInfinite<CursorPaginationResponse[]>(getKey);
    const [isLoading, setIsLoading] = useState(true);

    const nextPage = async () => {
        setIsLoading(true);
        await setSize(size => size + 1);
        setIsLoading(false);
    };

    useEffect(() => {
        if (data && !error) {
            setIsLoading(false)
        }
    }, [data, error]);

    return (
        <Context.Provider value={{
            data: data,
            isLoading: isLoading || !error && !data,
            error,
            nextPage
        }}>
            <>
                {children}
            </>
        </Context.Provider>
    );
};

export default CursorPaginationProvider;