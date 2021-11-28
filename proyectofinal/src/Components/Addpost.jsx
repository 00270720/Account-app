import React from "react"
import axios from "axios";
const Addpost = ()  => {
    async function onSubmit(e){
        try{
        e.preventDefault();

        const formdata = new FormData(e.target);
        const dat = Object.fromEntries(formdata.entries());
 
        if (dat.title === '' || dat.description === '') return alert('El titulo y la descripcion son campos obligarios');

        
            
        
        const res = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create', {...dat, active: dat.active === 'on'},{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        });

        console.log(res);}
        catch(err){
            console.log(err.response);
        }
    }
    return(
        <form onSubmit={onSubmit} className="space-y-4 text-center w-full pr-80 pl-80 font-bold  ">
            <div className="flex flex-col ">
                <label htmlFor="title">Titulo</label>
                <input className="my-1 mx-32" type="text" name="title" id="title"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="description">Descripción</label>
                <input className="my-1 mx-32" type="text" name="description" id="description"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="image">Imagen</label>
                <input className="my-1 mx-32" type="text" name="image" id="image"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="active">Post Active</label>
                <input className=" " type="checkbox" name="active" id="active"/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm w-auto">Enviar</button>
        </form>
    );
}
    

export default Addpost;