import Image from 'next/image';
import Link from 'next/link';

import useImage from '@/hooks/useFile';

import type {ArticleModel} from '@/types/ModelTypes';

import styles from '@/styles/layouts/blog/RecentPostLayout.module.scss';

interface RecentPostLayoutProps {
    post: ArticleModel;
}

const RecentPostLayout = ({ post }: RecentPostLayoutProps) => {
    const { getUrl } = useImage();
    const { url, isPrivate } = getUrl(post.banner);

    return (
        <Link href={'/blog/posts/' + post.slug}>
            <a key={post.id} className={styles.post}>
                <figure className={styles.figure}>

                    {post.banner &&
                        <Image alt="banner" layout="fill" objectFit="cover" priority={true} quality={100} src={url}
                               unoptimized={isPrivate}/>
                    }

                    <figcaption className={styles.caption}>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.excerpt}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Distinctio, nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
                            quod!</p>
                    </figcaption>
                </figure>
            </a>
        </Link>
    );
};

export default RecentPostLayout;