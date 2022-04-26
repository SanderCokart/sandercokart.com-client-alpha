import {useForm, FormProvider} from 'react-hook-form';
import useSWR from 'swr';
import BoxContainer from '@/components/BoxContainer';
import styles from '@/styles/pages/portal/users/CreateUserPage.module.scss';
import axios from '@/functions/shared/axios';
import {CreateUserFormValues} from '@/types/FormValueTypes';
import setFormErrors from '@/functions/client/setFormErrors';
import Input from '@/components/formComponents/Input';
import useMediaQuery from '@/hooks/useMediaQuery';
import {Button} from '@/components/Button';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import useAuthPage from '@/hooks/useAuthPage';
import Loader from '@/components/Loader';
import MultiSelect from '../../../lib/components/formComponents/MultiSelect';
import {RoleModel} from '../../../lib/types/ModelTypes';
import {useEffect} from 'react';

export default function CreateUserPage() {
    const visible = useAuthPage();
    const { data: rolesData, error: rolesError } = useSWR<RoleModel[]>('/roles');
    const createUserForm = useForm();
    const { handleSubmit, setValue, setError, formState: { isDirty }, register, reset } = createUserForm;
    const isMobile = useMediaQuery({ from: 'sm', option: 'down' });

    useEffect(() => {
        if (rolesData) {
            reset({
                roles: rolesData?.filter(role => role.name === 'User')
            });
        }
    }, [rolesData]);

    if (isMobile) return (
        <BoxContainer center>
            <h1>Please use a desktop computer.</h1>
        </BoxContainer>
    );

    async function onSubmitUserCreateForm(formValues: CreateUserFormValues) {
        const response = await axios.simplePost('/users', {
            ...formValues,
            roles: formValues.roles.map(role => role.id)
        });
        switch (response.type) {
            case 'form':
                setFormErrors(setError, response.errors);
                break;
            case 'success':
                reset();
                break;
        }
    }

    return (
        <>
            <Loader visible={visible}/>
            <BoxContainer className={styles.root}>
                <FormProvider {...createUserForm}>
                    <CenteredFormLayout title="Create user">
                        <form className={styles.form} onSubmit={handleSubmit(onSubmitUserCreateForm)}>
                            <Input label="Name" registerFormHook={{ ...register('name') }}/>
                            <Input label="Email" registerFormHook={{ ...register('email') }}/>
                            <Input label="Password" registerFormHook={{ ...register('password') }}/>
                            <MultiSelect displayValue="name"
                                         loading={!rolesData && !rolesError}
                                         name="roles"
                                         options={rolesData}
                                         selectedValues={createUserForm.control._defaultValues.roles}
                                         setValue={setValue}/>
                            <Button disabled={!isDirty} type="submit">Submit</Button>
                        </form>
                    </CenteredFormLayout>
                </FormProvider>
            </BoxContainer>
        </>
    );
}