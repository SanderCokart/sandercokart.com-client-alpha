import useImage from '@/hooks/useImage';
import styles from '@/styles/layouts/blog/RecentPostLayout.module.scss';
import {RecentPostLayoutProps} from '@/types/PropTypes';
import Image from 'next/image';
import type {FC} from 'react';

const RecentPostLayout: FC<RecentPostLayoutProps> = ({ post }) => {
    const { url } = useImage(post.banner);


    return (
        <div key={post.id} className={styles.post}>
            <figure className={styles.figure}>

                {post.banner &&
                    <Image priority alt="banner" layout="fill" objectFit="cover" quality={25}
                           src={url}/>
                }

                <figcaption className={styles.caption}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Distinctio, nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
                        quod!</p>
                </figcaption>
            </figure>
        </div>
    );
};

export default RecentPostLayout;