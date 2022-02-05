import {CursorPaginatedModels} from '@/types/CustomTypes';
import type {Links, Meta} from '@/types/ResponseTypes';
import type {Dispatch, SetStateAction} from 'react';

export interface PaginatedModelContext<T> {
    data: T[];
    isLoading: boolean;
    nextPage: () => void;
    prevPage: () => void;
    setPageIndex: (index: number) => Dispatch<SetStateAction<number>>;
    hasMore: boolean;
    hasLess: boolean;
    links: Links;
    meta: Meta;
    error: Error;
}

export interface CursorModelPaginationContext<T> {
    data: { articles: CursorPaginatedModels[], links: Links, meta: Meta }[];
    isLoading: boolean;
    nextPage: () => void;
    error: Error;
}