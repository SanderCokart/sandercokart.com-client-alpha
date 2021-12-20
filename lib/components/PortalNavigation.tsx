import styles from '@/styles/components/PortalNavigation.module.scss';
import {PortalNavItemProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {FC} from 'react';

const PortalNavItem: FC<PortalNavItemProps> = ({ href, text }) => {
    return (
        <li className={styles.portalNavItem}>
            <Link href={href}>
                <a>
                    {text}
                </a>
            </Link>
            <ul className={styles.expansion}>
                <li className={styles.expansionItem}>
                    <Link href={`${href}/create`}>
                        <a><FontAwesomeIcon icon="plus"/></a>
                    </Link>
                </li>
            </ul>
        </li>
    );
};

const PortalNavigation: FC = () => {
    return (
        <nav className={styles.portalNav}>
            <ul>
                <PortalNavItem href="/portal/users" text="Users"/>
                <PortalNavItem href="/portal/posts" text="Posts"/>
                <PortalNavItem href="/portal/tips" text="Tips"/>
                <PortalNavItem href="/portal/courses" text="Courses"/>
            </ul>
        </nav>
    );
};

export default PortalNavigation;