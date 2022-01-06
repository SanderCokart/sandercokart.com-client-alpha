import {Post, User} from '@/types/ModelTypes';
import {PostsResponse, UsersResponse} from '@/types/ResponseTypes';
import {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';

export type FontAwesomeIcon = [IconPrefix, IconName] | IconName


export interface CustomApiPromise<T = any> {
    data: T,
    status: number,
    error: unknown[] | null
}

export type PaginatedResponses = UsersResponse | PostsResponse | { [key: string]: any };
export type PaginatableModels = User | Post;