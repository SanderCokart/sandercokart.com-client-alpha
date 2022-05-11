import styles from './Loader.module.scss';
import Spinner from '@/public/static/assets/animated/spinner.svg';

interface LoaderProps {
    transparent?: boolean;
    visible: boolean;
}

export const Loader = (props: LoaderProps) => {
    const classNames = [
        styles.root,
        (props.transparent && styles.transparent)
    ];

    if (props.visible) {
        return (
            <div className={classNames.join(' ')}>
                <Spinner height={300} width={300}/>
            </div>
        );
    }
    return null;
};

export default Loader;
