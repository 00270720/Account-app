import React, { useState } from "react";
import { ChatAlt2Icon, ThumbUpIcon } from '@heroicons/react/solid';
import axios from "axios";
import Comment from "../Components/Comment";
import AddComments from "../Components/AddComments";

const Post = ({ p, username }) => {

    const { title, image, description, user, likes, comments, _id } = p;
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesCount, setLikesCount] = useState(likes.length);
    const [commentsCount, setCommentsCount] = useState(comments.length);
    const [commentState, setCommentState] = useState(comments);

    function Commentpost(comment) {
        setCommentState([{...commentState, user: { username }}]);
    }


    async function likePost() {
        try {
            const { data } = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (!liked) {
                setLikesCount(likesCount + 1);
                setLiked(true);
            } else {
                setLikesCount(likesCount - 1);
                setLiked(false);
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-72 h-96 rounded shadow-lg relative m-8">
            <div className="px-4">
                <div>
                    <h2 className="font-roboto text-xl capitalize text-center mb-2">
                        {user?.username}
                    </h2>
                    <h2 className="font-roboto text-xl capitalize text-center ">
                        {title}
                    </h2>
                </div>
                <div>
                    {image && <img src={image} alt="logo" className="w-auto h-44" />}
                </div>
                <div className="mt-2 mb-2">
                    {description}
                </div>
                <div className="flex justify-center space-around mt-4">
                    <button
                        onClick={likePost}
                        type="button"
                        className={`flex space-x-2 text-xs justify-center items-center w-1/2 ${liked && 'text-blue-400 '}`}
                    >
                        <span><ThumbUpIcon className="w-5  h-5 x-8" /></span>
                        { likesCount }
                    </button>
                    <button className="flex space-x-2 text-xs justify-center items-center mr-2">
                        <span><ChatAlt2Icon className="w-5 h-5 x-8" /></span>
                        { commentState.length }
                    </button>
                </div>
                <div>
                   { comments && comments.map((item) => (<Comment key={new Date().toISOString} ch={item}/>))}
                   <AddComments post={_id} Scomments={Commentpost} />
                </div>
            </div>
        </div>
    );
};

export default Post;