import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostContainer = ({username}) => {
    const [posts, setPost] = useState({
        status: 'Loading',
        data: null,
    });

    useEffect(() => {
        async function getPost() {
            const { data: result } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/owned', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            });

            setPost({ status: 'DONE', data: result.data });
        }

        getPost();
    }, []);

    if (posts.status === 'Loading') {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex flex-wrap px-6 py-10 justify-center items-center">
            {
                posts.data && posts.data.map((item) => 
                   <Post username={username} key={item._id} p={item} />
                )
            }
        </div>

    );

}

export default PostContainer;