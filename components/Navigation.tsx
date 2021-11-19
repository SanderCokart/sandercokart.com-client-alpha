import styles from '@/styles/components/Navigation.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {FC, MouseEvent} from 'react';

const Navigation: FC = () => {
    const compass = (e: MouseEvent<HTMLButtonElement>) => {
        document.getElementById('compassOptions')?.classList.toggle(styles.showCompassOptions);
        document.getElementById('backdrop')?.classList.toggle(styles.backdrop);
    };

    const showBlogOptions = (e: MouseEvent<HTMLButtonElement>) => {
        const siblings = Array.from(e.currentTarget.parentElement?.children ?? []).filter(item => item.getAttribute('data-name') !== 'blog' && (item.tagName === 'A' || item.tagName === 'BUTTON'));
        siblings.forEach(sibling => sibling.classList.toggle(styles.unfocus));
        e.currentTarget.classList.toggle(styles.focus);
        document.getElementById('blogOptions')?.classList.toggle(styles.showBlogOptions);
        document.getElementById('compass')?.classList.toggle(styles.unfocus);
    };

    const hide = (e: MouseEvent<HTMLAnchorElement>) => {
        document.getElementById('compass')?.click();
    };

    const hideBlogOptions = (e: MouseEvent<HTMLAnchorElement>) => {
        document.getElementById('blogButton')?.click();
        document.getElementById('compass')?.click();
    };

    return (
        <div className={styles.fixed}>
            <div className={styles.relative} id="backdrop">
                <button id="compass" onClick={compass}><FontAwesomeIcon icon="compass"/></button>
                <div className={styles.compassOptions} id="compassOptions">
                    <Link href="/settings"><a data-name="settings" onClick={hide}><FontAwesomeIcon
                        icon="cog"/><span>Settings</span></a></Link>
                    <Link href="/portfolio"><a data-name="portfolio" onClick={hide}><FontAwesomeIcon
                        icon="portrait"/><span>Portfolio</span></a></Link>


                    <button data-name="blog" id="blogButton" onClick={showBlogOptions}><FontAwesomeIcon
                        icon="rss"/><span>Blog</span>
                    </button>
                    <div className={styles.blogOptions} id="blogOptions">
                        <Link href="/blog/recent"><a data-name="recent" onClick={hideBlogOptions}><FontAwesomeIcon
                            icon="history"/><span>Recent</span></a></Link>
                        <Link href="/blog/search"><a data-name="search" onClick={hideBlogOptions}><FontAwesomeIcon
                            icon="search"/><span>Search</span></a></Link>
                    </div>

                    <Link href="/gallery"><a data-name="gallery" onClick={hide}><FontAwesomeIcon
                        icon="images"/><span>Gallery</span></a></Link>
                    <Link href="/contact"><a data-name="contact" onClick={hide}><FontAwesomeIcon
                        icon="envelope"/><span>Contact</span></a></Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;