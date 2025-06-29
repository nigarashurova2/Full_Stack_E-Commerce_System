import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 

const RequireAuth = () => {
  const { user } = useSelector((state) => state.auth); 
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
