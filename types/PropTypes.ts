import {FontAwesomeIcon} from '@/types/CustomTypes';
import {Post, User} from '@/types/ModelTypes';
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

export interface MobileMenuProps {
    name: string;
    icon: FontAwesomeIcon;
    onClick: () => void;
    showSpan?: boolean;
}

export interface MobileItemProps {
    onClick: () => void;
    name: string;
    href: string;
    icon: FontAwesomeIcon;
}

export interface PortalNavItemProps {
    href: string;
    text: string;
}

export interface UserRowProps {
    user: User;
}
