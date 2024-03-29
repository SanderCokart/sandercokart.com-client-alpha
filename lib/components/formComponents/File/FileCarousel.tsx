import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {useFormContext} from 'react-hook-form';
import {Mousewheel, Keyboard} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Button} from '@/components/Button';

import {ApiDeleteFilesDestroyRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import useImage from '@/hooks/useFile';

import type {FileModel} from '@/types/ModelTypes';

import styles from './FileCarousel.module.scss';

interface CarouselItemProps {
    name: string;
    file: FileModel;
}

function CarouselItem(props: CarouselItemProps) {
    const { getUrl } = useImage();
    const { url } = getUrl(props.file);
    const { setValue, getValues, control: { _defaultValues } } = useFormContext();

    const deleteItem = async () => {
        setValue(props.name, [...getValues(props.name).filter((item: FileModel) => item !== props.file)]);
        if (!_defaultValues[props.name].find((item: FileModel) => item.id === props.file.id)) {
            await axios.simpleDelete(ApiDeleteFilesDestroyRoute(props.file.id));
        }
    };

    return (
        <div className={styles.carouselItem}>
            <Image priority unoptimized alt="preview" layout="fill" objectFit="contain" src={url}/>
            <Button circle className={styles.removeCarouselItemButton} onClick={deleteItem}>
                <FontAwesomeIcon icon={faTimes}/>
            </Button>
        </div>
    );
}

interface FileCarouselProps {
    name: string;
}

const FileCarousel = (props: FileCarouselProps) => {
    const { watch } = useFormContext();
    const shownFiles = watch(props.name) as FileModel[];

    return (
        <div className={styles.root}>
            <Swiper centeredSlides keyboard mousewheel className={styles.swiper} modules={[Mousewheel, Keyboard]}
                    slidesPerView="auto" spaceBetween={16}>
                {shownFiles?.map((file) => {
                    return (
                        <SwiperSlide key={file.id} className={styles.slide}>
                            <CarouselItem file={file} name={props.name}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default FileCarousel;