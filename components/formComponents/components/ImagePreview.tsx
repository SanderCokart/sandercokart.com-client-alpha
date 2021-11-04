import styles from '@/styles/components/formComponents/File.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import type {FC} from 'react';

const ImagePreview: FC<{ images: File[] }> = (props) => {
    const { images } = props;

    console.log(images);

    return (
        <div className={styles.imageGrid}>
            {
                // @ts-ignore
                images?.map(file => {
                    const url = URL.createObjectURL(file);
                    return (
                        <div key={url} className={styles.imageWrapper}>
                            <Image unoptimized alt="preview" layout="fill" objectFit="contain"
                                   src={url}/>
                            <button className={styles.closeButton} type="button">
                                <FontAwesomeIcon icon={['fas', 'times']}/>
                            </button>
                        </div>
                    );
                })
            }
            <div className={styles.addMoreContainer}>
                <div className={styles.addMore}>
                    <FontAwesomeIcon icon={['fas', 'plus']}/>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;