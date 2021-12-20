import {useApi} from '../providers/ApiProvider';
import {UsersResponse} from '@/types/ResponseTypes';
import {useEffect, useState} from 'react';
import useSWR from 'swr';

const UseUsers = () => {
    const api = useApi();
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const fetcher = (url: string) => api.get(url).then(res => res.data);
    const {
        data,
        error
    } = useSWR<UsersResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${pageIndex}`, fetcher, {
        refreshInterval: 0,
        revalidateOnFocus: false
    });

    useEffect(() => {
        setHasMore(!!data?.links.next);
        setHasLess(!!data?.links.prev);
    }, [data]);


    const users = data?.users || [];
    const links = data?.links || [];
    const meta = data?.meta || [];

    const nextPage = () => {
        setPageIndex(prev => prev + 1);
    };

    const prevPage = () => {
        setPageIndex(prev => prev - 1);
    };

    return {
        users,
        links,
        meta,
        isLoading: !error && !data,
        isError: error,
        nextPage,
        prevPage,
        hasMore,
        hasLess
    };
};

export default UseUsers;