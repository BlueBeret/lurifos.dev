import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Stairs from "@/components/Loading/Stairs";
import sleep from '@/utils/sleep'
import truncate from "@/utils/truncate";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import styles from './Content.module.css'
import Image from "next/image";

const Content = ({ data }) => {
    const [posts, setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const [activeDiary, setActiveDiary] = useState(null)
    const diary = useRef(null)

    const getMorePost = async () => {
        const utcdate = new Date(posts[posts.length - 1].timecreated).toUTCString()
        const res = await fetch(
            `/api/diary/more?last=${utcdate}`
        );
        const newPosts = await res.json();
        if (newPosts.length === 0) {
            setHasMore(false);
        } else setPosts((post) => [...post, ...newPosts]);
    };

    const toogleBody = async (e, id) => {
        switch (e.detail) {
            case 1:
                const toggle = (e) => {
                    const elem = diary.current
                    const target = elem.querySelector(`#body-${id}`)
                    const arrow = elem.querySelector(`#arrow-${id}`)
                    arrow.classList.toggle("rotate-180")
                    target.classList.toggle('max-h-0')
                    target.classList.toggle('max-h-96')
                }


                if (activeDiary === id) {
                    setActiveDiary(null)
                    toggle()
                } else {

                    if (activeDiary !== null) {
                        const elem = diary.current
                        const target = elem.querySelector(`#body-${activeDiary}`)
                        const arrow = elem.querySelector(`#arrow-${activeDiary}`)
                        arrow.classList.toggle("rotate-180")
                        target.classList.toggle('max-h-96')
                        await sleep(200);

                    }

                    toggle()
                    setActiveDiary(id)
                }
                break;
            case 2:
                window.open(`/diary/${id}`, '_blank')
                break;
            default:
                break;
        }




    }

    return (
        <div id="scrollable-target" className="content 
        content-diary-mobile sm:content-diary
        flex flex-col items-start text-left max-w-[900px] mx-auto p-[45px]
        overflow-y-auto
        " ref={diary}>
            <InfiniteScroll
                dataLength={posts.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={
                    <div className="mx-auto w-min">
                        <Stairs />
                    </div>
                }
                style={{
                    overflow: undefined,
                    height: undefined,
                    '-webkit-overflow-scrolling': undefined,
                }}
                scrollableTarget="scrollable-target"
            >
                {posts.map((x, i) => (
                    <div key={i} className={`transition mt-3 animate-fade-in-up duration-500 ${activeDiary === x.uuid || activeDiary === null ? '' : 'opacity-50'} ${activeDiary === x.uuid ? 'scale-110 z-50' : 'scale-100'}`}>
                        <div className="flex sm:flex-row sm:justify-start sm:items-center gap-1 hover:cursor-pointer flex-wrap
                        flex-col justify-center items-start
                        " onClick={(e) => toogleBody(e, x.uuid)}>
                            <h3 className="font-bold noselect text-sm sm:text-base">{x.title}</h3>
                            <div className="flex flex-row justify-start items-center gap-1 text-xs md:text-base mt-0">
                                <span className="text-gray-600">@lurifos ·</span>
                                <span>{parseDate(x.timecreated)}</span>
                                <div className="transition duration-500 text-lg" id={`arrow-${x.uuid}`}>
                                    <MdKeyboardArrowDown />
                                </div>
                            </div>


                        </div>
                        <div id={`body-${x.uuid}`} className="transition-max-height duration-500 text-gray-600 slide overflow-hidden sm:overflow-clip text-sm sm:text-base">

                            <ReactMarkdown remarkPlugins={[gfm]} className={styles.body}>
                                {truncate(x.body, 256)}
                            </ReactMarkdown>
                            {x.body.length > 256 ? <ReadMore x={x} /> : ''}

                        </div>
                    </div>
                ))}
            </InfiniteScroll>
            {!hasMore ? <NoMore /> : ""}
        </div>
    );
};

export default Content;

const parseDate = (date) => {
    const dateObj = new Date(date)
    const now = new Date()
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    if (dateObj.getFullYear() === now.getFullYear()) {
        if (dateObj.getMonth() === now.getMonth()) {
            if (dateObj.getDate() === now.getDate()) {
                return `${now.getHours() - dateObj.getHours()} hours ago`
            } else if (dateObj.getDate() === now.getDate() - 1) {
                return `Yesterday`
            } else {
                return `${month[dateObj.getMonth()]} ${dateObj.getDate()}`
            }
        } else {
            return `${month[dateObj.getMonth()]} ${dateObj.getDate()}`
        }
    }

    return `${dateObj.toLocaleDateString()}`
}

const ReadMore = ({ x }) => {

    return <a href={'/diary/' + x.uuid} className="text-sm text-blue-500" target='_blank' rel="noreferrer"> Read More </a>
}

const NoMore = () => {
    return <div>
        <Image src="/images/treasure.png" height="107" width="200" alt="treasure" ></Image>
        <p>You&apos;ve reached the end, enjoy this treasure.</p>

    </div>
}