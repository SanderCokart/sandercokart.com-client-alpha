import Button from '@/components/Button';
import Dropdown, {DropdownGrid, DropdownItem} from '@/components/Dropdown';
import PortalNavigation from '@/components/PortalNavigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/components/Navigation.module.scss';
import {FontAwesomeIconType} from '@/types/CustomTypes';
import {MobileItemProps, MobileMenuProps, NavItemProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';

const Navigation: FC = () => {
        const isMobile = useMediaQuery({ from: 'sm', option: 'down' });

        return isMobile ? <Mobile/> : <Desktop/>;
    }
;

export default Navigation;

const Mobile = () => {
    const { loggedIn, isAdmin } = useAuth();

    const openCompassNav = () => {
        document.documentElement.classList.toggle('modalOpen');
        document.getElementById('mobileMenuNavigation')?.classList.toggle(styles.openCompass);
    };

    const openLibraryNav = () => {
        document.getElementById('mobileMenuNavigation')?.classList.toggle(styles.openLibrary);
    };

    const navigate = () => {
        document.documentElement.classList.remove('modalOpen');
        document.getElementById('mobileMenuNavigation')?.classList.remove(styles.openLibrary, styles.openCompass);
    };

    return (
        <nav className={styles.mobile}>
            <ul className={styles.relative}>
                <MobileMenu icon="compass" id="mobileMenuNavigation" name="compass" showSpan={false}
                            onClick={openCompassNav}>
                    <MobileItem href="/blog" icon="rss" name="blog" onClick={navigate}/>

                    {loggedIn ?
                     (<MobileItem href="/account" icon="user" name="account" onClick={navigate}/>)
                              :
                     (<MobileItem href="/login" icon="user-lock" name="login" onClick={navigate}/>)
                    }

                    {isAdmin && (
                        <MobileItem href="/portal" icon="database" name="portal" onClick={navigate}/>
                    )}

                    <MobileMenu icon="boxes" name="library" onClick={openLibraryNav}>
                        <MobileItem href="/library/courses" icon="book" name="courses" onClick={navigate}/>
                        <MobileItem href="/library/tips" icon="lightbulb" name="tips" onClick={navigate}/>
                    </MobileMenu>
                    <MobileItem href="/contact" icon="envelope" name="contact" onClick={navigate}/>
                </MobileMenu>
                <div className={styles.backdrop}/>
            </ul>
        </nav>
    );
};

const Desktop = () => {
    const { pathname } = useRouter();
    const { loggedIn, isAdmin } = useAuth();
    const isPortalPage = pathname.includes('portal');

    return (
        <>
            <nav className={styles.desktop}>
                <ul>
                    {/*LEFT*/}
                    <div>
                        <Button navigationButton href="/blog"><FontAwesomeIcon icon="rss"/>Blog</Button>
                        <NavigationDropdown icon="boxes" text="Library">
                            <DropdownGrid columns={3} width="100%">
                                <DropdownItem>
                                    <Button navigationButton href="/library/courses"><FontAwesomeIcon icon="book"/>Courses</Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button navigationButton href="/library/tips"><FontAwesomeIcon icon="lightbulb"/>Tips</Button>

                                </DropdownItem>
                                <DropdownItem>
                                    <Button navigationButton href="/library/courses"><FontAwesomeIcon icon="book"/>Courses</Button>

                                </DropdownItem>
                                <DropdownItem>
                                    <Button navigationButton href="/library/courses"><FontAwesomeIcon icon="book"/>Courses</Button>
                                </DropdownItem>
                            </DropdownGrid>
                        </NavigationDropdown>
                    </div>
                    {/*RIGHT*/}
                    <div>

                        <Button navigationButton href="/contact"><FontAwesomeIcon icon="envelope"/>Contact</Button>


                        {isAdmin &&
                            <Button navigationButton href="/portal"><FontAwesomeIcon icon="database"/>Portal</Button>}

                        {loggedIn ?
                         <Button navigationButton href="/account"><FontAwesomeIcon icon="user"/>Account</Button>

                                  :
                         <Button navigationButton href="/login"><FontAwesomeIcon icon="user-lock"/>Login</Button>
                        }
                    </div>
                </ul>
            </nav>
            <div className={styles.margin}/>
            {isPortalPage && <PortalNavigation/>}
        </>
    );
};

const MobileMenu: FC<MobileMenuProps> = (props) => {
    const { showSpan = true, name, onClick, icon, children, id = '' } = props;
    return (
        <li id={id}>
            <button data-name={name} onClick={onClick}>
                <FontAwesomeIcon icon={icon}/>
                {showSpan && <span>{name}</span>}
            </button>
            <ul>{children}</ul>
        </li>
    );
};

const MobileItem: FC<MobileItemProps> = (props) => {
    const { name, href, icon, onClick } = props;
    return (
        <li onClick={onClick}>
            <Link href={href}>
                <a data-name={name}>
                    <FontAwesomeIcon icon={icon}/><span>{name}</span>
                </a>
            </Link>
        </li>
    );
};

const NavItem: FC<NavItemProps> = ({ href, icon, text }) => (
    <li>
        <Link href={href} scroll={false}>
            <a>
                <FontAwesomeIcon icon={icon}/>{text}
            </a>
        </Link>
    </li>
);

const NavigationDropdown: FC<{ text: string, icon: FontAwesomeIconType }> = ({ children, text, icon }) => {
    return (
        <Dropdown buttonContent={
            <>
                <FontAwesomeIcon icon={icon}/>
                {text}
            </>
        } expandedWidth="200px" height="40px">
            {children}
        </Dropdown>
    );
};