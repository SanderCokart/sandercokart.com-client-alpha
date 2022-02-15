import Radio from '@/components/formComponents/Radio';
import useMediaQuery from '@/hooks/useMediaQuery';
import {useTheme} from '@/providers/ThemeProvider';
import styles from '@/styles/pages/test.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {ChangeEvent, Dispatch, MouseEvent, ReactNode, SetStateAction} from 'react';
import {createContext, useContext, useState} from 'react';
import {useDetectClickOutside} from 'react-detect-click-outside';
import {CSSTransition} from 'react-transition-group';

// const Test: FC = () => {
//     return (
//         <div className={styles.desktop}>
//             <Navbar>
//                 <NavItem icon="user" text="Account"/>
//                 <NavItem icon="cog" text="Settings">
//                     <SettingsDropdown/>
//                 </NavItem>
//             </Navbar>
//         </div>
//     );
// };
//
//
// const Navbar: FC = (props) => {
//     return (
//         <nav className={styles.nav}>
//             <ul className={styles.navUl}>{props.children}</ul>
//         </nav>
//     );
// };
//
// interface NavItemProps {
//     icon: FontAwesomeIconType;
//     text: string;
// }
//
// const NavItem: FC<NavItemProps> = (props) => {
//     const [open, setOpen] = useState(false);
//     const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
//
//     return (
//         <li ref={ref} className={styles.navItem} onClick={
//             props.children ? () => setOpen(open => !open) : undefined
//         }>
//             <Link href="#">
//                 <a className={styles.iconButton}>
//                     <FontAwesomeIcon icon={props.icon}/>
//                     {props.text}
//                 </a>
//             </Link>
//             {props.children &&
//                 <CSSTransition unmountOnExit classNames="nav-item" in={open} timeout={500}>
//                     {props.children}
//                 </CSSTransition>
//             }
//         </li>
//     );
// };
//
// interface DropdownItemProps extends HTMLAttributes<HTMLAnchorElement> {
//     leftIcon?: FontAwesomeIconType;
//     rightIcon?: FontAwesomeIconType;
//     goToMenu?: string;
// }
//
// const SettingsDropdown: FC = () => {
//     const [menuHeight, setMenuHeight] = useState<number>(0);
//     const dropdownRef = useRef<null | HTMLDivElement>(null);
//     const [activeMenu, setActiveMenu] = useState('main');
//     const [theme, setTheme] = useState('dark');
//
//     useEffect(() => {
//         const firstChild = dropdownRef.current?.firstChild as HTMLDivElement;
//         setMenuHeight(firstChild?.offsetHeight);
//     }, []);
//
//     function calcHeight(el: HTMLElement) {
//         const height = el.offsetHeight;
//         setMenuHeight(height);
//     }
//
//
//     const DropdownItem: FC<DropdownItemProps> = (props) => {
//         const { goToMenu, leftIcon, rightIcon, children, ...restOfProps } = props;
//         return (
//             <Link href="#">
//                 <a className={styles.menuItem}
//                    onClick={goToMenu ? ((e) => {
//                        e.stopPropagation();
//                        setActiveMenu(goToMenu);
//                    }) : undefined} {...restOfProps}>
//                     {leftIcon && (
//                         <span className={styles.iconButton}>
//                             <FontAwesomeIcon icon={leftIcon}/>
//                         </span>
//                     )}
//
//                     {children}
//
//                     {rightIcon && (
//                         <span className={styles.iconRight}>
//                             <FontAwesomeIcon icon={rightIcon}/>
//                         </span>
//                     )}
//                 </a>
//             </Link>
//         );
//     };
//
//
//     return (
//         <div ref={dropdownRef} className={styles.dropdown} style={{ height: menuHeight }}
//              onClick={e => e.stopPropagation()}>
//             <CSSTransition
//                 unmountOnExit
//                 classNames="menu-primary"
//                 in={activeMenu === 'main'}
//                 timeout={250}
//                 onEnter={calcHeight}>
//                 <div className={styles.menu}>
//                     <DropdownItem leftIcon="paint-brush">
//                         <Radio name="theme" options={[
//                             { label: 'Light', value: 'light' },
//                             { label: 'Dark', value: 'dark' },
//                             { label: 'Device', value: 'device' }
//                         ]} value={theme} onChange={() => {
//                             console.log(true);
//                         }}/>
//                     </DropdownItem>
//                 </div>
//             </CSSTransition>
//         </div>
//     );
// };

const Test2 = () => {
    return (
        <Navbar>
            <div className={styles.left}>
                <NavItem href="/" icon={<FontAwesomeIcon icon="home"/>} text="Home"/>
                {/*    <NavItem icon={icon} text="Library">*/}
                {/*        <DropdownMenu initialMenu="library">*/}
                {/*            <DropdownGroup grid={2} menuName="library">*/}
                {/*                <DropdownItem*/}
                {/*                    href={}*/}
                {/*                    onCLick={}*/}
                {/*                    leftIcon={}*/}
                {/*                >*/}
                {/*                    Courses*/}
                {/*                </DropdownItem>*/}
                {/*                <DropdownItem*/}
                {/*                    href={}*/}
                {/*                    onCLick={}*/}
                {/*                    leftIcon={}*/}
                {/*                >*/}
                {/*                    Tutorials*/}
                {/*                </DropdownItem>*/}
                {/*                <DropdownItem*/}
                {/*                    href={}*/}
                {/*                    onCLick={}*/}
                {/*                    leftIcon={}*/}
                {/*                >*/}
                {/*                    Tips*/}
                {/*                </DropdownItem>*/}
                {/*            </DropdownGroup>*/}
                {/*        </DropdownMenu>*/}
                {/*    </NavItem>*/}
            </div>
            <div className={styles.right}>
                <NavItem dropdown icon={<FontAwesomeIcon icon="cog"/>} text="Settings">
                    <Dropdown initialMenu="home">
                        <DropdownMenu animationTimeout={250} menuName="home">
                            <DropdownItem
                                goToMenu="theme"
                                leftIcon={<FontAwesomeIcon icon="paint-brush"/>}
                                rightIcon={<FontAwesomeIcon icon="caret-right"/>}
                            >
                                Theme
                            </DropdownItem>
                            {/*                <DropdownItem>*/}
                            {/*                    <Radio name="theme" options={[*/}
                            {/*                        { label: 'Light', value: 'light' },*/}
                            {/*                        { label: 'Dark', value: 'dark' },*/}
                            {/*                        { label: 'Device', value: 'device' }*/}
                            {/*                    ]} selectedValue="dark"/>*/}
                            {/*                </DropdownItem>*/}
                            {/*            </DropdownGroup>*/}
                            {/*            <DropdownGroup menuName="settings">*/}
                            {/*                <DropdownItem goToMenu="home" leftIcon={<FontAwesomeIcon icon="caret-left"/>}>*/}

                            {/*                </DropdownItem>*/}
                        </DropdownMenu>
                        <DropdownMenu animationTimeout={250} menuName="theme">
                            <DropdownItem goToMenu="home" leftIcon={<FontAwesomeIcon icon="caret-left"/>}>
                                Back to settings
                            </DropdownItem>
                            <DropdownItem>
                                <ThemeControl/>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </div>
        </Navbar>
    );
};

export default Test2;

interface NavbarProps {
    children: ReactNode;
}

const Navbar = (props: NavbarProps) => {
    const isDesktop = useMediaQuery({ from: 'sm', option: 'up' });

    if (isDesktop)
        return (
            <ul className={styles.desktopNav}>
                {props.children}
            </ul>
        );

    return (
        <>mobile</>
    );
};

interface NavItemTypeAnchorProps {
    dropdown?: false;
    icon: ReactNode;
    text?: string;
    href: string;
};

type NavItemProps = NavItemTypeAnchorProps | NavItemDropdownProps;

interface NavItemDropdownProps {
    dropdown: true;
    icon: ReactNode;
    text?: string;
    children: ReactNode;
}

const NavItem = (props: NavItemProps) => {
    if (props.dropdown) {
        return <NavItemWithDropdown icon={props.icon} text={props.text}>{props.children}</NavItemWithDropdown>;
    } else {
        return (
            <li className={styles.navItem}>
                <Link href={props.href}>
                    <a className={styles.navItemLink}>
                        {props.icon}
                        {props.text}
                    </a>
                </Link>
            </li>
        );
    }
};

const NavItemWithDropdown = (props: Omit<NavItemDropdownProps, 'dropdown'>) => {
    const [open, setOpen] = useState(false);
    const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });

    return (
        <li ref={ref} className={styles.navItemWithDropdown} onClick={() => setOpen(open => !open)}>
            {props.icon}
            {props.text}
            {open && props.children}
        </li>
    );
};

interface DropdownProps {
    initialMenu: string;
    children: ReactNode;
}

const DropdownMenuContext = createContext({});
const useDropdownMenu = () => useContext(DropdownMenuContext) as {
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
};

const Dropdown = (props: DropdownProps) => {
    const [activeMenu, setActiveMenu] = useState(props.initialMenu);
    return (
        <DropdownMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
            {props.children}
        </DropdownMenuContext.Provider>
    );
};

interface DropdownMenuProps {
    children: ReactNode;
    menuName: string;
    animationTimeout: number;
}

const DropdownMenu = (props: DropdownMenuProps) => {
    const { activeMenu } = useDropdownMenu();
    return (
        <CSSTransition unmountOnExit classNames="dropdownMenu" in={activeMenu === props.menuName}
                       timeout={props.animationTimeout}>
            <ul className={styles.dropdownMenu}>
                {props.children}
            </ul>
        </CSSTransition>
    );
};


interface DropdownItemProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    goToMenu?: string;
    children: ReactNode;
}


const DropdownItem = (props: DropdownItemProps) => {
    const { setActiveMenu } = useDropdownMenu();
    const onClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (props.goToMenu) {
            setActiveMenu(props.goToMenu);
        }
    };
    return (
        <li className={styles.dropdownItem} onClick={onClick}>
            {props.leftIcon && <div className={styles.leftIcon}>{props.leftIcon}</div>}
            {props.children}
            {props.rightIcon && <div className={styles.rightIcon}>{props.rightIcon}</div>}
        </li>
    );
};

interface DropdownLinkItemProps {
    href: string;
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const DropdownLinkItem = (props: DropdownLinkItemProps) => {
    return (
        <li className={styles.dropdownLinkItem}>
            <Link href={props.href}>
                <a className={styles.dropdownLinkItemAnchor}>
                    {props.leftIcon && <div className={styles.leftIcon}>{props.leftIcon}</div>}
                    {props.children}
                    {props.rightIcon && <div className={styles.rightIcon}>{props.rightIcon}</div>}
                </a>
            </Link>
        </li>
    );
};

const ThemeControl = () => {
    const { theme, setTheme } = useTheme();

    const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.value);
    };

    return (
        <div className={styles.themeControl}>
            <Radio name="theme" options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'Device', value: 'device' }
            ]} optionsContainerProps={{ className: styles.themeRadioControl }} selectedValue={theme}
                   onChange={onThemeChange}/>
        </div>
    );
};