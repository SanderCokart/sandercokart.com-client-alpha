import {Banner} from '@/types/ModelTypes';

const UseImage = (image: Banner) => {
    const url = image?.relative_url ? `${process.env.NEXT_PUBLIC_API_URL}/${image.relative_url}` : `${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`;

    return { url };
};

export default UseImage;