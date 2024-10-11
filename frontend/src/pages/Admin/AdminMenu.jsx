import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`${
          isMenuOpen ? "top-2 right-3" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
      >
        {isMenuOpen ? (
          <FaTimes color="white"></FaTimes>
        ) : (
          <>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-slate-800 p-4 fixed right-12 top-7">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allProducts"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-slate-600 rounded-sm"
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
