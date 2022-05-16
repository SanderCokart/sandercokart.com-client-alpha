import styles from './MDXComponents.module.scss';
import {Property} from 'csstype';
import NextImage from 'next/image';
import {withChildren} from '@/types/CustomTypes';
import Code from '@/components/MDXComponents/Code';

const P = (props: withChildren) => <p className={styles.p} {...props}/>;

const Title = (props: withChildren) => <h1 className={styles.title} {...props}/>;

const H1 = (props: withChildren) => <h1 className={styles.h1} {...props}/>;

const H2 = (props: withChildren) => <h2 className={styles.h2} {...props}/>;

const H3 = (props: withChildren) => <h3 className={styles.h3} {...props}/>;

const H4 = (props: withChildren) => <h4 className={styles.h4} {...props}/>;

interface GridProps {
    columns?: number,
    alignment?: Property.PlaceItems,
    gap?: number
};

const Grid =
    ({
         columns = 3,
         alignment = 'center',
         gap = 0,
         ...props
     }: GridProps) =>
        <div style={{
            display: 'grid',
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            placeItems: alignment
        }} {...props}/>;

const Table = (props: withChildren) => <table className={styles.table} {...props}/>;

const A = (props: withChildren) => <a className={styles.a} {...props}/>;

const UL = (props: withChildren) => <ul className={styles.ul} {...props}/>;
const LI = (props: withChildren) => <li className={styles.li} {...props}/>;
const OL = (props: withChildren) => <ol className={styles.ol} {...props}/>;

//@ts-ignore
const Image = (props: withChildren & Partial<HTMLImageElement>) => <img {...props} alt={props.alt}
                                                                        className={styles.img} title={props.alt}/>;

const CustomImage = (props: withChildren & { src: string; }) => (
    <div className={styles.imageWrapper}>
        <NextImage {...props} layout="fill" objectFit="contain"
                   unoptimized={props.src.includes('/files') || props.src.includes('unsplash.it')}/>
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
        code: Code,
        img: isEditor ? Image : CustomImage
    };
};

export default useMDXComponents;
