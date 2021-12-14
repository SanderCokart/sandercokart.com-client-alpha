import {Post} from '@/types/ModelTypes';
import {AxiosResponse} from 'axios';

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

export interface PostsResponse extends AxiosResponse{
    posts: Post[];
    links: Links;
    meta: Meta;
}

