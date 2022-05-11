import styles from './Error.module.scss';

interface ErrorProps {
    statusCode: number,
    title?: string
}

const Error = ({ statusCode, title = 'An unexpected error has occurred' }: ErrorProps) => {
    return (
        <div className={styles.flex}>
            <h1 className={styles.errorCode}>{statusCode}</h1>
            <hr className={styles.line}/>
            <h2 className={styles.errorMessage}>{statusCode === 404 ? 'This page does not exist' : title}</h2>
        </div>
    );
};

export default Error;