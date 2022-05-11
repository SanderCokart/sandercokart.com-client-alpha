import type {ReactNode} from 'react';
import styles from '@/components/PortalContainer/PortalContainer.module.scss';

interface PortalContainerProps {
    children: ReactNode;
}

const PortalContainer = ({ children }: PortalContainerProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default PortalContainer;