import {LinkButton} from '@/components/Button/Button';
import styles from './CreateFAB.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface CreateFABProps {
    href: string;
}

export default function CreateFAB({ href }: CreateFABProps) {
    return <LinkButton circle className={styles.createFAB} href={href}>
        <FontAwesomeIcon icon="plus"/>
    </LinkButton>;
}