import classnames from 'classnames';
import type {ReactNode, HTMLAttributes} from 'react';

import styles from '@/components/PortalContainer/PortalContainer.module.scss';

interface PortalContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const PortalContainer = (props: PortalContainerProps) => {
    const { children, className, ...restOfProps } = props;
    return (
        <div className={classnames([styles.container, props.className])} {...restOfProps}>
            {children}
        </div>
    );
};

export default PortalContainer;