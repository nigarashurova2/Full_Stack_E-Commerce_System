import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: curUser } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //Default role
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (curUser && curUser.role !== "admin") {
      navigate("/");
    }
  }, [curUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log(userId, newRole, "userId, newRole");
    
    dispatch(updateUser({ id: userId, role: newRole }));
  };
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-400 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="w-full border p-2 border-gray-400 rounded"
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-b-gray-300 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    name="role"
                    id="role"
                    className="w-full border p-2 border-gray-400 rounded"
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    value={user.role}
                    disabled={user._id === curUser._id}
                  >
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    disabled={user._id === curUser._id}
                    onClick={() => handleDeleteUser(user._id)}
                    className={`bg-red-500 hover:bg-red-700 cursor-pointer text-md text-white px-2 py-2 rounded ${user._id === curUser._id && "disabled:cursor-not-allowed disabled:opacity-50"} `}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
