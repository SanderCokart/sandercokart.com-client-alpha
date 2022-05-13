import type {Middleware} from './CustomTypes';
import {ReactNode} from 'react';


export interface PaginatedModelProviderProps {
    children: ReactNode;
    middleware?: Middleware;
    resourceDataKey: string;
    url: string;
}

















