import {FileModel} from '@/types/ModelTypes';

const UseImage = () => {
    const getUrl = (image: FileModel) => image?.relative_url ? `${process.env.NEXT_PUBLIC_API_URL}/${image.relative_url}` : `${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`;

    return { getUrl };
};

export default UseImage;