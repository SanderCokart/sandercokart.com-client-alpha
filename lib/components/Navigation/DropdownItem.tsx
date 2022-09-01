import {ReactNode, MouseEvent} from 'react';

import {useDropdownMenu} from '@/components/Navigation';

import styles from './DropdownItem.module.scss';


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

export default DropdownItem;