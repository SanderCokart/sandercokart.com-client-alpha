import type {ReactNode} from 'react';
import styles from './BoxContainer.module.scss';
import classnames from 'classnames';

interface BoxContainerProps {
    children: ReactNode;
    center?: boolean;
    className?: string;
}

const BoxContainer = (props: BoxContainerProps) => {
    const classNames = classnames([
        styles.root,
        (props.center && styles.center),
        (props.className && props.className)
    ]);

    return (
        <div className={classNames}>
            {props.center ?
             (<div>
                 {props.children}
             </div>) :
             (props.children)
            }
        </div>
    );
};

export default BoxContainer;