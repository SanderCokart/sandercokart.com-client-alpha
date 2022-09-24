import {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import useSWR from 'swr';

import BoxContainer from '@/components/BoxContainer';
import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';
import MultiSelect from '@/components/formComponents/MultiSelect';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import useMediaQuery from '@/hooks/useMediaQuery';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {CreateUserFormValues} from '@/types/FormValueTypes';
import type {RoleModel} from '@/types/ModelTypes';

import styles from '@/styles/pages/portal/users/CreateUserPage.module.scss';

export default function CreateUserPage() {
    const { data: rolesData, error: rolesError } = useSWR<RoleModel[]>('/roles');
    const createUserForm = useForm<CreateUserFormValues>();
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

    const onSubmitUserCreateForm = handleSubmit(async (formValues) => {
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
    });

    return (
        <BoxContainer className={styles.root}>
            <FormProvider {...createUserForm}>
                <CenteredFormLayout title="Create user">
                    <form className={styles.form} onSubmit={onSubmitUserCreateForm}>
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
    );
}

CreateUserPage.requireAuth = true;