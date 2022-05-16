import Loader from '@/components/Loader/Loader';
import PaginatedModelProvider, {usePaginatedContext, PageControls} from '@/providers/PaginatedModelProvider';
import type {ArticleModel} from '@/types/ModelTypes';
import {UserModel} from '@/types/ModelTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import CreateFAB from '@/components/CreateFAB';
import {LocalPortalArticlesCreatePageRoute, LocalPortalArticlesEditPageRoute} from '@/constants/local-routes';
import useAuthPage from '@/hooks/useAuthPage';
import DeleteConfirmationProvider, {
    useDeleteConfirmationContext,
    ConfirmDeleteModal
} from '@/providers/DeleteConfirmationProvider';
import {Button, LinkButton} from '@/components/Button/Button';
import styles from '@/styles/pages/portal/PortalTable.module.scss';
import axios from '@/functions/shared/axios';
import {ApiDeleteArticlesDestroyRoute} from '@/constants/api-routes';

const PostRow = ({ article }: { article: ArticleModel }) => {
    const { toggleDeleteModal, setItemToDelete } = useDeleteConfirmationContext<ArticleModel>();

    const handleTrashClick = () => {
        toggleDeleteModal();
        setItemToDelete(article);
    };

    return (
        <tr>
            <td>{article.id}</td>
            <td data-tooltip={article.title}>{article.title}</td>
            <td>{article.slug}</td>
            <td>{article.author.name}</td>
            <td>{moment(article.created_at).calendar()}</td>
            <td>{moment(article.updated_at).calendar()}</td>
            <td>{article.publishedAt ? moment(article.publishedAt).calendar() : 'NULL'}</td>

            <td className={styles.actions}>
                <Button circle onClick={handleTrashClick}>
                    <FontAwesomeIcon icon="trash"/>
                </Button>
                <LinkButton circle href={LocalPortalArticlesEditPageRoute(article.slug, 'posts')}>
                    <FontAwesomeIcon icon="pen"/>
                </LinkButton>
            </td>
        </tr>
    );
};


const PostTable = () => {
    const { data: articles, isLoading, mutate } = usePaginatedContext<ArticleModel>();
    const { itemToDelete, toggleDeleteModal } = useDeleteConfirmationContext<ArticleModel>();

    const columnNames = ['id', 'title', 'slug', 'author', 'created_at', 'updated_at', 'publishedAt', 'actions'];

    const handleSubmitDeletePost = async () => {
        await axios.simpleDelete(ApiDeleteArticlesDestroyRoute('posts', itemToDelete.slug));
        await mutate(currentValue => {
            if (currentValue) return {
                ...currentValue,
                users: currentValue.articles.filter((article: ArticleModel) => article !== itemToDelete)
            };
        });
        toggleDeleteModal();
    };

    return (
        <main className={styles.table}>
            <table>
                <colgroup>
                    <col width="100"/>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="100"/>
                </colgroup>
                <thead>
                <tr>
                    {columnNames.map((columnName) => (
                        <th key={columnName}>{columnName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ? [...Array(100)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td colSpan={8}><Skeleton height="100%" width="100%"/></td>
                    </tr>
                )) : articles.map(article => (
                    <PostRow key={article.id} article={article}/>
                ))}

                </tbody>
            </table>

            <PageControls/>
            <ConfirmDeleteModal<ArticleModel>
                confirmationErrorMessage="title must match"
                keyOfModelAsTitle="title"
                keyOfModelToConfirm="title"
                onSubmitDelete={handleSubmitDeletePost}/>
        </main>
    );
};

const ArticlesPortalPage = () => {
    const visible = useAuthPage();

    return (
        <PaginatedModelProvider middleware="auth" resourceDataKey="articles" url="/articles/posts">
            <Loader visible={visible}/>
            <DeleteConfirmationProvider<ArticleModel>>
                <PostTable/>
            </DeleteConfirmationProvider>
            <CreateFAB href={LocalPortalArticlesCreatePageRoute('posts')}/>
        </PaginatedModelProvider>
    );
};

export default ArticlesPortalPage;