import type {FC} from 'react';
import styles from '@/styles/pages/404.module.scss';

const Page404:FC = () => {
    return (
        <div className={styles.flex}>
            <h1 className={styles.errorCode}>404</h1>
            <hr className={styles.line}/>
            <h2 className={styles.errorMessage}>This page does not exist</h2>
        </div>
    );
};

export default Page404;