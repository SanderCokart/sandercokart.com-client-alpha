import {FontAwesomeIcon} from '@/types/CustomTypes';
import {Post} from '@/types/ModelTypes';
import {PostsResponse} from '@/types/ResponseTypes';

export interface NavItemProps {
    href: string;
    icon: FontAwesomeIcon;
    text: string;
}

export interface DropdownProps {
    icon: FontAwesomeIcon;
    text: string;
}

export interface BlogProps {
    initialData: PostsResponse;
}

export interface RecentPostLayoutProps {
    post: Post;
}