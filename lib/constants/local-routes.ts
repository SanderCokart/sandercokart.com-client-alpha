import {ArticleType, UserModel, ArticleModel} from '@/types/ModelTypes';

export const LocalAccountPageRoute = '/account';
export const LocalEmailVerifyPageRoute = '/account/email/verify';

export const LocalLoginPageRoute = '/login';
export const LocalRegisterPageRoute = '/register';

export const LocalPasswordForgotPageRoute = '/account/password/forgot';
export const LocalPasswordResetPageRoute = '/account/password/reset';
export const LocalPasswordCompromisedPageRoute = '/account/password/compromised';

export const LocalPortalPageRoute = '/portal';

export const LocalPortalArticlesPageRoute = (articleTypeName: ArticleType['name']) => `/portal/articles/${articleTypeName}`;
export const LocalPortalArticlesCreatePageRoute = (articleTypeName: ArticleType['name']) => `/portal/articles/${articleTypeName}/create`;
export const LocalPortalArticlesEditPageRoute = (slug: ArticleModel['slug'], articleTypeName: ArticleType['name']) => `/portal/articles/${articleTypeName}/edit/${slug}`;


export const LocalPortalUsersPageRoute = '/portal/users';
export const LocalPortalUsersCreatePageRoute = '/portal/users/create';
export const LocalPortalUsersEditPageRoute = (id: UserModel['id']) => `/portal/users/edit/${id}`;


export const LocalLibraryPageRoute = (articleTypeName?: ArticleType['name']) => '/portal/library/' + (articleTypeName ? articleTypeName : '');
export const LocalContactPageRoute = '/contact';

export const LocalArticlePageRoute = (articleTypeName: ArticleType['name'], slug: ArticleModel['slug']) => `/library/${articleTypeName}/${slug}`;