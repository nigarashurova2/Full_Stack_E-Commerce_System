import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  const userId = user ? user._id : null;
  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(
          mergeCart({
            guestId,
            userId,
          })
        ).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex ">
      <div className="w-full flex md:w-1/2 flex-col  justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-center ">Login</h2>
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
            {loading ? "Loading..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="ml-1 text-blue-500 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-[100vh] flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to Account"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
