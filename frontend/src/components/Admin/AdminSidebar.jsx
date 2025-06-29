import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          E-Commerce
        </Link>
      </div>
      {/* <h2 className="text-2xl font-medium mb-6 text-start">Admin Dashboard</h2> */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } flex items-center space-x-2 rounded py-3 px-4`
          }
        >
          <MdOutlineDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } flex items-center space-x-2 rounded py-3 px-4`
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } flex items-center space-x-2 rounded py-3 px-4`
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } flex items-center space-x-2 rounded py-3 px-4`
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } flex items-center space-x-2 rounded py-3 px-4`
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="cursor-pointer hover:bg-red-700 w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <FaSignOutAlt />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
