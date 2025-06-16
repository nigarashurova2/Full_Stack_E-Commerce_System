import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import {FiPhoneCall} from "react-icons/fi"

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">
            Newsletter
          </h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 1-% off your first order.
          </p>
          {/* newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md 
              focus:outline-none focus:ring-0 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm
               rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's bottom wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow us</h3>
          <div className="flex items-center gap-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p className="text-sm text-gray-800">
            <FiPhoneCall  className="inline-block mr-2"/>
            070-843-2822
          </p>
        </div>
      </div>
      {/* footer bottom */}
      <div className="container mx-auto flex items-center  justify-center border-t border-gray-200 pt-6 mt-4">
        <p className="text-gray-500 text-sm tracking-tight text-center">{new Date().getFullYear()}, CompileTab. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
