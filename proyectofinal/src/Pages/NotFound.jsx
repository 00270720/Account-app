import { Navigate, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/login')
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen ">
            <img src="https://image.winudf.com/v2/image1/Y29tLmhpZGVhLmNhdF9zY3JlZW5fMF8xNjI5NDM4NTY4XzA1NQ/screen-0.jpg?fakeurl=1&type=.jpg" alt="logo" className="w-72 h-44 mb-4" />
            <h2 className="text-6xl font-roboto text-center mb-6">404</h2>
            <h3 className="text-xl font-roboto text-center">OOOPS!</h3>
            <p className="text-lg font-roboto text-center ">Post not found</p>
            <button className="font-roboto bg-soup text-graw m-4 py-2 px-4 rounded hover:scale-75 bg-transparent-dark-dark-dark-dark-dark hover:bg-transparent-dark-dark-dark-dark-dark-dark-dark" onClick={(e) => onClick(e)}>Go to Login</button>
        </div>
    ); 
}

export default NotFound;