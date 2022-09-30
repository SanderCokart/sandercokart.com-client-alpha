import type {IconLookup} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface MobileItemProps {
    href: string;
    icon: IconLookup;
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