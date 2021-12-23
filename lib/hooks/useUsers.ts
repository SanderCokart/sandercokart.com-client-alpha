import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import {UsersResponse} from '@/types/ResponseTypes';
import {useEffect, useState} from 'react';
import useSWR from 'swr';

const UseUsers = () => {
        const [pageIndex, setPageIndex] = useState(1);
        const [hasMore, setHasMore] = useState(true);
        const [hasLess, setHasLess] = useState(false);
        const { isAdmin } = useAuth({ middleware: 'auth' });
        const { data, error, mutate, isValidating } = useSWR<UsersResponse>(isAdmin ? `/users?page=${pageIndex}` : null);
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

        const onDelete = async (id: number) => {
            await axios.simpleDelete(`/users/${id}`);
            mutate(currentValue => {
                if (currentValue) return { ...currentValue, users: users.filter(user => user.id !== id) };
            });

        };

        const onEdit = async (id: number) => {
            await axios.simplePatch(`/users/${id}`);
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
            hasLess,
            onDelete,
            onEdit
        };
    }
;

export default UseUsers;