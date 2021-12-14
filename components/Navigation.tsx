import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/components/Navigation.module.scss';
import {NavigationChildren, NavigationType} from '@/types/DataTypes';
import {DropdownProps, NavItemProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {FC, MouseEvent} from 'react';
import {Fragment, useRef} from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const Navigation: FC = () => {
        const { loggedIn } = useAuth();
        const compassNav = useRef<null | HTMLButtonElement>(null);
        const libraryNav = useRef<null | HTMLButtonElement>(null);
        const isMobile = useMediaQuery({ from: 'sm', option: 'down' });

        const openCompassNav = () => {
            compassNav.current?.classList.toggle(styles.focus);
        };
        const openLibraryNav = () => {
            libraryNav.current?.classList.toggle(styles.focus);
            compassNav.current?.classList.toggle(styles.removeFocus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== libraryNav.current && item !== libraryNav.current?.nextElementSibling)
                        item.classList.toggle(styles.removeFocus);
                });
        };

        const navigate = () => {
            libraryNav.current?.classList.remove(styles.focus);
            compassNav.current?.classList.remove(styles.removeFocus, styles.focus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== libraryNav.current && item !== libraryNav.current?.nextElementSibling)
                        item.classList.remove(styles.removeFocus);
                });
        };


        const navigationData: NavigationType = [
            {
                name: 'compass', icon: 'compass', type: 'container', ref: compassNav, onClick: openCompassNav, children: [
                    (loggedIn ? {
                                href: '/settings',
                                icon: 'cog',
                                name: 'settings',
                                onClick: navigate,
                                type: 'item'
                            } :
                            {
                                href: '/login',
                                icon: 'user-lock',
                                name: 'login',
                                onClick: navigate,
                                type: 'item'
                            }
                    ),
                    {
                        href: '/blog',
                        icon: 'rss',
                        name: 'blog',
                        onClick: navigate,
                        type: 'item'
                    },
                    {
                        children: [
                            {
                                href: '/courses',
                                icon: 'book',
                                name: 'courses',
                                onClick: navigate,
                                type: 'item'
                            },
                            {
                                href: '/tips',
                                icon: 'lightbulb',
                                name: 'tips',
                                onClick: navigate,
                                type: 'item'
                            }
                        ],
                        icon: 'boxes',
                        name: 'library',
                        onClick: openLibraryNav,
                        ref: libraryNav,
                        type: 'container'
                    },
                    {
                        href: '/contact',
                        icon: 'envelope',
                        name: 'contact',
                        onClick: navigate,
                        type: 'item'
                    }
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

        const Mobile = () => (
            <nav className={styles.mobile}>
                <div className={styles.relative}>
                    {mapMobileNavigation(navigationData)}
                    <div className={styles.backdrop}/>
                </div>
            </nav>
        );

        const Desktop = () => (
            <>
                <nav className={styles.desktop}>
                    <ul>
                        <NavItem href="/blog" icon="rss" text="Blog"/>
                        <Dropdown icon="boxes" text="Library">
                            <NavItem href="/library/courses" icon="book" text="Courses"/>
                            <NavItem href="/library/tips" icon="lightbulb" text="Tips"/>
                        </Dropdown>

                        {
                            loggedIn ?
                            <NavItem href="/settings" icon="cog" text="Settings"/>

                                     :
                            <NavItem href="/login" icon="user-lock" text="Login"/>
                        }
                    </ul>
                </nav>
                <div className={styles.margin}/>
            </>
        );

        return isMobile ? <Mobile/> : <Desktop/>;
    }
;

export default Navigation;

const NavItem: FC<NavItemProps> = ({ href, icon, text }) => (
    <li>
        <Link href={href}>
            <a>
                <FontAwesomeIcon icon={icon}/><span>{text}</span>
            </a>
        </Link>
    </li>
);

const Dropdown: FC<DropdownProps> = ({ children, text, icon }) => {
    const activateDropdownMenu = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.currentTarget.classList.toggle(styles.active);
        e.currentTarget.nextElementSibling?.classList.toggle(styles.active);
    };

    return (
        <li className={styles.dropdown}>
            <button onClick={activateDropdownMenu}><FontAwesomeIcon icon={icon}/><span>{text}</span></button>
            <ul className={styles.dropdownMenu}>
                {children}
            </ul>
        </li>
    );
};