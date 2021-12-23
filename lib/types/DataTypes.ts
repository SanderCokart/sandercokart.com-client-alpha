import type {MouseEvent, MutableRefObject} from 'react';
import type {FontAwesomeIcon} from './CustomTypes';

export type NavigationType = Array<NavigationContainer | NavigationItem>;

interface NavigationItem {
    name: string;
    icon: FontAwesomeIcon;
    href: string;
    type: 'item';
    onClick: () => void;
}

interface NavigationContainer {
    type: 'container';
    name: string;
    icon: FontAwesomeIcon;
    children: NavigationChildren;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    ref: MutableRefObject<HTMLButtonElement | null>;
}

export type NavigationChildren = Array<NavigationItem | NavigationContainer>;