import styles from '@/styles/pages/portal/Portal.module.scss';
import {PortalNavItemProps} from '@/types/PropTypes';
import Link from 'next/link';
import type {FC} from 'react';

const Portal: FC = () => {
    return (
        <div className={styles.portal}>
            <Navigation/>
            <main className={styles.main}>

            </main>
        </div>
    );
};

export default Portal;

const NavItem: FC<PortalNavItemProps> = ({ href, text }) => {
    return (
        <li className={styles.navItem}>
            <Link href={href}>
                <a>
                    {text}
                </a>
            </Link>
        </li>
    );
};

const Navigation: FC = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <NavItem href="/portal/users" text="Users"/>
                <NavItem href="/portal/posts" text="Posts"/>
                <NavItem href="/portal/tips" text="Tips"/>
                <NavItem href="/portal/courses" text="Courses"/>
            </ul>
        </nav>
    );
};