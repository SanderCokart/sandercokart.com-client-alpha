import {useForm, FormProvider} from 'react-hook-form';
import useSWR from 'swr';
import {ApiRolesRoute} from '@/constants/api-routes';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import MultiSelect from '@/components/formComponents/MultiSelect';
import {Button} from '@/components/Button';
import File from '@/components/formComponents/File';

const Test = () => {
    const form = useForm();
    const { data: rolesData, error: rolesError } = useSWR(ApiRolesRoute);

    const onSubmit = (formValues: any) => {
        console.log(formValues);
    };

    return (
        <>
            <FormProvider {...form}>
                <CenteredFormLayout title="Roles">
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
                        <File name="file" />
                        <Button type="submit">Submit</Button>
                    </form>
                </CenteredFormLayout>
            </FormProvider>
        </>
    );
};

export default Test;