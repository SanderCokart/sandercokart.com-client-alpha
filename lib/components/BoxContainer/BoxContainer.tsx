import type {ReactNode} from 'react';
import styles from './BoxContainer.module.scss';

interface BoxContainerProps {
    children: ReactNode;
}

const BoxContainer = (props: BoxContainerProps) => {
    return (
        <div className={styles.root}>
            {props.children}
        </div>
    );
};

export default BoxContainer;