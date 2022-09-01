import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {ReactNode} from 'react';
import {useState} from 'react';
import {Mousewheel, Navigation, Keyboard} from 'swiper';
import type {SwiperProps, SwiperSlideProps} from 'swiper/react';
import {Swiper, useSwiper, SwiperSlide} from 'swiper/react';

import styles from './CustomSwiper.module.scss';


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

interface CustomSwiperProps extends SwiperProps {
    children: ReactNode;
}

export const CustomSwiper = (props: CustomSwiperProps) => {
    return (
        <Swiper keyboard
                mousewheel
                className={classnames([styles.swiper, props.className])}
                modules={[Navigation, Mousewheel, Keyboard]}
                navigation={{ nextEl: String(styles.nextButton), prevEl: String(styles.prevButton) }}
                slidesPerView="auto"
                spaceBetween={8}
                {...props}>
            <Previous/>
            {props.children}
            <Next/>
        </Swiper>
    );
};

interface CustomSwiperSlideProps extends SwiperSlideProps {

}

export const CustomSwiperSlide = (props: CustomSwiperSlideProps) => {
    return (
        <SwiperSlide className={classnames([styles.slide, props.className])} {...props}>
            {props.children}
        </SwiperSlide>
    );
};
