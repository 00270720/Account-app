import React, { useState } from "react";import { ChatAlt2Icon, ThumbUpIcon, BookmarkIcon, PencilAltIcon, ArrowsExpandIcon, EyeIcon } from '@heroicons/react/solid';
import axios from "axios";
import Comment from "../Components/Comment";
import AddComments from "../Components/AddComments";
import { Navigate, useNavigate } from 'react-router-dom';

const Post = ({ p, username }) => {

    const { title, image, description, user, likes, comments, _id, active } = p;
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesCount, setLikesCount] = useState(likes.length);
    const [commentState, setCommentState] = useState(comments);
    const [Favpost, setFavpost] = useState(false);
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/updateposting/${_id}`)
    }

    async function toggle(e) {
        e.preventDefault();
        
        const body = {
            active: !active,
        };
        
        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${_id}`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log(_id);
        console.log(body);
    }

    function Commentpost(comment) {
        const val = [...commentState, { ...comment, user: { username } }];

        setCommentState(val);
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

    async function addfavorites() {
        try {
            const { data } = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${_id}`, null, {
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
        <div className=" w-8/12 h-96 rounded-2xl shadow-2xl drop-shadow-2xl relative m-8 flex flex-row bg-gray-300">
            <div className=" w-11/12 p-3 overflow-y-auto">
                <div className="px-4">
                    <div>
                        <h2 className="font-roboto text-xl capitalize mb-2 font-semibold">
                            {user?.username}
                        </h2>
                        <h2 className="font-roboto text-xl capitalize text-center border-t-4 ">
                            {title}
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        {image && <img src={image} alt="logo" className=" wl-60 h-44 " />}
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
                        <button onClick={() => setFavpost(!Favpost)} className={`flex space-x-2 text-xs justify-center items-center w-1/2 ${Favpost && 'text-blue-400 '}`}>
                            <span><BookmarkIcon className="w-5 h-5 x-8" /></span>                   
                        </button>

                        <button className="flex space-x-2 text-xs justify-center items-center">
                            <span><ArrowsExpandIcon className="w-5 h-5 x-8" /></span>                      
                        </button>
                        <button onClick={(e) => onClick(e)} className="flex space-x-2 text-xs justify-center items-center">
                            <span><PencilAltIcon className="w-5 h-5 x-8" /></span>                    
                        </button>
                        <button onClick={toggle} className="flex space-x-2 text-xs justify-center items-center ">
                            <span><EyeIcon className="w-5 h-5 x-8" /></span>                                           
                        </button>
                        </div>
                        <div className="mt-4 border-black">
                            <AddComments id_value={_id} id_comment={Commentpost} />
                        </div>
                </div>
            </div>
            <div className=" w-11/12 p-4 overflow-y-auto bg-gray-400 rounded-r-2xl">
                <div className="flex justify-center text-white">Comentarios</div>
                <div className="mt-4">
                    { comments && commentState.map((item) => (<Comment key={new Date().toISOString} ch={item}/>))}                      
                </div>
            </div>
        </div>
    );
};

export default Post;