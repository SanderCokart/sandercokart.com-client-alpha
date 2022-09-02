import {useForm, FormProvider} from 'react-hook-form';

import Switch from '@/components/formComponents/Switch';

interface FormValues {
    test: boolean;
}

const Test = () => {
    const form = useForm<FormValues>();
    const { formState: { isValid, isDirty }, handleSubmit, register, setError } = form;

    const onSubmitTest = handleSubmit(async (formValues) => {

    });

    return (
        <FormProvider {...form}>
            <Switch/>
        </FormProvider>
    );
};

export default Test;