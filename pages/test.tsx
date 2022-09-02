import {useForm, FormProvider} from 'react-hook-form';

import {Button} from '@/components/Button';
import Switch from '@/components/formComponents/Switch';

interface FormValues {
    test: boolean;
}

const Test = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            test: true
        }
    });
    const { formState: { isValid, isDirty }, handleSubmit, register, setError } = form;

    const onSubmitTest = handleSubmit(async (formValues) => {
        console.log(formValues);
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmitTest}>
                <Switch icons={{ type: 'different', on: 'volume-mute', off: 'volume-up' }}
                        registerFormHook={register('test')}
                        onToggle={state => console.log({ state })}/>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};

export default Test;