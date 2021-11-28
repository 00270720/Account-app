import React from "react";
import { useState, useEffect } from "react";
import PostContainer from "../Components/PostContainer";
import { PlusIcon } from '@heroicons/react/solid';
import Addpost from "../Components/Addpost";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


export default function Admin() {
    const [showAddPost, setShowAddPost] = useState(false);
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const user = localStorage.getItem('token')
   
    const [Whoami, setWhoami] = useState();
    console.log(user);
    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    useEffect(() => {
        async function getIdentity() {
            const { data } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1//auth/whoami', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }

            });
            setWhoami(data.username);
        }
        getIdentity();

    }, []);
    return (
        <div>
            <div className="mb-2">
                <button onClick={() => setShowAddPost(!showAddPost)}
                    type="button" className="flex text-center items-center text-white justify-center w-full">
                    Agregar un post
                    <PlusIcon className="ml-2 w-6 h-6 stroke mr-20  x-8 text-center items-center" />
                </button>
                {showAddPost && <Addpost />}
            </div>
            <PostContainer username={Whoami}/>
            <button onClick={logoutHandler} className="rounded-lg mt-8 w-full transition border border-black duration-300 ease-in-out text-xl text-extrabold bg-gradient-to-r from-yellow-600 to-pink-500 hover:from-pink-500 hover:to-yellow-600 py-2 px-4 text-transparent-dark-dark-dark-light">
                Log out
            </button>
        </div>



    )
}