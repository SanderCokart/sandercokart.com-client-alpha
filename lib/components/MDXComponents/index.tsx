import Code from '@/components/MDXComponents/Code';
import styles from '@/styles/components/MDXComponents.module.scss';
import {Property} from 'csstype';
import type {FC} from 'react';

export const P: FC = (props) => <p className={styles.p} {...props}/>;

export const Title: FC = (props) => <h1 className={styles.title} {...props}/>;

export const H1: FC = (props) => <h1 className={styles.h1} {...props}/>;

export const H2: FC = (props) => <h2 className={styles.h2} {...props}/>;

export const H3: FC = (props) => <h3 className={styles.h3} {...props}/>;

export const H4: FC = (props) => <h4 className={styles.h4} {...props}/>;

export const Grid: FC<{ rows?: string, columns?: string, alignment?: Property.PlaceItems }> =
    ({ rows = undefined, columns = '1fr 1fr 1fr', alignment = 'center', ...props }) =>
        <div style={{
            display: 'grid',
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            placeItems: alignment
        }} {...props}/>;

export const Table: FC = (props) => <table className={styles.table} {...props}/>;

export const A: FC = (props) => <a className={styles.a} {...props}/>;

export const UL: FC = (props) => <ul className={styles.ul} {...props}/>;
export const LI: FC = (props) => <li className={styles.li} {...props}/>;
export const OL: FC = (props) => <ol className={styles.ol} {...props}/>;


export const MDXComponents = {
    p: P,
    Title,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    Grid,
    table: Table,
    a: A,
    ul: UL,
    li: LI,
    ol: OL,
    code: Code,
};
export default MDXComponents;