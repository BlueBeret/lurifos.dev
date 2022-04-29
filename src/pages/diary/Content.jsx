import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Content = ({ data }) => {
    const [posts, setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);

    const getMorePost = async () => {
        console.log(posts[posts.length - 1].uuid);
        const res = await fetch(
            `/api/diary/more?last=${new Date(posts[posts.length - 1].timecreated)}`
        );
        const newPosts = await res.json();
        if (posts[posts.length - 1].uuid === newPosts[newPosts.length - 1].uuid) {
            setHasMore(false);
        } else setPosts((post) => [...post, ...newPosts]);
    };

    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
                scrollableTarget='scrollable-target'
            >
                {posts.map((data) => (
                    <div key={data.id}>
                        <div className="back">
                            <strong> {data.id}</strong> {data.title}
                        </div>
                        {data.completed}
                    </div>
                ))}
            </InfiniteScroll>
            <style jsx>
                {`
          .back {
            padding: 10px;
            background-color: dodgerblue;
            color: white;
            margin: 10px;
          }
        `}
            </style>
        </>
    );
};

export default Content;