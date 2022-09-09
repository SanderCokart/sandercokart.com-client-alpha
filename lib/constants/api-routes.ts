import type {ArticleType} from '@/types/ModelTypes';

export const ApiCSRFTokenRoute = '/sanctum/csrf-cookie';

export const ApiPatchEmailChangeRoute = '/account/email/change';
export const ApiPatchEmailCompromisedRoute = '/account/email/compromised';
export const ApiPostEmailVerifyRoute = '/account/email/verify';
export const ApiPostEmailVerifyRetryRoute = '/account/email/verify/retry';
export const ApiPostLoginRoute = '/account/login';
export const ApiPostLogoutRoute = '/account/logout';
export const ApiPatchChangePasswordRoute = '/account/password/change';
export const ApiPatchCompromisedPasswordRoute = '/account/password/compromised';
export const ApiPostForgotPasswordRoute = '/account/password/forgot';
export const ApiPatchResetPasswordRoute = '/account/password/reset';
export const ApiPostRegisterRoute = '/account/register';

export const ApiGetUserRoute = '/account/user';

export const ApiGetArticleTypesIndexRoute = '/articleTypes';
export const ApiPostArticleTypesStoreRoute = '/articleTypes';
export const ApiGetArticleTypesShowRoute = (id: number) => `/articleTypes/${id}`;
export const ApiPatchArticleTypesUpdateRoute = (id: number) => `/articleTypes/${id}`;
export const ApiDeleteArticleTypesDestroyRoute = (id: number) => `/articleTypes/${id}`;

export const ApiGetArticlesIndexRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}`;
export const ApiPostArticlesStoreRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}`;
export const ApiGetArticlesShowRoute = (articleTypeName: ArticleType['name'], slug: string) => `/articles/${articleTypeName}/${slug}`;
export const ApiPatchArticlesUpdateRoute = (articleTypeName: ArticleType['name'], slug: string) => `/articles/${articleTypeName}/${slug}`;
export const ApiDeleteArticlesDestroyRoute = (articleTypeName: ArticleType['name'], slug: string) => `/articles/${articleTypeName}/${slug}`;
export const ApiGetArticlesRecentRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/recent`;
export const ApiGetArticlesSlugsRoute = (articleTypeName: ArticleType['name']) => `/articles/${articleTypeName}/slugs`;

export const ApiGetFilesIndexRoute = '/files';
export const ApiPostFilesStoreRoute = '/files';
export const ApiGetFilesShowRoute = (id: number) => `/files/${id}`;
export const ApiPatchFilesUpdateRoute = (id: number) => `/files/${id}`;
export const ApiDeleteFilesDestroyRoute = (id: number) => `/files/${id}`;

export const ApiGetRolesIndexRoute = '/roles';
export const ApiPostRolesStoreRoute = '/roles';
export const ApiGetRolesShowRoute = (id: number) => `/roles/${id}`;
export const ApiPatchRolesUpdateRoute = (id: number) => `/roles/${id}`;
export const ApiDeleteRolesDestroyRoute = (id: number) => `/roles/${id}`;

export const ApiGetUsersIndexRoute = '/users';
export const ApiPostUsersStoreRoute = '/users';
export const ApiGetUsersShowRoute = (id: number) => `/users/${id}`;
export const ApiDeleteUsersDestroyRoute = (id: number) => `/users/${id}`;

export const ApiClearSessionCookiesRoute = '/removeSession';
