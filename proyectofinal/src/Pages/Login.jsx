import { useState } from 'react';

import { useUserContext } from '../Context/UserContext'

import { Navigate } from 'react-router-dom';


export default function Login() {
    const { login, token } = useUserContext();

    const [user_name, setUser_name] = useState('');
    const [password, set_Password] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(user_name, password);

        setError(!logged);
        setUser_name("");
        set_Password("");
    }

    if (token) {
        return <Navigate to="/refer" />
         }
    //Aqui se le pedirá las credenciales, si digita alguna de las credenciales incorrectas, se muestra un mensaje de error

    return (
        <div className="flex justify-center items-center min-h-screen">
            <main className="rounded-md p-8 md:p-10 shadow-2xl border-8">
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 items-center justify-center h-96">
                    <h2 className="font-extrabold uppercase  font-monserrat text-4xl mb-14">Your Account</h2>

                    
                    <i className="fa fa-user">  User</i> 
                    <input id="place" className=" bg-gray-100 opacity-60 font-medium w-full text-black p-2 rounded"
                        
                        type='text'
                        value={user_name}
                        placeholder='Enter your username'
                        onChange={(e) => onChange(e, setUser_name)}
                        
                        
                    />
                    
                    <i className="fa fa-unlock-alt">  Password</i> 
                    <input id="holder" className=" bg-gray-100 opacity-60 font-medium w-full text-black p-2 rounded"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => onChange(e, set_Password)}
                        value={password}
                    />
                    {error && <p className="w-full rounded p-3 text-center text-transparent-dark-dark-dark-light font-extrabold font-roboto bg-transparent-dark-dark-dark-dark-dark-dark select-none animate-pulse">
                        Un error ha ocurrido, intenta de nuevo
                    </p>}

                    <button className="animate-bounce rounded-lg mt-8 w-full transition border border-black duration-300 ease-in-out text-xl text-extrabold bg-gradient-to-r from-green-600 to-blue-500 hover:from-blue-500 hover:to-green-600 py-2 px-4 text-transparent-dark-dark-dark-light">Sign In </button>
                    
                
                </form>
            </main>
        </div>
    );
}


