import type {ReactNode, CSSProperties} from 'react';

interface FlexProps {
    children: ReactNode;
    dir?: CSSProperties['flexDirection'];
    gap?: CSSProperties['gap'];
}

const Flex = (props: FlexProps) => {
    const {
        children,
        dir = 'row',
        gap = '0px'
    } = props;
    const style = {
        display: 'flex',
        flexDirection: dir,
        gap: gap
    } as CSSProperties;

    return (
        <div style={style}>
            {children}
        </div>
    );
};

export default Flex;