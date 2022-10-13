import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import type {default as SwiperType} from 'swiper';
import {Mousewheel, Navigation, Keyboard} from 'swiper';
import {Swiper, useSwiper, SwiperSlide} from 'swiper/react';
import useSWRInfinite from 'swr/infinite';

import {LocalArticlePageRoute} from '@/constants/local-routes';

import useImage from '@/hooks/useFile';

import type {ArticleModel} from '@/types/ModelTypes';
import type {CursorPaginationResponse} from '@/types/ResponseTypes';

import styles from '@/styles/pages/Home.module.scss';

//<editor-fold desc="Swiper Navigation Buttons">
const Previous = ({ isBeginning }: { isBeginning: boolean }) => {
    const swiper = useSwiper();

    return (
        <button className={styles.prevButton} disabled={isBeginning} type="button" onClick={() => swiper.slidePrev()}>
            <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
    );
};

const Next = ({ isEnd }: { isEnd: boolean }) => {
    const swiper = useSwiper();

    return (
        <button className={styles.nextButton} disabled={isEnd} type="button" onClick={() => swiper.slideNext()}>
            <FontAwesomeIcon icon={faChevronRight}/>
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
    title: string;
}

const slidesPerView = 4;
const perPage = 10;
const offset = 1;

const RecentArticles = (props: RecentArticlesProps) => {
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const getKey = (pageIndex: any, previousPageData: any) => {
        if (pageIndex === 0)
            return props.url;
        return previousPageData?.links?.next;
    };

    const {
        data: responses,
        size,
        setSize
    } = useSWRInfinite<CursorPaginationResponse<ArticleModel[]>>(getKey, { fallback: props.fallback });

    const onSlideChange = (swiper: SwiperType) => {
        const indexToLoadAt = (size * perPage) - breakpoints[swiper.currentBreakpoint].slidesPerView - offset;

        if (swiper.activeIndex === indexToLoadAt)
            setSize(size => size + 1);

        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const breakpoints = {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
    };

    return (
        <div className={styles.container}>
            <Swiper keyboard
                    mousewheel
                    breakpoints={breakpoints}
                    className={styles.swiper}
                    modules={[Navigation, Mousewheel, Keyboard]}
                    navigation={{ prevEl: String(styles.prevButton), nextEl: String(styles.nextButton) }}
                    slidesPerView={slidesPerView}
                    spaceBetween={0}
                    onBeforeInit={(swiper: SwiperType) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={onSlideChange}
                    onSlidesLengthChange={() => {
                        setIsEnd(false);
                    }}>
                <Previous isBeginning={isBeginning}/>

                {responses?.map(response => {
                    return response.articles.map((article) => (
                        <SwiperSlide key={article.id} className={styles.slide}>
                            <Post post={article}/>
                        </SwiperSlide>
                    ));
                })}

                <Next isEnd={isEnd}/>

            </Swiper>
        </div>
    );
};

export default RecentArticles;