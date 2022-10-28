import type {ReactElement, ButtonHTMLAttributes} from 'react';

interface ConditionalWrapperButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    condition: boolean;
}

const ConditionalButtonWrapper = (props: ConditionalWrapperButtonProps) => {
    const { condition, children, ...restOfProps } = props;
    if (condition)
        return <button type="button" {...restOfProps}>{children}</button>;
    return children as ReactElement;
};

export default ConditionalButtonWrapper;