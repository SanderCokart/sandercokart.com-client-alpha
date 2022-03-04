import styles from '@/styles/pages/home/Home.module.scss';
import {Mousewheel, Navigation, Keyboard, default as SwiperType} from 'swiper';
import {Swiper, useSwiper, SwiperSlide} from 'swiper/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import useSWRInfinite from 'swr/infinite';
import Image from 'next/image';
import {CursorPaginationResponse} from '@/types/ResponseTypes';
import {ArticleModel} from '@/types/ModelTypes';
import useImage from '@/hooks/useImage';

interface RecentArticlesProps {
    url: string;
    title: string;
}

const RecentArticles = (props: RecentArticlesProps) => {
    const getKey = (pageIndex: any, previousPageData: any) => {
        return previousPageData ? previousPageData.links.next ? previousPageData.links.next : null : props.url;
    };

    const { data: responses, setSize, size } = useSWRInfinite<CursorPaginationResponse<ArticleModel[]>>(getKey);

    const onSlideChange = (swiper: SwiperType) => {
        const amountOfArticles = size * 10;
        if (swiper.activeIndex > amountOfArticles - 5) {
            setSize(size => size + 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{props.title}</h1>
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

interface PostProps {
    post: ArticleModel;
}

const Post = ({ post }: PostProps) => {
    const { getUrl } = useImage();
    const { url } = getUrl(post.banner);

    return (
        <div className={styles.post}>
            <figure className={styles.figure}>
                <Image priority unoptimized alt="alt" layout="fill" objectFit="cover" src={url}/>
                <figcaption className={styles.caption}>
                    <h1>{post.title}</h1>
                    <p>{post.excerpt}</p>
                </figcaption>
            </figure>

            <h1>{post.title}</h1>
        </div>
    );
};

export default RecentArticles;