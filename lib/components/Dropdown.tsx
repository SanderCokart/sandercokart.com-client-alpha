import Button from '@/components/Button';
import styles from '@/styles/pages/test.module.scss';
import {DropdownGridProps, DropdownItemProps, DropdownListProps, DropdownProps} from '@/types/PropTypes';
import type {FC} from 'react';

const Dropdown: FC<DropdownProps> = (props) => {
    const { children, buttonContent, width = '100px', height = '100%', type, expandedWidth = 'auto' } = props;
    return (
        <div data-dropdown className={styles.dropdown} style={{ width }}>
            <Button data-dropdown-button navigationButton className={styles.dropdownButton}
                    data-default-width={width} data-expanded-width={expandedWidth} style={{ height }}>{buttonContent}</Button>
            {children}
        </div>
    );
};

export const DropdownGrid: FC<DropdownGridProps> = ({ children, columns, gap = 0, width = '100%', padding = '0' }) => {
    const style = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        width,
        padding,
        ...(typeof gap === 'number' ? { gridGap: `${gap}px` } : {}),
        ...(typeof gap === 'object' && gap?.col ? { gridColumnGap: `${gap?.col}px` } : {}),
        ...(typeof gap === 'object' && gap?.row ? { gridRowGap: `${gap?.row}px` } : {})
    };

    return (
        <ul data-dropdown-menu className={styles.dropdownGrid} style={style}>
            {children}
        </ul>
    );
};

export const DropdownItem: FC<DropdownItemProps> = ({ children }) => {
    return (
        <li className={styles.dropdownItem}>
            {children}
        </li>
    );
};

export const DropdownList: FC<DropdownListProps> = (props) => {
    const {
        children,
        flexDirection = 'column',
        textAlign = 'center',
        padding = '0',
        width = '100%'
    } = props;

    const style = {
        flexDirection,
        textAlign,
        padding,
        width
    };

    return (
        <ul data-dropdown-menu className={styles.dropdownList} style={style}>
            {children}
        </ul>
    );
};

export default Dropdown;