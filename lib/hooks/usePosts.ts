import {useEffect, useState} from 'react';
import useSWR from 'swr';

import axios from '@/functions/shared/axios';

import {useAuth} from '@/providers/AuthProvider';

import {ArticleResponse} from '@/types/ResponseTypes';

const UsePosts = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(false);
    const { isAdmin } = useAuth({ middleware: 'auth' });
    const { data, error, mutate } = useSWR<ArticleResponse>(isAdmin ? `/posts?page=${pageIndex}` : null);
    const { articles = [], links = [], meta = [] } = data || { posts: [], links: [], meta: [] };

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
            if (currentValue) return { ...currentValue, articles: articles.filter(article => article.id !== id) };
        });
    };

    const onEdit = async (id: number) => {
        await axios.simplePatch(`/users/${id}`);
    };

    return {
        articles,
        isLoading: !error && !data,
        nextPage,
        prevPage,
        hasMore,
        hasLess,
        handleDeleteUser: onDelete,
        onEdit
    };
};

export default UsePosts;