import {FileModel} from '@/types/ModelTypes';

const UseImage = (file: FileModel) => {
    if (!!file?.relative_path) {
        return { url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${file.relative_path}`, isPrivate: false };
    }
    return { url: `${process.env.NEXT_PUBLIC_API_URL}/files/${file.id}`, isPrivate: true };
};

export default UseImage;