import type {GetStaticProps} from 'next';

import RecentArticles from '@/components/pages/home/RecentArticles';

import {ApiGetArticlesRecentRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import type {ArticleModel} from '@/types/ModelTypes';
import type {CursorPaginationResponse} from '@/types/ResponseTypes';

import styles from '@/styles/pages/Home.module.scss';

interface HomeProps {
    comingSoon: {
        posts: boolean,
        tipsAndTutorials: boolean,
        courses: boolean
    };
    fallbacks: {
        posts: any;
        courses: any;
        tipsAndTutorials: any;
    };
}

const HomePage = (props: HomeProps) => {
    return (
        <div className={styles.home}>
            <RecentArticles comingSoon={props.comingSoon.posts} fallback={props.fallbacks.posts} title="Posts"
                            url={ApiGetArticlesRecentRoute('posts')}/>
            <RecentArticles comingSoon={props.comingSoon.courses} fallback={props.fallbacks.courses} title="Courses"
                            url={ApiGetArticlesRecentRoute('courses')}/>
            <RecentArticles comingSoon={props.comingSoon.tipsAndTutorials} fallback={props.fallbacks.tipsAndTutorials}
                            title="Tips & Tutorials"
                            url={ApiGetArticlesRecentRoute('tips-&-tutorials')}/>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: postsData } =
        await axios.simpleGet<CursorPaginationResponse<ArticleModel[]>>(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('posts'));
    const { data: tipsAndTutorialsData } =
        await axios.simpleGet<CursorPaginationResponse<ArticleModel[]>>(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('tips-&-tutorials'));
    const { data: coursesData } =
        await axios.simpleGet<CursorPaginationResponse<ArticleModel[]>>(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('courses'));

    return {
        props: {
            fallbacks: {
                posts: {
                    [ApiGetArticlesRecentRoute('posts')]: postsData
                },
                tipsAndTutorials: {
                    [ApiGetArticlesRecentRoute('tips-&-tutorials')]: tipsAndTutorialsData
                },
                courses: {
                    [ApiGetArticlesRecentRoute('courses')]: coursesData
                }
            },
            comingSoon: {
                posts: postsData?.articles.length === 0,
                tipsAndTutorials: tipsAndTutorialsData?.articles.length === 0,
                courses: coursesData?.articles.length === 0
            }
        },
        revalidate: 60
    };
};

export default HomePage;
