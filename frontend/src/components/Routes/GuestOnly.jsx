import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestOnly = () => {
  const { user } = useSelector((state) => state.auth);
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestOnly;
