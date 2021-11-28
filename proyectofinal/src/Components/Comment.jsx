import React from "react";

const Comment = ({ ch }) => {
   
    const{ description, user } = ch;
    
    return (
        <div className="w-full border-t-4 bg-yellow-500 text-sm">
            <h1> @{ user?.username }</h1>
            <p>{description}</p>
        </div>
    );
};

export default Comment;