import classnames from 'classnames';

import Spinner from '@/public/static/assets/animated/spinner.svg';

import styles from './Loader.module.scss';

interface DummyLoaderProps {
    transparent?: boolean;
    isVisible: boolean;
    text?: string;
    className?: string;
}

export const DummyLoader = ({ isVisible, transparent, text, className }: DummyLoaderProps) => {
    const classNames = classnames([
        styles.root,
        (transparent && styles.transparent),
        className
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