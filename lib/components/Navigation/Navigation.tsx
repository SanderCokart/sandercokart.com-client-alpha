import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {CSSTransition} from 'react-transition-group';

import {
    DropdownItem,
    NavItem,
    DropdownMenu,
    NavItemWithDropdown,
    DropdownLinkItem,
    MobileItem,
    MobileMenu
} from '@/components/Navigation';
import PortalNavigation from '@/components/PortalNavigation/PortalNavigation';
import ThemeControl from '@/components/ThemeControl/ThemeControl';

import {
    LocalAccountPageRoute,
    LocalLoginPageRoute,
    LocalPortalPageRoute,
    LocalLibraryPageRoute,
    LocalContactPageRoute
} from '@/constants/local-routes';

import useMediaQuery from '@/hooks/useMediaQuery';

import {useAuth} from '@/providers/AuthProvider';

import styles from '@/styles/components/Navigation.module.scss';


const Navigation = () => {
        const isMobile = useMediaQuery({ from: 'sm', option: 'down' });

        return isMobile ? <Mobile/> : <Desktop/>;
    }
;


const Mobile = memo(function Mobile() {
    const { isLoggedIn, isAdmin } = useAuth();

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

                    {isLoggedIn ?
                     (<MobileItem href={LocalAccountPageRoute} icon="user" name="account" onClick={navigate}/>)
                                :
                     (<MobileItem href={LocalLoginPageRoute} icon="user-lock" name="login" onClick={navigate}/>)
                    }

                    {isAdmin && (
                        <MobileItem href={LocalPortalPageRoute} icon="database" name="portal" onClick={navigate}/>
                    )}

                    <MobileMenu icon="boxes" name="library" onClick={openLibraryNav}>
                        <MobileItem href={LocalLibraryPageRoute('courses')} icon="book" name="courses"
                                    onClick={navigate}/>
                        <MobileItem href={LocalLibraryPageRoute('tips-&-tutorials')} icon="lightbulb" name="tips"
                                    onClick={navigate}/>
                    </MobileMenu>
                    <MobileItem href={LocalContactPageRoute} icon="envelope" name="contact" onClick={navigate}/>
                </MobileMenu>
                <div className={styles.backdrop}/>
            </ul>
        </nav>
    );
});

const Desktop = memo(function Desktop() {
    const { pathname } = useRouter();
    const { isLoggedIn, isAdmin } = useAuth();
    const isPortalPage = pathname.includes('portal');

    return (
        <>
            <nav className={styles.desktop}>
                <ul>
                    <div className={styles.left}>
                        <NavItem href="/" icon={<FontAwesomeIcon icon="home"/>} text="Home"/>
                        <NavItemWithDropdown
                            align="bottom-left"
                            icon={<FontAwesomeIcon icon="boxes"/>}
                            initialMenu="main"
                            text="Library" width="200px"
                        >
                            <DropdownMenu menuName="main">
                                <DropdownLinkItem href={LocalLibraryPageRoute('posts')}
                                                  leftIcon={<FontAwesomeIcon icon="rss"/>}>
                                    Posts
                                </DropdownLinkItem>
                                <DropdownLinkItem href={LocalLibraryPageRoute('courses')}
                                                  leftIcon={<FontAwesomeIcon icon="book"/>}>
                                    Courses
                                </DropdownLinkItem>
                                <DropdownLinkItem href={LocalLibraryPageRoute('tips-&-tutorials')}
                                                  leftIcon={<FontAwesomeIcon icon="lightbulb"/>}>
                                    Tips & Tutorials
                                </DropdownLinkItem>
                            </DropdownMenu>
                        </NavItemWithDropdown>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.relativeButtonContainer}>
                            <CSSTransition unmountOnExit classNames={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                exit: styles.exit,
                                exitActive: styles.exitActive
                            }} in={isAdmin} timeout={500}>
                                <NavItem href={LocalPortalPageRoute} icon={<FontAwesomeIcon icon="database"/>}
                                         text="Portal"/>
                            </CSSTransition>
                        </div>

                        <div className={styles.relativeButtonContainer}>
                            <CSSTransition unmountOnExit classNames={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                exit: styles.exit,
                                exitActive: styles.exitActive
                            }} in={isLoggedIn} timeout={500}>
                                <NavItem href={LocalAccountPageRoute} icon={<FontAwesomeIcon icon="user"/>}
                                         text="Account"/>
                            </CSSTransition>
                            <CSSTransition unmountOnExit classNames={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                exit: styles.exit,
                                exitActive: styles.exitActive
                            }} in={!isLoggedIn} timeout={500}>
                                <NavItem href={LocalLoginPageRoute} icon={<FontAwesomeIcon icon="user-lock"/>}
                                         text="Login"/>
                            </CSSTransition>
                        </div>

                        <NavItemWithDropdown align="bottom-right"
                                             icon={<FontAwesomeIcon icon="cog"/>}
                                             initialMenu="main"
                                             text="Settings" width="200px"
                        >
                            <DropdownMenu menuName="main">
                                <DropdownItem
                                    goToMenu="theme"
                                    leftIcon={<FontAwesomeIcon icon="paint-brush"/>}
                                    rightIcon={<FontAwesomeIcon icon="caret-right"/>}
                                >
                                    Theme
                                </DropdownItem>
                            </DropdownMenu>
                            <DropdownMenu menuName="theme">
                                <DropdownItem goToMenu="main" leftIcon={<FontAwesomeIcon icon="caret-left"/>}>
                                    Back to settings
                                </DropdownItem>
                                <DropdownItem>
                                    <ThemeControl/>
                                </DropdownItem>
                            </DropdownMenu>
                        </NavItemWithDropdown>
                    </div>
                </ul>
            </nav>
            <div className={styles.margin}/>
            {isPortalPage && <PortalNavigation/>}
        </>
    );
});

export default Navigation;
