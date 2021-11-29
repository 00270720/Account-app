import React from "react";
import { useState, useEffect } from "react";
import PostContainer from "../Components/PostContainer";
import { PlusIcon } from '@heroicons/react/solid';
import Addpost from "../Components/Addpost";
import { useUserContext } from "../Context/UserContext";
import PostContainerPost from "../Components/PostContainerPost";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Admin() {
    const [showAddPost, setShowAddPost] = useState(false);
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const user = localStorage.getItem('token')
    const [showOwn, setShowOwn] = useState(false);
    const [showall, setShowall] = useState(false);
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
            <div className=" p-2 w-32 mb-2  flex flex-row ">
              
            </div>
    
            <div className="flex justify-center w-2">
              {showAddPost && <Addpost />}
            </div>
    
            <div>
              <div className="rounded-lg p-2 w-32 mb-2 bg-transparent-dark-dark-dark-dark-dark flex flex-row hover:bg-transparent-dark-dark-dark-dark-dark-dark-dark py-2 px-4 text-transparent-dark-dark-dark-light">
                <button
                  onClick={() => setShowAddPost(!showAddPost)}
                  type="button"
                  className="flex text-start rounded-lg items-center text-white justify-center w-min border-black duration-300 ease-in-out text-xl text-extrabold border-none"
                >
                  Agregar 
                  <PlusIcon className=" ml-2 w-8 h-8 stroke mr-20  x-8 text-center items-center" />
                </button>
              </div>
              <div className="flex justify-center mb-5 mt-5">
                <button
                  onClick={logoutHandler}
                  className="rounded-lg w-32 transition border justify-center border-black duration-300 ease-in-out text-xl text-extrabold border-none bg-transparent-dark-dark-dark-dark-dark hover:bg-transparent-dark-dark-dark-dark-dark-dark-dark py-2 px-4 text-transparent-dark-dark-dark-light"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className="flex  justify-center h-11 mt-10">
            <div className="mr-4 w-80">
              <button
                onClick={() => setShowOwn(!showOwn)}
                className="flex shadow-lg rounded-lg text-start items-center justify-center w-full h-full bg-red-600 hover:bg-gray-900 text-white ml-4 "
              >
                Mostrar mis posts
              </button>
            </div>
            <div className="mr-4 w-80">
              <button
                onClick={() => setShowall(!showall)}
                className="flex shadow-2xl rounded-lg text-start items-center justify-center w-full h-full bg-red-600 hover:bg-gray-900 text-white ml-4 "
              >
                Mostrar todos los posts
              </button>
            </div>
          </div>
          <div>{showOwn && <PostContainer username={Whoami} />}</div>
          <div>{showall && <PostContainerPost username={Whoami} />}</div>
        </div>
      );
}