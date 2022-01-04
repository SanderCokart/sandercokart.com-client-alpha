import NewCode from '@/components/MDXComponents/NewCode';
import styles from '@/styles/components/MDXComponents.module.scss';
import {Property} from 'csstype';
import NextImage from 'next/image';
import type {FC} from 'react';

const P: FC = (props) => <p className={styles.p} {...props}/>;

const Title: FC = (props) => <h1 className={styles.title} {...props}/>;

const H1: FC = (props) => <h1 className={styles.h1} {...props}/>;

const H2: FC = (props) => <h2 className={styles.h2} {...props}/>;

const H3: FC = (props) => <h3 className={styles.h3} {...props}/>;

const H4: FC = (props) => <h4 className={styles.h4} {...props}/>;

const Grid: FC<{ columns?: number, alignment?: Property.PlaceItems, gap?: number }> =
    ({ columns = 3, alignment = 'center', gap = 0, ...props }) =>
        <div style={{
            display: 'grid',
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            placeItems: alignment
        }} {...props}/>;

const Table: FC = (props) => <table className={styles.table} {...props}/>;

const A: FC = (props) => <a className={styles.a} {...props}/>;

const UL: FC = (props) => <ul className={styles.ul} {...props}/>;
const LI: FC = (props) => <li className={styles.li} {...props}/>;
const OL: FC = (props) => <ol className={styles.ol} {...props}/>;

const Image: FC = (props) => <img className={styles.img} {...props}/>;

const CustomImage: FC<{ src: string }> = (props) => (
    <div className={styles.imageWrapper}>
        <NextImage {...props} unoptimized height={300} layout="fill" objectFit="contain" width={300}/>
    </div>
);

const useMDXComponents = (isEditor = false) => {

    return {
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
        code: NewCode,
        img: isEditor ? Image : CustomImage
    };
};

export default useMDXComponents;