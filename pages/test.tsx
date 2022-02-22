import Radio from '@/components/formComponents/Radio';
import useMediaQuery from '@/hooks/useMediaQuery';
import {useTheme} from '@/providers/ThemeProvider';
import styles from '@/styles/pages/test.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {ChangeEvent, Dispatch, MouseEvent, ReactNode, SetStateAction} from 'react';
import {createContext, useContext, useState} from 'react';
import {useDetectClickOutside} from 'react-detect-click-outside';

const Test2 = () => {
    return (
        <Navbar>
            <div className={styles.left}>
                <NavItem href="/" icon={<FontAwesomeIcon icon="home"/>} text="Home"/>
                <NavItem dropdown align="bottom-left" icon={<FontAwesomeIcon icon="boxes"/>} initialMenu="main"
                         text="Library" width="200px">
                    <DropdownMenu menuName="main">
                        <DropdownLinkItem href="library/courses" leftIcon={<FontAwesomeIcon icon="book"/>}>
                            Courses
                        </DropdownLinkItem>
                        <DropdownLinkItem href="library/tips-&-tutorials"
                                          leftIcon={<FontAwesomeIcon icon="lightbulb"/>}>
                            Tips & Tutorials
                        </DropdownLinkItem>
                        <DropdownLinkItem href="library/tips" leftIcon={<FontAwesomeIcon icon="rss"/>}>
                            Posts
                        </DropdownLinkItem>
                    </DropdownMenu>
                </NavItem>
            </div>

            <div className={styles.right}>
                <NavItem dropdown align="bottom-right" icon={<FontAwesomeIcon icon="cog"/>} initialMenu="main"
                         text="Settings" width="200px">
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
                        <DropdownItem goToMenu="home" leftIcon={<FontAwesomeIcon icon="caret-left"/>}>
                            Back to settings
                        </DropdownItem>
                        <DropdownItem>
                            <ThemeControl/>
                        </DropdownItem>
                    </DropdownMenu>
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
}

type NavItemProps = NavItemTypeAnchorProps | NavItemDropdownProps;

interface NavItemDropdownProps {
    dropdown: true;
    icon: ReactNode;
    text?: string;
    children: ReactNode;
    initialMenu: string;
    align: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    width: string;
}

const NavItem = (props: NavItemProps) => {
    if (props.dropdown) {
        return (
            <NavItemWithDropdown align={props.align} icon={props.icon} initialMenu={props.initialMenu} text={props.text}
                                 width={props.width}>
                {props.children}
            </NavItemWithDropdown>
        );
    }
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
};

const NavItemWithDropdown = (props: Omit<NavItemDropdownProps, 'dropdown'>) => {
    const [open, setOpen] = useState(false);
    const ref = useDetectClickOutside({
        onTriggered: () => {
            setOpen(false);
            setActiveMenu(props.initialMenu);
        }
    });
    const [activeMenu, setActiveMenu] = useState(props.initialMenu);

    const onClick = () => {
        setOpen(open => {
            open && setActiveMenu(props.initialMenu);
            return !open;
        });
    };

    const alignmentOptions = {
        'top-left': { bottom: '100%', left: '0', right: 'auto', top: 'auto' },
        'top-right': { bottom: '100%', left: 'auto', right: '0', top: 'auto' },
        'bottom-left': { bottom: 'auto', left: '0', right: 'auto', top: '100%' },
        'bottom-right': { bottom: 'auto', left: 'auto', right: '0', top: '100%' }
    };

    return (
        <li ref={ref} className={styles.navItemWithDropdown} onClick={onClick}>
            {props.icon}
            {props.text}
            {open && (
                <DropdownMenuContext.Provider
                    value={{ activeMenu, setActiveMenu, initialMenu: props.initialMenu }}>
                    <ul className={styles.dropdownMenu}
                        style={{ ...alignmentOptions[props.align || 'bottom-left'], width: props.width || '200px' }}>
                        {props.children}
                    </ul>
                </DropdownMenuContext.Provider>
            )}
        </li>
    );
};

const DropdownMenuContext = createContext({});
const useDropdownMenu = () => useContext(DropdownMenuContext) as {
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
    initialMenu: string;
    setMenuHeight: Dispatch<SetStateAction<number>>;
};

interface DropdownMenuProps {
    children: ReactNode;
    menuName: string;
}

const DropdownMenu = (props: DropdownMenuProps) => {
    const { activeMenu } = useDropdownMenu();

    return (
        <div className={styles.menu}>
            {(activeMenu === props.menuName) && props.children}
        </div>
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
        <li className={props.goToMenu ? styles.dropdownItemButton : styles.dropdownItem} onClick={onClick}>
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
            <Radio
                name="theme"
                options={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Device', value: 'device' }]}
                optionsContainerProps={{ className: styles.themeRadioControl }}
                selectedValue={theme}
                onChange={onThemeChange}/>
        </div>
    );
};