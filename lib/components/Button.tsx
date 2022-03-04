import styles from '@/styles/components/Button.module.scss';
import Link from 'next/link';
import type {ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    navigationButton?: boolean;
    type?: 'submit' | 'reset' | 'button';
    fullWidth?: boolean;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    navigationButton?: boolean;
    href: string;
    fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
    const { type = 'button', fullWidth = false, className, navigationButton = false, ...restOfProps } = props;
    const classNames = [
        styles.button,
        className,
        (fullWidth && styles.fullWidth),
        (navigationButton && styles.navigationButton)
    ];

    return <button className={classNames.join(' ')} type={type} {...restOfProps} />;

};

export const LinkButton = (props: LinkButtonProps) => {
    const { fullWidth = false, className, navigationButton = false, href, ...restOfProps } = props;
    const classNames = [
        styles.button,
        className,
        (fullWidth && styles.fullWidth),
        (navigationButton && styles.navigationButton)
    ];


    return (
        <Link href={props.href}>
            <a className={classNames.join(' ')} {...restOfProps}/>
        </Link>
    );
};