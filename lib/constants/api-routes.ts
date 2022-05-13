import type {ArticleType, FileModel, UserModel} from '@/types/ModelTypes';

export const ApiRegisterRoute = '/account/register';
export const ApiLoginRoute = '/account/login';
export const ApiPasswordForgotRoute = '/account/password/forgot';
export const ApiPasswordResetRoute = '/account/password/reset';
export const ApiPasswordCompromisedRoute = '/account/password/compromised';
export const ApiEmailCompromisedRoute = '/account/email/compromised';

export const ApiArticleRecentRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/recent`;
export const ApiArticleSlugRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/slugs`;
export const ApiArticleIndexRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}`;

export const ApiArticleShowRoute = (articleTypeName: ArticleType['name'], slug: string) => `/articles/${articleTypeName}/${slug}`;

export const ApiEmailChangeRoute = '/account/email/change';
export const ApiEmailVerifyRoute = '/account/email/verify';
export const ApiEmailVerifyRetryRoute = '/account/email/verify/retry';
export const ApiPasswordChangeRoute = '/account/password/change';
export const ApiGetUserRoute = '/account/user';
export const ApiLogoutRoute = '/account/logout';
export const ApiArticleStoreRoute = '/articles/store';
export const ApiArticleUpdateRoute = (id: number) => `/articles/${id}`;
export const ApiArticleDestroyRoute = '/articles/{article}';

//RESOURCES
export const ApiFilesRoute = (id?: FileModel['id']) => `/files/${id || ''}`;
export const ApiUsersRoute = (id?: UserModel['id']) => `/users/${id || ''}`;
export const ApiArticleTypeIndexRoute = '/articleTypes';
export const ApiRolesIndexRoute = '/roles';

export const ApiCSRFTokenRoute = '/sanctum/csrf-cookie';