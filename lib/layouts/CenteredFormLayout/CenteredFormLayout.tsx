import styles from './CenteredFormLayout.module.scss';
import type {ReactNode} from 'react';

interface CenteredFormLayoutProps {
    children: ReactNode;
    title?: string;
    footer?: ReactNode;
}

const CenteredFormLayout = (props: CenteredFormLayoutProps) => {
    return (
        <div className={styles.root}>
            <div className={styles.box}>
                <header className={styles.header}>
                    <h1>{props.title}</h1>
                </header>
                <main className={styles.main}>
                    {props.children}
                </main>
                <footer className={styles.footer}>
                    {props.footer}
                </footer>
            </div>
        </div>
    );
};

export default CenteredFormLayout;