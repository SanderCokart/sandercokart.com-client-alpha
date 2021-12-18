import Loader from '@/components/Loader';
import styles from '@/styles/pages/portal/Users.module.scss';
import {UserRowProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type {FC} from 'react';
import useUsers from '../../../hooks/useUsers';

const Users: FC = () => {
    const { users, isLoading, isError } = useUsers();

    if (isLoading) return <Loader/>;

    const keys = Object.keys(users[0]);
    keys.push('actions');

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
                {users?.map(user => (
                    <UserRow key={user.id} user={user}/>
                ))}
                </tbody>
            </table>
        </main>
    );
};

export default Users;

const UserRow: FC<UserRowProps> = ({ user }) => {

    const toCalendar = (date: string) => {
        return moment(date).calendar();
    };

    return (
        <tr>
            <td>{user.id}</td>
            <td><input type="text" value={user.name}/></td>
            <td>{user.email}</td>
            <td>{toCalendar(user.createdAt)}</td>
            <td>{toCalendar(user.updatedAt)}</td>
            <td>{toCalendar(user.emailVerifiedAt)}</td>
            <td>
                <ul>
                    {user.roles.map(role => (
                        <li key={role}>{role}</li>
                    ))}
                </ul>
            </td>
            <td className={styles.actions}>
                <button><FontAwesomeIcon icon="trash"/></button>
                <button><FontAwesomeIcon icon="pen"/></button>
            </td>
        </tr>
    );
};