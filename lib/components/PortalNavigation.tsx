import Input from '@/components/formComponents/Input';
import styles from '@/styles/components/PortalNavigation.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {useState} from 'react';
import useSWR from 'swr';
import type {ArticleType} from '@/types/ModelTypes';

const PortalNavigation = () => {
    const [search, setSearch] = useState('');
    const { data: articleTypes } = useSWR<ArticleType[]>('/articleTypes');

    const models = [
        { href: '/portal/users', text: 'users' },
        { href: '/portal/articles/thoughts', text: 'thoughts' }
    ];

    //for each articleType
    articleTypes?.forEach(articleType => {
        models.push({ href: `/portal/articles/${articleType.name}`, text: articleType.name });
    });


    return (
        <nav className={styles.portalNav}>
            <Input placeholder="Search" prependIcon={{ icon: 'search' }} type="search" value={search}
                   onChange={(e) => setSearch(e.target.value)}/>

            <ul className={styles.linkList}>
                {models.map((model) => {
                    if (model.text.includes(search.toLowerCase())) {
                        return (
                            <PortalNavItem key={model.text} href={model.href} text={model.text}/>
                        );
                    }
                })}
            </ul>
        </nav>
    );
};

interface PortalNavItemProps {
    href: string;
    text: string;
}

const PortalNavItem = ({ href, text }: PortalNavItemProps) => {
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