import PaginatedModelProvider, {usePaginatedContext, PageControls} from '@/providers/PaginatedModelProvider';
import useAuthPage from '@/hooks/useAuthPage';
import Loader from '@/components/Loader/Loader';
import {LocalPortalUsersCreatePageRoute} from '@/constants/local-routes';
import CreateFAB from '@/components/CreateFAB';
import styles from '@/styles/pages/portal/PortalTable.module.scss';
import Skeleton from 'react-loading-skeleton';
import {UserModel} from '@/types/ModelTypes';
import moment from 'moment';
import {Button} from '@/components/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DeleteConfirmationContextProvider, {
    useDeleteConfirmationContext,
    ConfirmDeleteModal
} from '@/providers/DeleteConfirmationProvider';
import axios from '@/functions/shared/axios';
import {ApiUsersRoute} from '@/constants/api-routes';

interface UserRowProps {
    user: UserModel,
}

const UserRow = ({ user }: UserRowProps) => {
    const { toggleDeleteModal, setItemToDelete } = useDeleteConfirmationContext<UserModel>();

    const handleTrashClick = () => {
        toggleDeleteModal();
        setItemToDelete(user);
    };

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <ul>
                    {user.roles?.map(role => (
                        <li key={role.id} className={styles.roleChip}>{role.name}</li>
                    ))}
                </ul>
            </td>
            <td>{moment(user.created_at).calendar()}</td>
            <td>{moment(user.updated_at).calendar()}</td>
            <td>{user.email_verified_at ? moment(user.email_verified_at).calendar() : 'Unverified'}</td>
            <td className={styles.actions}>
                <Button circle onClick={handleTrashClick}>
                    <FontAwesomeIcon fixedWidth icon="trash"/>
                </Button>
            </td>
        </tr>
    );
};


function UsersTable() {
    const { data, isLoading, mutate } = usePaginatedContext<UserModel>();

    const { itemToDelete, toggleDeleteModal} = useDeleteConfirmationContext<UserModel>();

    const columnNames = ['id', 'name', 'email', 'roles', 'created_at', 'updated_at', 'email_verified_at', 'actions'];

    const handleSubmitDeleteUser = async () => {
        await axios.simpleDelete(ApiUsersRoute(itemToDelete.id));
        await mutate(currentValue => {
            if (currentValue) return {
                ...currentValue,
                users: currentValue.users.filter((user: UserModel) => user !== itemToDelete)
            };
        });
        toggleDeleteModal();
    };

    return (
        <main className={styles.table}>
            <table>
                <colgroup>
                    <col width="100"/>
                    <col width="100"/>
                    <col width="100"/>
                    <col width="100"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="100"/>
                </colgroup>
                <thead>
                <tr>
                    {columnNames.map((columnName) => (
                        <th key={columnName}>{columnName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ? [...Array(100)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td colSpan={8}><Skeleton height="100%" width="100%"/></td>
                    </tr>
                )) : data.map(user => (
                    <UserRow key={user.id} user={user}/>
                ))}
                </tbody>
            </table>

            <PageControls/>
            <ConfirmDeleteModal<UserModel>
                confirmationErrorMessage="Email must match"
                keyOfModelAsTitle="name"
                keyOfModelToConfirm="email"
                onSubmitDelete={handleSubmitDeleteUser}/>
        </main>
    );
}

const UsersPortalPage = () => {
    const visible = useAuthPage();

    return (
        <PaginatedModelProvider middleware="auth" resourceDataKey="users" url="/users">
            <Loader visible={visible}/>
            <DeleteConfirmationContextProvider<UserModel>>
                <UsersTable/>
            </DeleteConfirmationContextProvider>
            <CreateFAB href={LocalPortalUsersCreatePageRoute}/>
        </PaginatedModelProvider>
    );
};
export default UsersPortalPage;