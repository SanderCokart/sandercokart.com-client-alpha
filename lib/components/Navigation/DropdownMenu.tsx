import {ReactNode} from 'react';
import {useDropdownMenu} from '@/components/Navigation';
import styles from './DropdownMenu.module.scss';

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

export default DropdownMenu;