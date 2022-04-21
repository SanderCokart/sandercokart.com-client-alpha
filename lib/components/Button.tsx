import styles from '@/styles/components/Button.module.scss';
import Link from 'next/link';
import type {ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';
import classnames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    navigationButton?: boolean;
    type?: 'submit' | 'reset' | 'button';
    fullWidth?: boolean;
    circle?: boolean;
    backgroundColor?: string;
    textColor?: string;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    navigationButton?: boolean;
    href: string;
    fullWidth?: boolean;
    circle?: boolean;
    backgroundColor?: string;
    textColor?: string;
}

export const Button = (props: ButtonProps) => {
    const {
        type = 'button',
        fullWidth = false,
        className,
        navigationButton = false,
        circle = false,
        ...restOfProps
    } = props;


    const classNames = classnames(
        styles.button,
        className,
        (fullWidth && styles.fullWidth),
        (navigationButton && styles.navigationButton),
        (circle && styles.circularButton)
    );

    return <button className={classNames} type={type} {...restOfProps} />;

};

export const LinkButton = (props: LinkButtonProps) => {
    const {
        fullWidth = false,
        className,
        navigationButton = false,
        href,
        circle,
        ...restOfProps
    } = props;
    const classNames = classnames(
        styles.button,
        (fullWidth && styles.fullWidth),
        (navigationButton && styles.navigationButton),
        (circle && styles.circularButton),
        className
    );

    return (
        <Link href={props.href}>
            <a className={classNames} {...restOfProps}/>
        </Link>
    );
};