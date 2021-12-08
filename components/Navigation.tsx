import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/components/Navigation.module.scss';
import {NavigationChildren, NavigationType} from '@/types/DataTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {FC, MouseEvent} from 'react';
import {Fragment, useRef} from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const Navigation: FC = () => {
        const { loggedIn } = useAuth();
        const compassNav = useRef<null | HTMLButtonElement>(null);
        const blogNav = useRef<null | HTMLButtonElement>(null);
        const isMobile = useMediaQuery({ from: 'sm', option: 'down' });

        const openCompassNav = () => {
            compassNav.current?.classList.toggle(styles.focus);
        };

        const openBlogNav = () => {
            blogNav.current?.classList.toggle(styles.focus);
            compassNav.current?.classList.toggle(styles.removeFocus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== blogNav.current && item !== blogNav.current?.nextElementSibling)
                        item.classList.toggle(styles.removeFocus);
                });
        };

        const openBlogDropDown = (e: MouseEvent<HTMLButtonElement>) => {

        };

        const navigate = () => {
            blogNav.current?.classList.remove(styles.focus);
            compassNav.current?.classList.remove(styles.removeFocus, styles.focus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== blogNav.current && item !== blogNav.current?.nextElementSibling)
                        item.classList.remove(styles.removeFocus);
                });
        };

        const navigationData: NavigationType = [
            {
                name: 'compass', icon: 'compass', type: 'container', ref: compassNav, onClick: openCompassNav, children: [
                    {
                        name: loggedIn ? 'settings' : 'login',
                        icon: loggedIn ? 'cog' : 'user-lock',
                        href: loggedIn ? '/settings' : '/login',
                        type: 'item',
                        onClick: navigate
                    },
                    { name: 'portfolio', icon: 'portrait', href: '/portfolio', type: 'item', onClick: navigate },
                    {
                        name: 'blog',
                        icon: 'rss',
                        type: 'container',
                        ref: blogNav,
                        onClick: isMobile ? openBlogNav : openBlogDropDown,
                        children: [
                            { name: 'recent', icon: 'portrait', href: '/blog/recent', type: 'item', onClick: navigate },
                            { name: 'search', icon: 'search', href: '/blog/search', type: 'item', onClick: navigate },
                            ...(loggedIn ? [{
                                name: 'create',
                                icon: 'plus',
                                href: '/blog/post/create',
                                type: 'item',
                                onClick: navigate
                            }] : []) as NavigationType
                        ]
                    },
                    { name: 'gallery', icon: 'images', href: '/gallery', type: 'item', onClick: navigate },
                    { name: 'contact', icon: 'envelope', href: '/contact', type: 'item', onClick: navigate }
                ]
            }
        ];

        const mapMobileNavigation = (entries: NavigationType | NavigationChildren) => {
            return entries.map(entry => {
                if (entry.type === 'container') {
                    return (
                        <Fragment key={entry.name}>
                            <button ref={entry.ref} className={styles.navItem} data-name={entry.name}
                                    onClick={entry.onClick}>
                                <FontAwesomeIcon icon={entry.icon}/>
                                {entry.name !== 'compass' && <span>{entry.name}</span>}
                            </button>
                            <ul className={styles[`${entry.name}Container`]}>{mapMobileNavigation(entry.children)}</ul>
                        </Fragment>
                    );
                } else if (entry.type === 'item') {
                    return (
                        <li key={entry.name}>
                            <Link href={entry.href}>
                                <a className={styles.navItem} data-name={entry.name} onClick={entry.onClick}>
                                    <FontAwesomeIcon icon={entry.icon}/><span>{entry.name}</span>
                                </a>
                            </Link>
                        </li>
                    );
                }
            });

        };
        const mapDesktopNavigation = (entries: NavigationType | NavigationChildren) => {
            return entries.map(entry => {
                if (entry.type === 'container') {
                    return (
                        <Fragment key={entry.name}>
                            {
                                entry.name === 'compass' ?
                                <ul className={styles.compassContainer}>{mapDesktopNavigation(entry.children)}</ul>
                                                         :
                                <>
                                    <div className={styles.dropdown}>
                                        <button className={styles.navItem}>
                                            <FontAwesomeIcon icon={entry.icon}/>
                                            <span>{entry.name}</span>
                                        </button>
                                        <ul className={styles.dropdown}>{mapDesktopNavigation(entry.children)}</ul>
                                    </div>
                                </>

                            }
                        </Fragment>
                    );
                } else if (entry.type === 'item') {
                    return (
                        <li key={entry.name} className={styles.navItem}>
                            <Link href={entry.href}>
                                <a data-name={entry.name} onClick={entry.onClick}>
                                    <FontAwesomeIcon icon={entry.icon}/><span>{entry.name}</span>
                                </a>
                            </Link>
                        </li>
                    );
                }
            });
        };

        const Mobile = () => (
            <nav className={styles.mobile}>
                <div className={styles.relative}>
                    {mapMobileNavigation(navigationData)}
                    <div className={styles.backdrop}/>
                </div>
            </nav>
        );

        const Desktop = () => (
            <nav className={styles.desktop}>
                {mapDesktopNavigation(navigationData)}
            </nav>
        );

        return isMobile ? <Mobile/> : <Desktop/>;
    }
;

export default Navigation;