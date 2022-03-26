import type {ArticleModel, UserModel} from '@/types/ModelTypes';
import type {ArticleResponse, UsersResponse} from '@/types/ResponseTypes';
import type {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import type {ReactNode} from 'react';

export type FontAwesomeIconType = [IconPrefix, IconName] | IconName


export type CustomApiResponse<DATA = any> = SuccessResponse<DATA> | FormErrorResponse | StringErrorResponse | DefaultErrorResponse;
export type CustomApiPromise<DATA = any> = Promise<SuccessResponse<DATA> | FormErrorResponse | StringErrorResponse | DefaultErrorResponse>;

export interface SuccessResponse<T> {
    data: T;
    error: null;
    status: number;
    type: 'success';
}

export interface FormErrors {
    [key: string]: string[];
};

export interface FormErrorResponse {
    data: null;
    errors: FormErrors;
    status: number;
    type: 'form';
}

export interface StringErrorResponse {
    data: null;
    error: string;
    status: number;
    type: 'string';
}

export interface DefaultErrorResponse {
    data: null;
    error: string;
    status: 400;
    type: 'default';
}

export type PaginatedResponses = UsersResponse | ArticleResponse | { [key: string]: any };
export type PaginatedModels = UserModel | ArticleModel;
export type CursorPaginatedModels = ArticleModel;

export type Middleware = 'auth' | 'guest';

export type WithChildren<T = {}> =
    { children?: ReactNode } & T;