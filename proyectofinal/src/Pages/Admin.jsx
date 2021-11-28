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
            <div className="flex flex-col w-screen">
                <div className="flex flex-row w-screen justify-around mt-8">
                    <div className=" p-2 w-32 mb-2 bg-transparent-dark-dark-dark-dark-dark flex flex-row just">
                        <button onClick={() => setShowAddPost(!showAddPost)}
                            type="button" className="flex text-start items-center text-white justify-center w-min">
                            Agregar un post
                            <PlusIcon className="ml-2 w-6 h-6 stroke mr-20  x-8 text-center items-center" />
                        </button>
                    </div>
                    <div className="flex justify-center w-2">
                        {showAddPost && <Addpost />}
                    </div>
                <div>
                    <div className="flex justify-center mb-5">
                        <button onClick={logoutHandler} className="rounded-lg w-32 transition border justify-center border-black duration-300 ease-in-out text-xl text-extrabold border-none bg-transparent-dark-dark-dark-dark-dark hover:bg-transparent-dark-dark-dark-dark-dark-dark-dark py-2 px-4 text-transparent-dark-dark-dark-light">
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <PostContainer username={Whoami}/>
            </div>
        </div>
    )
}