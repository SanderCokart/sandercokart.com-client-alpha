import RecentArticles from '@/components/pages/home/RecentArticles';
import styles from '@/styles/pages/Home.module.scss';
import {GetStaticProps} from 'next';
import axios from '@/functions/shared/axios';
import {SWRConfig} from 'swr';
import {ApiArticleTypeRecentRoute} from '@/constants/api-routes';

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
            <SWRConfig value={{ fallback: { ...props.fallbacks.posts } }}>
                <RecentArticles title="posts" url={ApiArticleTypeRecentRoute('posts')}/>
            </SWRConfig>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: postsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiArticleTypeRecentRoute('posts'));
    const { data: tipsAndTutorialsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiArticleTypeRecentRoute('tips-&-tutorials'));
    const { data: CoursesData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiArticleTypeRecentRoute('courses'));

    return {
        props: {
            fallbacks: {
                posts: {
                    '/articles/posts/recent': postsData
                }
            }
        }
    };
};

export default HomePage;
