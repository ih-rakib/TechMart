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
import { useLogoutMutation } from "../../redux/api/usersSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavouritesCount from "../Products/FavouritesCount";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      setMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const links = [
    { to: "/", label: "Home", icon: <AiOutlineHome size={22} /> },
    { to: "/shop", label: "Shop", icon: <AiOutlineShopping size={22} /> },
    { to: "/cart", label: "Cart", icon: <AiOutlineShoppingCart size={22} />, count: cartCount },
    { to: "/favourite", label: "Saved", icon: <FaHeart size={20} />, extra: <FavouritesCount /> },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        id="navigation-container"
        className="fixed left-0 top-0 z-40 hidden h-screen flex-col justify-between overflow-x-hidden bg-slate-900 p-4 text-white md:flex"
      >
        <nav className="flex flex-col gap-7 pt-5">
          {links.map((item) => (
            <Link key={item.to} to={item.to} title={item.label} className="nav-link flex min-h-8 items-center gap-3">
              <span className="shrink-0">{item.icon}</span>
              <span className="nav-item-name whitespace-nowrap">{item.label.toUpperCase()}</span>
              {item.count > 0 && <span className="rounded-full bg-pink-500 px-1.5 text-xs">{item.count}</span>}
              {item.extra}
            </Link>
          ))}
        </nav>

        <div className="relative">
          {userInfo ? (
            <>
              <button onClick={() => setMenuOpen((open) => !open)} className="max-w-full break-words text-left text-sm text-white">
                {userInfo.username} ▾
              </button>
              {menuOpen && (
                <div className="mt-2 flex flex-col rounded bg-slate-700 py-1">
                  {userInfo.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" className="px-3 py-2 hover:bg-slate-600">Dashboard</Link>
                      <Link to="/admin/productlist" className="px-3 py-2 hover:bg-slate-600">Products</Link>
                      <Link to="/admin/categorylist" className="px-3 py-2 hover:bg-slate-600">Categories</Link>
                      <Link to="/admin/orderlist" className="px-3 py-2 hover:bg-slate-600">Orders</Link>
                      <Link to="/admin/userlist" className="px-3 py-2 hover:bg-slate-600">Users</Link>
                    </>
                  )}
                  <Link to="/profile" className="px-3 py-2 hover:bg-slate-600">Profile</Link>
                  <button onClick={logoutHandler} className="px-3 py-2 text-left hover:bg-slate-600">Logout</button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" title="Login" className="nav-link flex items-center gap-3"><AiOutlineLogin size={22} /><span className="nav-item-name">LOGIN</span></Link>
              <Link to="/register" title="Register" className="nav-link flex items-center gap-3"><AiOutlineUserAdd size={22} /><span className="nav-item-name">REGISTER</span></Link>
            </div>
          )}
        </div>
      </aside>

      {/* Phone navigation: fixed bottom bar instead of a narrow desktop sidebar */}
      <nav className="mobile-navigation fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-slate-700 bg-slate-900 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2 text-white md:hidden">
        {links.map((item) => (
          <Link key={item.to} to={item.to} className="relative flex min-w-0 flex-col items-center justify-center gap-1 py-1 text-xs">
            <span className="relative">{item.icon}
              {item.count > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-pink-500 px-1 text-[10px]">{item.count}</span>}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
        {!userInfo ? (
          <div className="col-span-4 flex justify-center gap-6 border-t border-slate-700 pt-2">
            <Link to="/login" className="flex items-center gap-1 text-xs"><AiOutlineLogin size={16} /> Login</Link>
            <Link to="/register" className="flex items-center gap-1 text-xs"><AiOutlineUserAdd size={16} /> Register</Link>
          </div>
        ) : (
          <div className="col-span-4 flex justify-center gap-5 border-t border-slate-700 pt-2 text-xs">
            <Link to="/profile">Profile</Link>
            {userInfo.isAdmin && <Link to="/admin/dashboard">Admin</Link>}
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
