import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import {PostsResponse} from '@/types/ResponseTypes';
import {useEffect, useState} from 'react';
import useSWR from 'swr';

const UsePosts = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const { isAdmin } = useAuth({ middleware: 'auth' });
    const { data, error, mutate } = useSWR<PostsResponse>(isAdmin ? `/posts?page=${pageIndex}` : null);
    const { posts = [], links = [], meta = [] } = data || { posts: [], links: [], meta: [] };

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
        await axios.simpleDelete(`/posts/${id}`);
        mutate(currentValue => {
            if (currentValue) return { ...currentValue, posts: posts.filter(user => user.id !== id) };
        });
    };

    const onEdit = async (id: number) => {
        await axios.simplePatch(`/users/${id}`);
    };

    return {
        posts,
        isLoading: !error && !data,
        nextPage,
        prevPage,
        hasMore,
        hasLess,
        onDelete,
        onEdit
    };
};

export default UsePosts;