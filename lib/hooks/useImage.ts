import {FileModel} from '@/types/ModelTypes';

const UseImage = () => {
    const getUrl = (image: FileModel) => {
        if (image?.relative_url)
            return { url: `${process.env.NEXT_PUBLIC_API_URL}/${image.relative_url}`, isPrivate: false };
        else return { url: `${process.env.NEXT_PUBLIC_API_URL}/articleBanners/${image.id}`, isPrivate: true };
    };

    return { getUrl };
};

export default UseImage;