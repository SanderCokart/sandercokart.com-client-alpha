import {Property} from 'csstype';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import type {Middleware} from './CustomTypes';
import type {ArticleModel, UserModel} from './ModelTypes';











export interface PaginatedModelProviderProps {
    middleware?: Middleware;
    resourceDataKey: string;
    url: string;
}

















