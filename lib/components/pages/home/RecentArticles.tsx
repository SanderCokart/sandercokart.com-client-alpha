import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import type { default as SwiperType} from 'swiper';
import {Mousewheel, Navigation, Keyboard} from 'swiper';
import {Swiper, useSwiper, SwiperSlide} from 'swiper/react';
import useSWRInfinite from 'swr/infinite';

import {LocalArticlePageRoute} from '@/constants/local-routes';

import useImage from '@/hooks/useFile';

import type {ArticleModel} from '@/types/ModelTypes';
import type {CursorPaginationResponse} from '@/types/ResponseTypes';


import styles from '@/styles/pages/Home.module.scss';

//<editor-fold desc="Swiper Navigation Buttons">
const Previous = () => {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(true);
    swiper.on('slideChange', (swiper) => {
        if (swiper.isBeginning === isBeginning) return;
        setIsBeginning(swiper.isBeginning);
    });
    return (
        <button className={styles.prevButton} disabled={isBeginning} type="button" onClick={() => swiper.slidePrev()}>
            <FontAwesomeIcon icon="chevron-left"/>
        </button>
    );
};

const Next = () => {
    const swiper = useSwiper();
    const [isEnd, setIsEnd] = useState(false);
    swiper.on('slideChange', (swiper) => {
        if (swiper.isEnd === isEnd) return;
        setIsEnd(swiper.isEnd);
    });
    return (
        <button className={styles.nextButton} disabled={isEnd} type="button" onClick={() => swiper.slideNext()}>
            <FontAwesomeIcon icon="chevron-right"/>
        </button>
    );
};

//</editor-fold>

interface PostProps {
    post: ArticleModel;
}

const Post = ({ post }: PostProps) => {
    const { getUrl } = useImage();
    const { url } = getUrl(post.banner);

    return (
        <Link href={LocalArticlePageRoute('posts', post.slug)}>
            <a>
                <div className={styles.post}>
                    <figure className={styles.figure}>
                        <Image priority alt="alt" layout="fill" objectFit="cover" src={url}/>
                        <figcaption className={styles.caption}>
                            <h1 className={styles.captionTitle} title={post.title}>{post.title}</h1>
                            <p className={styles.captionExcerpt}>{post.excerpt}</p>
                        </figcaption>
                    </figure>

                    <h1>{post.title}</h1>
                </div>
            </a>
        </Link>
    );
};

interface RecentArticlesProps {
    url: string;
    fallback: { [key: string]: any };
}

const RecentArticles = (props: RecentArticlesProps) => {
    const getKey = (pageIndex: any, previousPageData: any) => {
        return previousPageData ? previousPageData.links.next ? previousPageData.links.next : null : props.url;
    };

    const {
        data: responses,
        setSize,
        size
    } = useSWRInfinite<CursorPaginationResponse<ArticleModel[]>>(getKey, { fallback: props.fallback });

    const onSlideChange = (swiper: SwiperType) => {
        const amountOfArticles = size * 10;
        if (swiper.activeIndex > amountOfArticles - 5) {
            setSize(size => size + 1);
        }
    };

    return (
        <div className={styles.container}>
            <Swiper keyboard
                    mousewheel
                    className={styles.swiper}
                    modules={[Navigation, Mousewheel, Keyboard]}
                    navigation={{ nextEl: String(styles.nextButton), prevEl: String(styles.prevButton) }}
                    slidesPerView="auto"
                    spaceBetween={8}
                    onSlideChange={onSlideChange}>
                <Previous/>

                {responses?.map(response => {
                    return response.articles.map((article) => (
                        <SwiperSlide key={article.id} className={styles.slide}>
                            <Post post={article}/>
                        </SwiperSlide>
                    ));
                })}

                <Next/>

            </Swiper>
        </div>
    );
};


export default RecentArticles;