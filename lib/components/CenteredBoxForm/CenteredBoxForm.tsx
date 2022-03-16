import styles from './CenteredBox.module.scss';
import type {ReactNode} from 'react';
import type {UseFormProps} from 'react-hook-form';
import {useForm, FormProvider} from 'react-hook-form';

interface CenteredBoxProps {
    children: ReactNode;
    title?: string;
    footer?: ReactNode;
    formOptions?: UseFormProps;
    onSubmit: (formValues: any) => any;
}

const CenteredBoxForm = (props: CenteredBoxProps) => {
    const form = useForm(props.formOptions);
    const {handleSubmit} = form;

    return (
        <div className={styles.root}>
            <FormProvider {...form}>
                <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
                    <header className={styles.header}>
                        <h1>{props.title}</h1>
                    </header>
                    <main className={styles.main}>
                        {props.children}
                    </main>
                    <footer className={styles.footer}>
                        {props.footer}
                    </footer>
                </form>
            </FormProvider>
        </div>
    );
};

export default CenteredBoxForm;