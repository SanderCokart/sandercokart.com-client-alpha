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
    created_at: string;
    updated_at: string;
    publishedAt: string;
    slug: string;
    author: UserModel;
    banner: FileModel;
    article_type?: ArticleType;
}

export interface UserModel {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
    email: string;
    roles: RoleModel[];
}

export type RoleModel = { id: number, name: 'Admin' | 'User' };

export interface ArticleType {
    id: number;
    name: 'courses' | 'posts' | 'tips-&-tutorials';
}

export interface FileModel {
    id: number,
    original_name: string;
    relative_path?: string;
    created_at: string;
}

export type Models = ArticleModel | UserModel | RoleModel | FileModel;