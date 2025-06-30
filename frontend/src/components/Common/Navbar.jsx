import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const location = useLocation();
  const isActive = (query) => {
    return location.search === query;
  };
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-2xl font-semibold">
            E-Commerce
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className={`text-sm font-medium uppercase ${
              isActive("?gender=Men")
                ? "font-700 shadow-2xl text-[#ea2e0e]"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className={`text-sm font-medium uppercase ${
              isActive("?gender=Women")
                ? "font-700 shadow-2xl text-[#ea2e0e]"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className={`text-sm font-medium uppercase ${
              isActive("?category=Top%20Wear")
                ? "font-700 shadow-2xl text-[#ea2e0e]"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className={`text-sm font-medium uppercase ${
              isActive("?category=Bottom%20Wear")
                ? "font-700 shadow-2xl text-[#ea2e0e]"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Bottom Wear
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!user && (
            <Link
              to="/Login"
              className="block bg-[#ea2e0e] rounded-full px-5 py-1  text-sm text-white underline"
            >
              Login
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 py-1 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}
          {user && (
            <Link to="/profile" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>
          )}
          <button
            className="relative hover:text-black cursor-pointer"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1  bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button
            className="md:hidden space-x-6 cursor-pointer"
            onClick={toggleNavDrawer}
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 
          md:w-1/3 h-full bg-white shadow-lg transform
           transition-transform duration-300 z-50
           ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button className="cursor-pointer" onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className={`block text-sm font-medium uppercase ${
                isActive("?gender=Men")
                  ? "font-700 shadow-2xl text-[#ea2e0e]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className={`block text-sm font-medium uppercase ${
                isActive("?gender=Women")
                  ? "font-700 shadow-2xl text-[#ea2e0e]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className={`block text-sm font-medium uppercase ${
                isActive("?category=Top Wear")
                  ? "font-700 shadow-2xl text-[#ea2e0e]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className={`block text-sm font-medium uppercase ${
                isActive("?category=Bottom Wear")
                  ? "font-700 shadow-2xl text-[#ea2e0e]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
