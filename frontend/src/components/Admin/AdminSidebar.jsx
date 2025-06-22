import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa";

const AdminSidebar = () => {
    const navigate = useNavigate();
    // const handleLogout = ()=> {
    //     navigate("/");
    // };


  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          E-Commerce
        </Link>
      </div>
      <h2 className="text-2xl font-medium mb-6 text-start">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
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
          to="/admin/shop"
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

      </nav>
    </div>
  );
};

export default AdminSidebar;
