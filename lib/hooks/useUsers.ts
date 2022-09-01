import {useEffect, useState} from 'react';
import useSWR from 'swr';

import axios from '@/functions/shared/axios';

import {useAuth} from '@/providers/AuthProvider';

import {UserModel} from '@/types/ModelTypes';
import {UsersResponse} from '@/types/ResponseTypes';


const UseUsers = () => {
        const [pageIndex, setPageIndex] = useState(1);
        const [hasMore, setHasMore] = useState(true);
        const [hasLess, setHasLess] = useState(false);
        const [showDeleteModalForUser, setShowDeleteModalForUser] = useState<null | UserModel>(null);
        const { isAdmin } = useAuth({ middleware: 'auth' });
        const { data, error, mutate } = useSWR<UsersResponse>(isAdmin ? `/users?page=${pageIndex}` : null);
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

        const handleDeleteUser = async (userToDelete: UserModel | null) => {
            if (userToDelete) {
                await axios.simpleDelete(`/users/${userToDelete.id}`);
                mutate(currentValue => {
                    if (currentValue) return { ...currentValue, users: users.filter(user => user !== userToDelete) };
                });
            }
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
            handleDeleteUser,
            showDeleteModalForUser,
            setShowDeleteModalForUser
        };
    }
;

export default UseUsers;