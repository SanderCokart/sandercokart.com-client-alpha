import File from '@/components/formComponents/File';

export interface CreatePostModel {
    title: string;
    markdown: string;
    bannerImage: File | undefined;
}