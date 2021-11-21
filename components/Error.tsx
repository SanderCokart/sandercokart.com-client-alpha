import styles from '@/styles/components/Error.module.scss';
import type {FC} from 'react';

interface Props {
    statusCode: number,
    title?: string
}

const Error: FC<Props> = ({ statusCode, title = 'An unexpected error has occurred' }) => {
    return (
        <div className={styles.flex}>
            <h1 className={styles.errorCode}>{statusCode}</h1>
            <hr className={styles.line}/>
            <h2 className={styles.errorMessage}>{statusCode === 404 ? 'This page does not exist' : title}</h2>
        </div>
    );
};

export default Error;