import {useForm, FormProvider} from 'react-hook-form';
import {Button} from '@/components/Button';
import File from '@/components/formComponents/NewFile';
import styles from '@/styles/pages/test.module.scss';
import useSWR from 'swr';
import {ApiArticleShowRoute} from '@/constants/api-routes';
import {useEffect} from 'react';
import {ArticleModel, FileModel} from '@/types/ModelTypes';

const Test = () => {
    const { data } = useSWR<ArticleModel>(ApiArticleShowRoute('posts', 'litzy-wolf'));
    const form = useForm({
        defaultValues: {
            banner: [] as FileModel[]
        }
    });

    const onSubmit = (formValues: any) => {
        console.log(formValues);
    };

    useEffect(() => {
        form.reset({
            banner: data?.banner ? [data.banner] : [] as FileModel[]
        });
    }, [data]);

    return (
        <FormProvider {...form}>
            <form noValidate className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                <File multiple name="banner"/>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};

export default Test;