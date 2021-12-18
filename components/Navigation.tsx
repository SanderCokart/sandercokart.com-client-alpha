import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/components/Navigation.module.scss';
import {DropdownProps, MobileItemProps, MobileMenuProps, NavItemProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {FC, MouseEvent, PropsWithChildren} from 'react';
import {forwardRef, Fragment, useRef} from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const Navigation: FC = () => {
        const { loggedIn, isAdmin } = useAuth();
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

        const Mobile = () => (
            <nav className={styles.mobile}>
                <div className={styles.relative}>
                    <MobileMenu ref={compassNav} icon="compass" name="compass" showSpan={false} onClick={openCompassNav}>
                        <MobileItem href="/blog" icon="rss" name="blog" onClick={navigate}/>

                        {loggedIn ?
                         (<MobileItem href="/settings" icon="cog" name="settings" onClick={navigate}/>)
                                  :
                         (<MobileItem href="/login" icon="user-lock" name="login" onClick={navigate}/>)
                        }

                        {isAdmin && (
                            <MobileItem href="/portal" icon="database" name="portal" onClick={navigate}/>
                        )}

                        <MobileMenu ref={libraryNav} icon="boxes" name="library" onClick={openLibraryNav}>
                            <MobileItem href="/library/courses" icon="book" name="courses" onClick={navigate}/>
                            <MobileItem href="/library/tips" icon="lightbulb" name="tips" onClick={navigate}/>
                        </MobileMenu>
                        <MobileItem href="/contact" icon="envelope" name="contact" onClick={navigate}/>
                    </MobileMenu>
                    <div className={styles.backdrop}/>
                </div>
            </nav>
        );

        const Desktop = () => (
            <>
                <nav className={styles.desktop}>
                    <ul>
                        {/*LEFT*/}
                        <div>
                            <NavItem href="/blog" icon="rss" text="Blog"/>
                            <Dropdown icon="boxes" text="Library">
                                <NavItem href="/library/courses" icon="book" text="Courses"/>
                                <NavItem href="/library/tips" icon="lightbulb" text="Tips"/>
                            </Dropdown>
                        </div>
                        {/*RIGHT*/}
                        <div>
                            {isAdmin && (
                                <NavItem href="/portal" icon="database" text="Portal"/>
                            )}
                            {loggedIn ?
                             <NavItem href="/settings" icon="cog" text="Settings"/>

                                      :
                             <NavItem href="/login" icon="user-lock" text="Login"/>
                            }
                        </div>
                    </ul>
                </nav>
                <div className={styles.margin}/>
            </>
        );

        return isMobile ? <Mobile/> : <Desktop/>;
    }
;

export default Navigation;


const MobileMenu = forwardRef<HTMLButtonElement, PropsWithChildren<MobileMenuProps>>(function MobileMenu(props, ref) {
    const { showSpan = true, name, onClick, icon, children } = props;
    return (
        <Fragment>
            <button ref={ref} className={styles.navItem} data-name={name}
                    onClick={onClick}>
                <FontAwesomeIcon icon={icon}/>
                {showSpan && <span>{name}</span>}
            </button>
            <ul className={styles[`${name}Container`]}>{children}</ul>
        </Fragment>
    );
});

const MobileItem: FC<MobileItemProps> = (props) => {
    const { name, href, icon, onClick } = props;
    return (
        <li data-name={name} onClick={onClick}>
            <Link href={href}>
                <a className={styles.navItem} data-name={name}>
                    <FontAwesomeIcon icon={icon}/><span>{name}</span>
                </a>
            </Link>
        </li>
    );
};

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