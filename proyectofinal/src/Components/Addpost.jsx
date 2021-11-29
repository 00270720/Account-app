import React from "react"
import axios from "axios";
import swalt from "sweetalert";

const Addpost = ()  => {
    async function onSubmit(e){
        try{
        const formdata = new FormData(e.target);
        const dat = Object.fromEntries(formdata.entries());
 
        if (dat.title === '' || dat.description === ''){
            e.preventDefault();
            return swalt("Titulo y descripcion no pueden estar vacios");
        } 
        if (dat.title.length < 8 || dat.title.length > 32){
            e.preventDefault();
            return swalt("La longitud del titulo debe estar entre 8 y 32 caracteres");
        }
        if (dat.description.length<8){
            e.preventDefault();
            return swalt("La descripcion debe contener como minimo 8 caracteres");
        }
    
        const res = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create', {...dat, active: dat.active === 'on'},{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            
        });

        console.log(res);}
        catch(err){
            console.log(err.response);
        }
        e.target.reset()

      
    }
    
    return(
        <form id="FormPost"onSubmit={onSubmit} className="space-y-4 text-center w-screen pr-80 pl-80 font-bold  ">
            <div className="flex flex-col w-max">
                <label htmlFor="title">Titulo</label>
                <input className="my-1 mx-32 w-96 pl-3 rounded bg-gray-300 border-gray-800 border-2" type="text" name="title" id="title"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="description">Descripción</label>
                <input className="my-1 mx-32 w-96 pl-3 rounded bg-gray-300 border-gray-800 border-2" type="text" name="description" id="description"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="image">Imagen</label>
                <input className="my-1 mx-32 w-96 pl-3 rounded bg-gray-300 border-gray-800 border-2" type="text" name="image" id="image"/>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm w-auto">Enviar</button>
            
        </form>
    );
}
    

export default Addpost;