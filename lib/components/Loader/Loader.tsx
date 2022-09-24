import classnames from 'classnames';

import Spinner from '@/public/static/assets/animated/spinner.svg';

import styles from './Loader.module.scss';

interface DummyLoaderProps {
    transparent?: boolean;
    isVisible: boolean;
    text?: string;
}

export const DummyLoader = ({ isVisible, transparent, text }: DummyLoaderProps) => {
    const classNames = classnames([
        styles.root,
        (transparent && styles.transparent)
    ]);

    return isVisible ? (
        <div className={classNames}>
            <div className={text ? styles.centerWithText : styles.center}>
                <Spinner height={300} width={300}/>
                <span className={styles.text}>{text}</span>
            </div>
        </div>
    ) : null;
};