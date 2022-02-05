import Input from '@/components/formComponents/Input';
import styles from '@/styles/components/PortalNavigation.module.scss';
import type {PortalNavItemProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {FC, useState} from 'react';

const PortalNavigation: FC = () => {
    const [search, setSearch] = useState('');

    const models = [
        { href: '/portal/users', text: 'Users' },
        { href: '/portal/articles/posts', text: 'Posts' },
        { href: '/portal/articles/tips', text: 'Tips' },
        { href: '/portal/articles/courses', text: 'Courses' },
        { href: '/portal/articles/thoughts', text: 'Thoughts' }
    ];

    return (
        <nav className={styles.portalNav}>
            <Input placeholder="Search" prependIcon={{ icon: 'search' }} type="search" value={search}
                   onChange={(e) => setSearch(e.target.value)}/>

            <ul className={styles.linkList}>
                {models.map((model) => {
                    if (model.text.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <PortalNavItem key={model.text} href={model.href} text={model.text}/>
                        );
                    }
                })}
            </ul>
        </nav>
    );
};

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

export default PortalNavigation;