import styles from './CenteredFormLayout.module.scss';
import type {ReactNode} from 'react';
import Loader from '@/components/Loader/Loader';
import {useFormState} from 'react-hook-form';

interface CenteredFormLayoutProps {
    children: ReactNode;
    title?: string;
    footer?: ReactNode;
}

const CenteredFormLayout = (props: CenteredFormLayoutProps) => {
    const { isSubmitting } = useFormState();
    return (
        <div className={styles.root}>
            <div className={styles.box}>
                <Loader transparent visible={isSubmitting}/>
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