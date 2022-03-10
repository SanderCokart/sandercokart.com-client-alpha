export interface CreatePostModel {
    title: string;
    markdown: string;
    bannerImage: FileModel | undefined;
}

export interface ArticleModel {
    id: number;
    title: string;
    markdown: string;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    author: UserModel;
    banner: FileModel;
    status: StatusModel;
}

export interface UserModel {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    emailVerifiedAt: string;
    email: string;
    roles: RoleModel[];
    // [key: string]: any;
}

export type RoleModel = 'admin' | 'user';

export interface ArticleType {
    id: number;
    name: string;
}

export interface FileModel {
    id: number,
    original_name: string;
    relative_url?: string;
    created_at: string;
}

export interface StatusModel {
    id: number;
    name: 'unlisted' | 'published' | 'archived';
}