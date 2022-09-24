import type {ReactNode} from 'react';

import type {Middleware} from './CustomTypes';

export interface PaginatedModelProviderProps {
    children: ReactNode;
    middleware?: Middleware;
    resourceDataKey: string;
    url: string;
}

















