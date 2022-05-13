import {createContext, ReactNode, useState, useContext, useEffect} from 'react';
import {Models} from '@/types/ModelTypes';
import {useBooleanToggle} from '@/hooks/useToggle';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from 'react-responsive-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './ConfirmDeleteModal.module.scss';
import Input from '@/components/formComponents/Input/Input';
import {Button} from '@/components/Button/Button';

const DeleteConfirmationContext = createContext({});

interface DeleteConfirmationProviderProps {
    children: ReactNode;
}

const DeleteConfirmationProvider = <T extends Models>(props: DeleteConfirmationProviderProps) => {
    const [showDeleteModal, toggleDeleteModal] = useBooleanToggle(false);
    const [itemToDelete, setItemToDelete] = useState<T | null>(null);
    const [confirmationValue, setConfirmationValue] = useState('');

    return (
        <DeleteConfirmationContext.Provider value={{
            showDeleteModal,
            toggleDeleteModal,
            itemToDelete,
            setItemToDelete,
            confirmationValue,
            setConfirmationValue
        }}>
            {props.children}
        </DeleteConfirmationContext.Provider>
    );
};
//----------------------------------------------------------------------------------------------------------------------
export const useDeleteConfirmationContext = <T extends Models>() => useContext(DeleteConfirmationContext) as {
    showDeleteModal: boolean;
    toggleDeleteModal: () => void;
    itemToDelete: T;
    setItemToDelete: (itemToDelete: T) => void;
    confirmationValue: string;
    setConfirmationValue: (value: string) => void;
};

//----------------------------------------------------------------------------------------------------------------------
interface ConfirmDeleteModalProps<T> {
    keyOfModelToConfirm: keyof T;
    keyOfModelAsTitle: keyof T;
    confirmationErrorMessage: string;
    onSubmitDelete: () => void;
}

export const ConfirmDeleteModal = <T extends Models>(props: ConfirmDeleteModalProps<T>) => {
    const {
        showDeleteModal,
        itemToDelete,
        toggleDeleteModal,
        confirmationValue,
        setConfirmationValue
    } = useDeleteConfirmationContext<T>();

    const deleteUserForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            confirmation: Yup.string().test('must-match', props.confirmationErrorMessage, (value) => {
                // @ts-ignore TODO
                return value === itemToDelete[props.keyOfModelToConfirm];
            })
        })),
        defaultValues: {
            confirmation: ''
        }
    });
    const { register, handleSubmit, reset, formState: { isDirty } } = deleteUserForm;

    const handleCloseModal = () => {
        toggleDeleteModal();
    };

    useEffect(() => {
        if (!showDeleteModal) reset();
    }, [showDeleteModal, itemToDelete]);

    return (
        <Modal closeIcon={<FontAwesomeIcon fixedWidth icon="times"/>} open={showDeleteModal}
               onClose={handleCloseModal}>
            <FormProvider {...deleteUserForm}>
                <form noValidate onSubmit={handleSubmit(props.onSubmitDelete)}>
                    <header className={styles.header}>
                        <h2>{`Delete User ${itemToDelete?.[props.keyOfModelAsTitle]}`}</h2>
                    </header>
                    <main className={styles.main}>
                        <p>
                            Are you sure you want to delete this user?
                            <br/>
                            Please confirm by typing in the users email address.
                        </p>
                        {/*@ts-ignore TODO*/}
                        <Input autoFocus label={itemToDelete?.[props.keyOfModelToConfirm]}
                               registerFormHook={{ ...register('confirmation') }}
                               value={confirmationValue}
                               onChange={(e) => setConfirmationValue(e.target.value)}/>
                    </main>
                    <footer className={styles.footer}>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button disabled={!isDirty} type="submit">Delete</Button>
                    </footer>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default DeleteConfirmationProvider;