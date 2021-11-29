import axios from 'axios';
import React, { useState } from 'react';

const AddComment = ({ id_value, id_comment }) => {
    const [inputVal, setInputVal] = useState('');

    function onChange(e) {
        setInputVal(e.target.value);
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        
        const shape = {
            description: inputVal,
        };
        
        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id_value}`, shape, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setInputVal('');

        id_comment(shape);
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <input
                value={inputVal}
                onChange={onChange}
                className="px-4 py-2 w-full rounded-2xl text-gray-800 border-2 border-black text-xs"
                type="text"
                placeholder="Presiona enter para comentar"
            />
        </form>
    );
};

export default AddComment;