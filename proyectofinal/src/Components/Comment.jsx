import React from "react";

const Comment = ({ ch }) => {
   
    const{ description, user } = ch;
    
    return (
        <div className="w-full border-t-4 bg-gray-400 text-sm mb-2">
            <h1 className=" text-transparent-dark"> usuario: @{ user?.username }</h1>
            <p>-{description}</p>
        </div>
    );
};

export default Comment;