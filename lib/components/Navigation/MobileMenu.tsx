import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ReactNode} from 'react';

import type {FontAwesomeIconType} from '@/types/CustomTypes';


interface MobileMenuProps {
    children?: ReactNode;
    icon: FontAwesomeIconType;
    id?: string;
    name: string;
    onClick: () => void;
    showSpan?: boolean;
}


const MobileMenu = (props: MobileMenuProps) => {
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

export default MobileMenu;