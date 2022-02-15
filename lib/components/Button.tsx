import styles from '@/styles/components/Button.module.scss';
import type {ButtonProps} from '@/types/PropTypes';
import Link from 'next/link';
import type {FC} from 'react';

const Button: FC<ButtonProps> = (props) => {
    const { type = 'button', className, navigationButton = false, href, ...restOfProps } = props;
    const classNames = [
        styles.button,
        className
    ];

    if (navigationButton) {
        classNames.push(styles.navigationButton);
    }

    if (href)
        return (
            <Link href={href}>
                <a className={classNames.join(' ')} {...restOfProps}/>
            </Link>
        );
    return <button className={classNames.join(' ')}
                   type={type} {...restOfProps} />;
};

export default Button;