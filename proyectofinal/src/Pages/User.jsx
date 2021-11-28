import React from "react";
import { useState, useEffect } from "react";
import PostContainerPost from "../Components/PostContainerPost";
import { PlusIcon } from '@heroicons/react/solid';
import Addpost from "../Components/Addpost";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


export default function Admin() {
    const [showAddPost, setShowAddPost] = useState(false);
    const navigate = useNavigate()
    const { logout } = useUserContext()
    
   
    const [Whoami, setWhoami] = useState();
    
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
            
            <PostContainerPost username={Whoami}/>
            <button onClick={logoutHandler} className="rounded-lg mt-8 w-full transition border border-black duration-300 ease-in-out text-xl text-extrabold bg-gradient-to-r from-yellow-600 to-pink-500 hover:from-pink-500 hover:to-yellow-600 py-2 px-4 text-transparent-dark-dark-dark-light">
                Log out
            </button>
        </div>



    )
}