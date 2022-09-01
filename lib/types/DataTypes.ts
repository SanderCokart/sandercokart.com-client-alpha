import type {MouseEvent, MutableRefObject} from 'react';

import type {FontAwesomeIconType} from './CustomTypes';

export type NavigationType = Array<NavigationContainer | NavigationItem>;

interface NavigationItem {
    name: string;
    icon: FontAwesomeIconType;
    href: string;
    type: 'item';
    onClick: () => void;
}

interface NavigationContainer {
    type: 'container';
    name: string;
    icon: FontAwesomeIconType;
    children: NavigationChildren;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    ref: MutableRefObject<HTMLButtonElement | null>;
}

export type NavigationChildren = Array<NavigationItem | NavigationContainer>;