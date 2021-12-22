import styles from '@/styles/components/Loader.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';

export const Loader: FC = () => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon="spinner"/>
            <h3 className={styles.text}>Loading</h3>
        </div>
    );
};

export default Loader;
