import type {CSSProperties, ReactNode} from 'react';

export interface GridProps {
    children: ReactNode;
    columns?: number;
    alignment?: CSSProperties['placeItems'];
    gap?: CSSProperties['gap'];
}

const Grid = ({ columns = 3, alignment = 'center', gap = 0, children }: GridProps) => {
    return (
        <div style={{
            display: 'grid',
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            placeItems: alignment
        }}>{children}</div>
    );
};

export default Grid;

