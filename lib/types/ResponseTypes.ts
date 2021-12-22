import type {AxiosResponse} from 'axios';
import type {Post, User} from './ModelTypes';

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
    posts: Post[];
    links: Links;
    meta: Meta;
}

export interface UsersResponse extends AxiosResponse {
    users: User[];
    links: Links;
    meta: Meta;
}

