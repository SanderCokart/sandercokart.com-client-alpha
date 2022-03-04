import type {ArticleModel, UserModel} from '@/types/ModelTypes';
import type {PostsResponse, UsersResponse} from '@/types/ResponseTypes';
import type {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import type {AxiosError} from 'axios';
import type {ReactNode} from 'react';
import {ArticleResponse} from '@/types/ResponseTypes';

export type FontAwesomeIconType = [IconPrefix, IconName] | IconName


export interface CustomApiPromise<T = any> {
    data: T,
    status: number,
    error: CustomAxiosErrorResponse;
}

export type CustomAxiosErrorResponse = AxiosError<{
    message: string;
    errors: {
        [key: string]: [string];
    };
}> | null;

export type PaginatedResponses = UsersResponse | ArticleResponse | { [key: string]: any };
export type PaginatedModels = UserModel | ArticleModel;
export type CursorPaginatedModels = ArticleModel;

export type Middleware = 'auth' | 'guest';

export type WithChildren<T = {}> =
    { children?: ReactNode } & T;