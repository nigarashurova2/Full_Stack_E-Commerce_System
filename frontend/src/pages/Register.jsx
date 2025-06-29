import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    dispatch(registerUser({ email, password, name }));
  };
  return (
    <div className="flex ">
      <div className="w-full flex md:w-1/2 flex-col  justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-center ">Register</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="w-full p-2 border rounded"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your fullname"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link to="/login" className="ml-1 text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-[100vh] flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Login to Account"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
