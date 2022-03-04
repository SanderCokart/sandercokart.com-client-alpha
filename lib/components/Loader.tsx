import styles from '@/styles/components/Loader.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface LoaderProps {
    absolute?: boolean;
}

export const Loader = ({ absolute }: LoaderProps) => {
    return (
        <div className={styles.container} style={{ position: absolute ? 'absolute' : 'revert' }}>
            <FontAwesomeIcon icon="spinner"/>
            <h3 className={styles.text}>Loading</h3>
        </div>
    );
};

export default Loader;
