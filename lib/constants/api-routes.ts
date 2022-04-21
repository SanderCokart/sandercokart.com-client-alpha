import type {ArticleType} from '@/types/ModelTypes';

export const ApiRegisterRoute = '/account/register';
export const ApiLoginRoute = '/account/login';
export const ApiPasswordForgotRoute = '/account/password/forgot';
export const ApiPasswordResetRoute = '/account/password/reset';
export const ApiPasswordCompromisedRoute = '/account/password/compromised';
export const ApiEmailCompromisedRoute = '/account/email/compromised';

export const ApiArticleTypeRecentRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/recent`;
export const ApiArticleTypeSlugsRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/slugs`;
export const ApiArticleTypeRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}`;
export const ApiArticleRoute = (articleTypeName: ArticleType['name'], slug: string) => `/articles/${articleTypeName}/${slug}`;

export const ApiEmailChangeRoute = '/account/email/change';
export const ApiEmailVerifyRoute = '/account/email/verify';
export const ApiEmailVerifyRetryRoute = '/account/email/verify/retry';
export const ApiPasswordChangeRoute = '/account/password/change';
export const ApiUserRoute = '/account/user';
export const ApiLogoutRoute = '/account/logout';
export const ApiArticlesStoreRoute = '/articles/store';
export const ApiArticlesUpdateRoute = (id: number) => `/articles/${id}`;
export const ApiArticlesDestroyRoute = '/articles/{article}';

//RESOURCES
export const ApiFilesRoute = '/files';
export const ApiUsersRoute =  (id?: number) => `/users/${id || ''}`;
export const ApiArticleTypesRoute = '/articleTypes';
export const ApiRolesRoute = '/roles';

export const ApiCSRFTokenRoute = '/sanctum/csrf-cookie';