import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaUserCircle } from "react-icons/fa";

import { logout } from "../redux/features/authSlice";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };

  const handleUserLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
      localStorage.removeItem("user");
    });
    setOpenProfile(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] flex items-center bg-gradient-to-r from-slate-800 to-slate-700  z-20  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <nav className="flex items-center justify-between w-full px-4 md:px-0 md:w-[90%] md:mx-auto">
        <Link to="/" className="flex items-center cursor-pointer">
          <h1 className="text-2xl font-semibold font-ibmsans">Diskettes</h1>
        </Link>
        {/* SEARCH BAR */}
        {user && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center flex-1 gap-2 px-4 py-2 mx-3 overflow-hidden shadow-[inset_-12px_-8px_40px_#46464620] text-white rounded-full bg-slate-700 max-w-96 sm:mx-10 "
          >
            <FaSearch className="text-slate-300" />
            <input
              type="text"
              className="w-full bg-transparent outline-none placeholder:text-slate-300"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        )}
        {/* NAV LINKS */}
        {user && (
          <div className="flex items-center justify-center gap-4">
            <div className="items-center hidden gap-4 sm:flex ">
              <NavLink
                className={({ isActive }) =>
                  `text-md ${
                    isActive &&
                    "text-slate-900 bg-white rounded-full px-2 font-semibold py-1"
                  }`
                }
                to="/"
              >
                <h3>Home</h3>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-md ${
                    isActive &&
                    "text-slate-900 bg-white rounded-full px-2 font-semibold py-1"
                  }`
                }
                to="/disks"
              >
                <h3>My disks</h3>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-md hidden lg:block  ${
                    isActive &&
                    "text-slate-900 bg-white rounded-full px-2 font-semibold py-1"
                  }`
                }
                to="/saved"
              >
                <h3>Saved</h3>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-md ${
                    isActive &&
                    "text-slate-900 bg-white rounded-full px-2 font-semibold py-1"
                  }`
                }
                to="/create"
              >
                <h3>Create new disk</h3>
              </NavLink>
            </div>
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center justify-center gap-1 text-3xl rounded-full cursor-pointer bg-slate-600 sm:text-2xl"
            >
              <FaUserCircle />
              {/* <span className="hidden text-slate-200 sm:block">Profile</span> */}
            </div>
          </div>
        )}
      </nav>
      {openProfile && (
        <div className="absolute flex justify-center top-[60px] right-4 w-[200px] bg-slate-900 rounded-lg p-3 md:right-[5%] ">
          <div className="flex flex-col items-start w-full overflow-hidden truncate">
            <div className="w-full mb-2">
              <h3 className="mb-2 text-lg">{user.name}</h3>
              <h3 className="mb-2 text-sm">{user.email}</h3>
              <hr className="border-slate-400" />
            </div>
            <div className="w-full mb-1 text-sm">
              <Link
                className="hidden hover:text-slate-300 md:block lg:hidden"
                to="/saved"
              >
                Saved disks
              </Link>
            </div>
            <button
              onClick={handleUserLogout}
              className="text-sm hover:text-slate-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
