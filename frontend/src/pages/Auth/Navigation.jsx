import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../redux/api/usersSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavouritesCount from "../Products/FavouritesCount";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:flex sm:hidden flex-col justify-between p-4 text-white bg-slate-900 w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={25} className="mr-2 mt-[2rem]" />
          <span className="hidden nav-item-name mt-[2rem]">HOME</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={25} className="mr-2 mt-[2rem]" />
          <span className="hidden nav-item-name mt-[2rem]">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={25} className="mr-2 mt-[2rem]" />
          <span className="hidden nav-item-name mt-[2rem]">CART</span>

          <div className="absolute left-4">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link
          to="/favourite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={25} className="mr-2 mt-[2rem]" />
          <span className="hidden nav-item-name mt-[2rem]">FAVOURITE</span>
          <FavouritesCount></FavouritesCount>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                menuOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              ></path>
            </svg>
          )}
        </button>

        {/* dropdown list */}
        {menuOpen && userInfo && (
          <ul
            className={`absolute w-max right-0 mt-2 mr-14 space-y-2 text-white bg-gray-700 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-400">
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-400"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin size={25} className="mr-2 mt-[2rem]" />
              <span className="hidden nav-item-name mt-[2rem]">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={25} className="mr-2 mt-[2rem]" />
              <span className="hidden nav-item-name mt-[2rem]">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
