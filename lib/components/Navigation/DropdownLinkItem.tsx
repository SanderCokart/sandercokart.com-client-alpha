import Link from 'next/link';
import {useRouter} from 'next/router';
import type {ReactNode} from 'react';

import styles from './DropdownLinkItem.module.scss';


interface DropdownLinkItemProps {
    href: string;
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const DropdownLinkItem = (props: DropdownLinkItemProps) => {
    const router = useRouter();
    return (
        <li className={styles.dropdownLinkItem}>
            <Link href={props.href}>
                <a className={[styles.dropdownLinkItemAnchor, (router.pathname === props.href && styles.active)].join(' ')}>
                    {props.leftIcon && <div className={styles.leftIcon}>{props.leftIcon}</div>}
                    {props.children}
                    {props.rightIcon && <div className={styles.rightIcon}>{props.rightIcon}</div>}
                </a>
            </Link>
        </li>
    );
};

export default DropdownLinkItem;