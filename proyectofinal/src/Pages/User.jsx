import React from "react";
import { useState, useEffect } from "react";
import PostContainerPost from "../Components/PostContainerPost";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


export default function User() {
    const [showAddPost, setShowAddPost] = useState(false);
    const navigate = useNavigate()
    const { logout } = useUserContext();
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
        <div className="mb-4 ml-4">
            <button onClick={logoutHandler} className="rounded-lg w-32 transition border justify-center border-black duration-300 ease-in-out text-xl text-extrabold border-none bg-transparent-dark-dark-dark-dark-dark hover:bg-transparent-dark-dark-dark-dark-dark-dark-dark py-2 px-4 text-transparent-dark-dark-dark-light m-5">
                Log out
            </button>
            <PostContainerPost username={Whoami}/>
            
        </div>
    )
}