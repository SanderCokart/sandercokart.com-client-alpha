import {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';

export type FontAwesomeIcon = [IconPrefix, IconName] | IconName


export interface CustomApiPromise<T = any> {
    data: T,
    status: number,
    error: unknown[] | null
}