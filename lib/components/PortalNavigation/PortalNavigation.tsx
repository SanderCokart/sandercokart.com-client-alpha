import Input from '@/components/formComponents/Input/Input';
import styles from '@/styles/components/PortalNavigation.module.scss';
import {useState} from 'react';
import {LinkButton} from '@/components/Button/Button';
import {LocalPortalUsersPageRoute, LocalPortalArticlesPageRoute} from '@/constants/local-routes';

const PortalNavigation = () => {
    const [search, setSearch] = useState('');

    const pages = [
        { href: LocalPortalUsersPageRoute, text: 'users' },
        { href: LocalPortalArticlesPageRoute('posts'), text: 'posts' },
        { href: LocalPortalArticlesPageRoute('courses'), text: 'courses' },
        { href: LocalPortalArticlesPageRoute('tips-&-tutorials'), text: 'tips-&-tutorials' }
    ];

    return (
        <nav className={styles.root}>
            <Input className={styles.search} placeholder="Search" prependIcon={{ icon: 'search' }}
                   type="search"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}/>

            <ul className={styles.list}>
                {pages.filter(page => page.text.includes(search.toLowerCase())).map((page) => {
                        return <PortalNavItem key={page.text} href={page.href} text={page.text}/>;
                    }
                )}
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
        <li className={styles.item}>
            <LinkButton navigationButton href={href}>
                {text}
            </LinkButton>
        </li>
    );
};

export default PortalNavigation;