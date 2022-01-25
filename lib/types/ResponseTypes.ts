import type {AxiosResponse} from 'axios';
import type {PostModel, UserModel} from './ModelTypes';

interface Links {
    first: string;
    last: string;
    next: string;
    prev: string;
}

interface Meta {
    current_page: number;
    cursor: number | null;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
}

export interface PostsResponse extends AxiosResponse {
    [key: string]: any;
    posts: PostModel[];
    links: Links;
    meta: Meta;
}

export interface UsersResponse extends AxiosResponse {
    [key: string]: any;
    users: UserModel[];
    links: Links;
    meta: Meta;
}

export interface PostsSlugsResponse extends AxiosResponse {
    params: { slug: string };
}
