import type {ReactNode, HTMLAttributes} from 'react';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    baseColor?: string;
    accentColor?: string;
    size?: string;
}

export const IconButton = (props: IconButtonProps) => {
    const {
        icon,
        baseColor = 'var(--bg-contrast-text)',
        accentColor = 'var(--acc)',
        size = '1rem',
        className,
        ...restOfProps
    } = props;
    return (
        <button className={['iconButton', className].join(' ')} type="button" {...restOfProps}>
            <style jsx>{`
            .iconButton {
                background-color: transparent;
                color: ${baseColor};
                border: none;
                outline: none;
                font-size: ${size};
                cursor:pointer;
                transition: color 150ms ease;
                display: block;
            }
            
            .iconButton:hover {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            
            .iconButton:active {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            
            .iconButton:focus {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            `}</style>
            {icon}
        </button>
    );
};

interface IconButtonWithLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    icon: ReactNode;
    baseColor?: string;
    accentColor?: string;
    href: string;
    size?: string;
}

export const IconButtonWithLink = (props: IconButtonWithLinkProps) => {
    const {
        icon,
        size = '1rem',
        baseColor = 'var(--bg-contrast-text)',
        accentColor = 'var(--acc)', href, ...restOfProps
    } = props;
    return (
        <a className="iconButton" href={href} {...restOfProps}>
            <style jsx>{`
            .iconButton {
                background-color: transparent;
                color: ${baseColor};
                border: none;
                outline: none;
                font-size: ${size};
                cursor:pointer;
                transition: color 150ms ease, transform 150ms ease;
                display: block;
            }
            
            .iconButton:hover {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            
            .iconButton:active {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            
            .iconButton:focus {
                color: ${accentColor};
                filter: drop-shadow(0 0 4px ${baseColor});
                transform:scale(1.2);
            }
            `}</style>
            {icon}
        </a>
    );
};

// button {
// @include utils.defaultButton;
//     padding: 0;
//     width: auto;
//     display: block;
//     background-color: transparent;
//     transition: color 150ms ease, transform 150ms ease;
//
// &:hover, &:active, &:focus {
//         background-color: transparent;
//         color: var(--acc);
//     }
// }