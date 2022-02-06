import type {FC, HTMLAttributes, ReactElement} from 'react';

interface ConditionalWrapperButtonProps {
    condition: boolean;
}

const ConditionalButtonWrapper: FC<ConditionalWrapperButtonProps & HTMLAttributes<HTMLButtonElement>> = (props) => {
    const { condition, children, ...restOfProps } = props;
    if (condition)
        return <button type="button" {...restOfProps}>{children}</button>;
    return children as ReactElement;
};

export default ConditionalButtonWrapper;