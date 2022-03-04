import type {HTMLAttributes, ReactElement} from 'react';

interface ConditionalWrapperButtonProps extends HTMLAttributes<HTMLButtonElement> {
    condition: boolean;
}

const ConditionalButtonWrapper = (props: ConditionalWrapperButtonProps) => {
    const { condition, children, ...restOfProps } = props;
    if (condition)
        return <button type="button" {...restOfProps}>{children}</button>;
    return children as ReactElement;
};

export default ConditionalButtonWrapper;