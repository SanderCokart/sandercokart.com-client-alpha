import Loader from '@/components/Loader';
import useUsers from '@/hooks/useUsers';
import styles from '@/styles/pages/portal/users/Users.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import {UserModel, RoleModel} from '@/types/ModelTypes';
import useAuthPage from '@/hooks/useAuthPage';
import {Button} from '@/components/Button';
import CreateFAB from '@/components/CreateFAB';
import {LocalPortalUsersCreatePageRoute} from '@/constants/local-routes';
import {Modal} from 'react-responsive-modal';
import {useBooleanToggle} from '@/hooks/useToggle';
import {useState} from 'react';
import Input from '@/components/formComponents/Input';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';

const Users = () => {
    const {
        users,
        isLoading,
        nextPage,
        prevPage,
        hasMore,
        hasLess,
        handleDeleteUser
    } = useUsers();
    const visible = useAuthPage();
    const deleteUserForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email_confirmation: Yup.string().test('email-match', 'Email must match', (value) => {
                return value === userToDelete?.email;
            })
        })),
        defaultValues: {
            email_confirmation: ''
        }
    });
    const { register, handleSubmit, reset, formState: { isDirty } } = deleteUserForm;

    const keys = ['id', 'name', 'email', 'roles', 'createdAt', 'updatedAt', 'emailVerifiedAt', 'actions'];

    const [showDeleteModal, toggleDeleteModal] = useBooleanToggle(false);
    const [userToDelete, setUserToDelete] = useState<UserModel | null>(null);
    const [deleteConfirmValue, setDeleteConfirmValue] = useState('');


    const closeModal = () => {
        toggleDeleteModal();
        reset();
    };

    const openModal = (user: UserModel) => {
        toggleDeleteModal();
        setUserToDelete(user);
    };

    const onSubmitUserDelete = () => {
        handleDeleteUser(userToDelete);
        closeModal();
        reset();
    };

    return (
        <>
            <Loader visible={visible}/>
            <main className={styles.users}>
                <table>
                    <thead>
                    <tr>
                        {keys.map(key => (
                            <td key={key}>{key}</td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>

                    {isLoading ? [...Array(100)].map((_, index) => (
                        <tr key={index}>
                            {[...Array(8)].map((_, index2) =>
                                <td key={index2}><Skeleton width="100%"/></td>
                            )}
                        </tr>
                    )) : users.map(user => (
                        <UserRow key={user.id} openModal={openModal} user={user}/>
                    ))}

                    </tbody>
                </table>

                <div className={styles.pageControls}>
                    <button disabled={!hasLess} onClick={prevPage}>
                        <FontAwesomeIcon icon="arrow-left"/>
                    </button>
                    <button disabled={!hasMore} onClick={nextPage}>
                        <FontAwesomeIcon icon="arrow-right"/>
                    </button>
                </div>
                <CreateFAB href={LocalPortalUsersCreatePageRoute}/>
            </main>


            <Modal closeIcon={<FontAwesomeIcon fixedWidth icon="times"/>} open={showDeleteModal}
                   onClose={closeModal}>
                <FormProvider {...deleteUserForm}>
                    <form noValidate onSubmit={handleSubmit(onSubmitUserDelete)}>
                        <header className={styles.modalHeader}>
                            <h2>Delete User {userToDelete?.name}</h2>
                        </header>
                        <main className={styles.modalMain}>
                            <p>
                                Are you sure you want to delete this user?
                                <br/>
                                Please confirm by typing in the users email address.
                            </p>
                            <Input autoFocus label={userToDelete?.email}
                                   registerFormHook={{ ...register('email_confirmation') }}
                                   value={deleteConfirmValue}
                                   onChange={(e) => setDeleteConfirmValue(e.target.value)}/>
                        </main>
                        <footer className={styles.modalFooter}>
                            <Button onClick={() => closeModal()}>Cancel</Button>
                            <Button disabled={!isDirty} type="submit">Delete</Button>
                        </footer>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};


interface UserRowProps {
    user: UserModel;
    openModal: (user: UserModel) => void;
}

const UserRow = ({ user, openModal }: UserRowProps) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <ul>
                    {user.roles?.map((role: RoleModel) => (
                        <li key={role.id} className={styles.roleTag}>{role.name}</li>
                    ))}
                </ul>
            </td>
            <td>{moment(user.createdAt).calendar()}</td>
            <td>{moment(user.updatedAt).calendar()}</td>
            <td>{user.emailVerifiedAt ? moment(user.emailVerifiedAt).calendar() : 'Unverified'}</td>

            <td className={styles.actions}>
                <Button circle onClick={() => openModal(user)}>
                    <FontAwesomeIcon fixedWidth icon="trash"/>
                </Button>
            </td>
        </tr>
    );
};

export default Users;
