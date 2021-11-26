import { useUserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom';

const LockRoutes = ({role="user", children }) => {
  const { token, user } = useUserContext();
  
  if(!token) return <Navigate replace to="/login"/>;
  if(!user || user.role !== role) return <Navigate replace to="/404"/>;

  return children;
}

export default LockRoutes;