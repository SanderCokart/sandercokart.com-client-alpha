import {useForm, FormProvider} from 'react-hook-form';
import useSWR from 'swr';
import {ApiRolesRoute} from '@/constants/api-routes';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import MultiSelect from '@/components/formComponents/MultiSelect';
import {Button} from '@/components/Button';

const options = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
];


const Test = () => {
    const form = useForm({
        defaultValues: {
            roles: []
        }
    });
    const { data: rolesData, error: rolesError } = useSWR(ApiRolesRoute);

    const onSubmit = (formValues: typeof options[]) => {
        console.log(formValues);
    };

    return (
        <>
            <FormProvider {...form}>
                <CenteredFormLayout title="Roles">
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
                        <MultiSelect displayValue="name" loading={!rolesData && !rolesError} name="roles" options={rolesData}
                                     setValue={form.setValue}/>
                        <Button type="submit">Submit</Button>
                    </form>
                </CenteredFormLayout>
            </FormProvider>
        </>
    );
};

export default Test;