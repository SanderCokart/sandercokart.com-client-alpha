import File from '@/components/formComponents/File';

export interface CreatePostModel {
    title: string;
    markdown: string;
    bannerImage: File | undefined;
}

export interface Post {
    id: number;
    title: string;
    markdown: string;
    created_at: string;
    updated_at: string;
    slug: string;
    user: User;
    banner: Banner | null;
}

interface Banner {
    id: number,
    original_name: string;
    relative_url?: string;
    created_at: string;
}

export interface User {
    id: number;
    name: string;
}

