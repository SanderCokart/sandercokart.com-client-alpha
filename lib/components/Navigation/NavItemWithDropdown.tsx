import {ReactNode, useState} from 'react';
import {useDetectClickOutside} from 'react-detect-click-outside';
import styles from './NavItemWithDropdown.module.scss';
import {DropdownMenuContext} from '@/components/Navigation';


interface NavItemDropdownProps {
    icon: ReactNode;
    text?: string;
    children: ReactNode;
    initialMenu: string;
    align: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    width: string;
}

const NavItemWithDropdown = (props: NavItemDropdownProps) => {
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

export default NavItemWithDropdown;