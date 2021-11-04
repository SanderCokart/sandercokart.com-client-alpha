import styles from '@/styles/components/formComponents/File.module.scss';
import type {FC} from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';

const FileTextContainer: FC<{ letGo?: boolean }> = ({ letGo = false }) => {
    const matches = useMediaQuery({ from: 'sm', option: 'down' });

    console.log(matches);


    return (
        <div className={styles.fileTextContainer}>
            <div className={styles.letGo}>
                <span>Let go!</span>
            </div>
            {matches ? <TabletAndUp/> : <Phone/>}
        </div>
    );
};

export default FileTextContainer;


const TabletAndUp: FC = () => {
    return (
        <div className={styles.tabletAndUp}>
            <span>Drag & drop a file here</span>
            <span>Or</span>
            <span>Click here</span>
        </div>
    );
};

const Phone: FC = () => {
    return (
        <div className={styles.phone}>
            <span>Click here and select a file</span>
        </div>
    );
};