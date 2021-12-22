import Loader from '@/components/Loader';
import useUsers from '@/hooks/useUsers';
import styles from '@/styles/pages/portal/Users.module.scss';
import type {UserRowProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type {FC} from 'react';
import Skeleton from 'react-loading-skeleton';

const Users: FC = () => {
    const { users, isLoading, nextPage, prevPage, hasMore, hasLess, onDelete, onEdit } = useUsers();

    const keys = ['id', 'name', 'email', 'roles', 'createdAt', 'updatedAt', 'emailVerifiedAt', 'actions'];

    return (
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
                            <td key={index2}><Skeleton baseColor="#222" width="100%"/></td>
                        )}
                    </tr>
                )) : users.map(user => (
                    <UserRow key={user.id} user={user} onDelete={onDelete} onEdit={onEdit}/>
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
        </main>
    );
};

export default Users;

const UserRow: FC<UserRowProps> = ({ user, onDelete, onEdit }) => {

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <ul>
                    {user.roles.map(role => (
                        <li key={role} className={styles.roleTag}>{role}</li>
                    ))}
                </ul>
            </td>
            <td>{moment(user.createdAt).calendar()}</td>
            <td>{moment(user.updatedAt).calendar()}</td>
            <td>{moment(user.emailVerifiedAt).calendar()}</td>

            <td className={styles.actions}>
                <div>
                    <button type="button" onClick={() => onDelete(user.id)}><FontAwesomeIcon icon="trash"/></button>
                    <button type="button" onClick={() => onEdit(user.id)}><FontAwesomeIcon icon="pen"/></button>
                </div>
            </td>
        </tr>
    );
};