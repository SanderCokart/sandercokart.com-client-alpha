import type {Dispatch, SetStateAction} from 'react';
import type {KeyedMutator} from 'swr';

import type {CursorPaginatedModels, PaginatedResponses} from '@/types/CustomTypes';
import type {Links, Meta} from '@/types/ResponseTypes';

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
    mutate: KeyedMutator<PaginatedResponses>;
}

export interface CursorModelPaginationContext<T> {
    data: { articles: CursorPaginatedModels[], links: Links, meta: Meta }[];
    isLoading: boolean;
    nextPage: () => void;
    error: Error;
}