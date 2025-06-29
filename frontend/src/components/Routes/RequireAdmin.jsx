import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RequireAdmin;
