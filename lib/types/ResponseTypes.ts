import type {AxiosResponse} from 'axios';
import type {ArticleModel, UserModel} from './ModelTypes';

export interface Links {
    first: string;
    last: string;
    next: string;
    prev: string;
}

export interface Meta {
    current_page: number;
    cursor: number | null;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    links: { active: boolean; label: string; url: string | null }[];
    total: number | null;
}

export interface PostsResponse extends AxiosResponse {
    posts: ArticleModel[];
    links: Links;
    meta: Meta;

    [key: string]: any;
}

export interface UsersResponse extends AxiosResponse {
    users: UserModel[];
    links: Links;
    meta: Meta;

    [key: string]: any;
}

export interface PostsSlugsResponse extends AxiosResponse {
    params: { slug: string };
}

export interface CursorPaginationResponse {
    articles: ArticleModel[],
    links: Links,
    meta: Meta
}