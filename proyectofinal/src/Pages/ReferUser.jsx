import { useUserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom';

const rolePages = {
  "admin": "/admin",
  "user": "/user"
}

const ReferUser = () => {
  const { user } = useUserContext();

  if(!user) return <p className="bg-transparent mt-52 text-center font-extrabold p-24 text-4xl"> No se puede redireccionar, lo sentimos. </p>;

  return <Navigate replace to={rolePages[user.role] ?? "/"} />
}

export default ReferUser;