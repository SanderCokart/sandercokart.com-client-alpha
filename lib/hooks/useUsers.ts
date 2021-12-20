import {UsersResponse} from '@/types/ResponseTypes';
import {useEffect, useState} from 'react';
import useSWR from 'swr';

const UseUsers = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const { data, error } = useSWR<UsersResponse>(`/users?page=${pageIndex}`);
    const { users = [], links = [], meta = [] } = data || { users: [], links: [], meta: [] };

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