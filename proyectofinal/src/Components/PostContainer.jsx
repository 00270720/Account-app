import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostContainer = ({username}) => {
    const [posts, setPost] = useState({
        status: 'Loading',
        data: null,
    });
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        async function getPost() {
            const { data: result } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=${15}&page=${page}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            });
            setpageCount(result.pages);
            setPost({ status: 'DONE', data: result.data });
        }

        getPost();
    }, [page]);

    const PreviousBtn = () => {
        if (page < pageCount) {
            setPage(PreviousBtn =>
            PreviousBtn - 1)
        }
      };
    
        //Funcion para el boton next
        const NextBtn =() =>{
          if(page+1 < pageCount){
            setPage(NextBtn =>
              NextBtn + 1)   
          }
        }

    if (posts.status === 'Loading') {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <div className="flex flex-wrap px-6 py-10 justify-center items-center">
            {
                posts.data && posts.data.map((item) => 
                   <Post username={username} key={item._id} p={item} />
                )
            }
            </div>
            <div className="flex justify-around h-11 m-5">
                <div className="mr-4 w-80 rounded-lg shadow-2xl">
                    <button onClick={PreviousBtn} className="flex text-start rounded-lg shadow-2xl items-center justify-center w-full h-full bg-red-600 hover:bg-gray-900 text-white ml-4 ">     
                        Atras           
                    </button>
                </div>
                <div className="mr-4 w-80 rounded-lg shadow-2xl">
                    <button onClick={NextBtn} className="flex text-start rounded-lg shadow-2xl items-center justify-center w-full h-full bg-red-600 hover:bg-gray-900 text-white ml-4 ">     
                        Siguiente          
                    </button>
                </div>
            </div>
       </div>

    );

}

export default PostContainer;