import styles from '@/styles/components/Loader.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface LoaderProps {
    fullscreen?: boolean;
}

export const Loader = ({ fullscreen }: LoaderProps) => {
    return (
       <div className={styles.root}>

       </div>
    );
};

export default Loader;
