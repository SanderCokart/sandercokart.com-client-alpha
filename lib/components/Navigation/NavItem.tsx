import Link from 'next/link';
import {useRouter} from 'next/router';
import type {ReactNode} from 'react';

import styles from './NavItem.module.scss';


interface NavItemTypeAnchorProps {
    icon: ReactNode;
    text?: string;
    href: string;
}

const NavItem = (props: NavItemTypeAnchorProps) => {
    const router = useRouter();

    return (
        <li className={styles.navItem}>
            <Link href={props.href}>
                <a className={[styles.navItemLink, (router.pathname === props.href && styles.active)].join(' ')}>
                    {props.icon}
                    {props.text}
                </a>
            </Link>
        </li>
    );
};

export default NavItem;