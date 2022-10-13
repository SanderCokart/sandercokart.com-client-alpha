import type {GetStaticProps} from 'next';
import courses from 'pages/library/courses';

import RecentArticles from '@/components/pages/home/RecentArticles';

import {ApiGetArticlesRecentRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import styles from '@/styles/pages/Home.module.scss';

interface HomeProps {
    fallbacks: {
        posts: any;
        courses: any;
        tipsAndTutorials: any;
    };
}

const HomePage = (props: HomeProps) => {
    return (
        <div className={styles.home}>
            <RecentArticles fallback={props.fallbacks.posts} title="Posts"
                            url={ApiGetArticlesRecentRoute('posts')}/>
            <RecentArticles fallback={props.fallbacks.courses} title="Courses"
                            url={ApiGetArticlesRecentRoute('courses')}/>
            <RecentArticles fallback={props.fallbacks.tipsAndTutorials} title="Tips & Tutorials"
                            url={ApiGetArticlesRecentRoute('tips-&-tutorials')}/>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: postsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('posts'));
    const { data: tipsAndTutorialsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('tips-&-tutorials'));
    const { data: coursesData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('courses'));

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
            }
        },
        revalidate: 60
    };
};

export default HomePage;
