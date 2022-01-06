import {PaginatableModels} from '@/types/CustomTypes';
import {Dispatch, SetStateAction} from 'react';

export interface PaginatedModelContext<T> {
    data: T[];
    isLoading: boolean;
    nextPage: () => void;
    prevPage: () => void;
    hasMore: boolean;
    hasLess: boolean;
}