import {useAuth} from '@/providers/AuthProvider';
import {PaginatedModelContext} from '@/types/ContextTypes';
import type {PaginatedModels, PaginatedResponses} from '@/types/CustomTypes';
import type {PaginatedModelProviderProps} from '@/types/PropTypes';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';
import styles from './PageControls.module.scss';
import {Button} from '@/components/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Context = createContext({});
//----------------------------------------------------------------------------------------------------------------------
export const usePaginatedContext = <T extends PaginatedModels>() => useContext(Context) as PaginatedModelContext<T>;
//----------------------------------------------------------------------------------------------------------------------
const PaginatedModelProvider =
    (props: PaginatedModelProviderProps) => {
        const { children, resourceDataKey, url, middleware = 'auth' } = props;
        const [pageIndex, setPageIndex] = useState(1);
        const [hasMore, setHasMore] = useState(true);
        const [hasLess, setHasLess] = useState(false);
        const { isAdmin } = useAuth({ middleware });
        const { data, error, mutate } = useSWR<PaginatedResponses>(isAdmin ? `${url}?page=${pageIndex}` : null);
        const { [resourceDataKey]: modelData = [], links = [], meta = [] } = data || {
            modelData: [],
            links: [],
            meta: []
        };

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
                hasLess,
                mutate
            }}>
                {children}
            </Context.Provider>
        );
    };
//----------------------------------------------------------------------------------------------------------------------
export const PageControls = () => {
    const { prevPage, setPageIndex, nextPage, hasMore, hasLess, links, meta } = usePaginatedContext();
    return (
        <div className={styles.pageControls}>
            <Button circle disabled={!hasLess} onClick={prevPage}>
                <FontAwesomeIcon icon="arrow-left"/>
            </Button>
            {meta?.links?.slice(1, meta.links.length - 1).map(link => (
                <Button key={link.label}
                        circle
                        disabled={link.active || link.label === '...'}
                        onClick={() => setPageIndex(Number(link.label))}>
                    {link.label}
                </Button>
            ))}
            <Button circle disabled={!hasMore} onClick={nextPage}>
                <FontAwesomeIcon icon="arrow-right"/>
            </Button>
        </div>
    );
};
export default PaginatedModelProvider;