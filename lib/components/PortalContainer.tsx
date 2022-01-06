import type {FC} from 'react';
import styles from '@/styles/components/PortalContainer.module.scss';

const PortalContainer: FC = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default PortalContainer;