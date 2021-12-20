import styles from '@/styles/pages/portal/Portal.module.scss';
import type {FC} from 'react';
import Loader from '../../lib/components/Loader';
import useAuth from '../../lib/hooks/useAuth';

const Portal: FC = () => {
    const { isLoading } = useAuth({ middleware: 'auth' });

    if (isLoading) return <Loader/>;

    return (
        <div className={styles.portal}>
            <main className={styles.main}>

            </main>
        </div>
    );
};

export default Portal;