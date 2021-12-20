import styles from '@/styles/pages/portal/Users.module.scss';
import type {UserRowProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type {FC} from 'react';
import Skeleton from 'react-loading-skeleton';
import Loader from '../../../lib/components/Loader';
import useAuth from '../../../lib/hooks/useAuth';
import useUsers from '../../../lib/hooks/useUsers';

const Users: FC = () => {
    const { users, isLoading, nextPage, prevPage, hasMore, hasLess } = useUsers();
    const { isLoading: authLoading } = useAuth({ middleware: 'auth' });


    if (authLoading) return <Loader/>;

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
                    <UserRow key={user.id} user={user}/>
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

const UserRow: FC<UserRowProps> = ({ user }) => {

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
                    <button><FontAwesomeIcon icon="trash"/></button>
                    <button><FontAwesomeIcon icon="pen"/></button>
                </div>
            </td>
        </tr>
    );
};