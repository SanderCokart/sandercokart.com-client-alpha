import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import type {FontAwesomeIconType} from '@/types/CustomTypes';

interface MobileItemProps {
    href: string;
    icon: FontAwesomeIconType;
    name: string;
    onClick: () => void;
}

const MobileItem = (props: MobileItemProps) => {
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

export default MobileItem;