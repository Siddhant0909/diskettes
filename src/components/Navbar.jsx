import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BsFillFloppyFill } from "react-icons/bs";

import { logout } from "../redux/features/authSlice";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleUserLogout = () => {
    dispatch(logout());
    setOpenProfile(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] flex items-center bg-slate-800 z-40">
      <nav className="flex items-center justify-between w-full px-4 md:px-0 md:w-[80%] md:mx-auto">
        <Link to="/" className="flex items-center cursor-pointer">
          <h1 className="text-2xl font-semibold font-ibmsans">Diskettes</h1>
        </Link>
        {/* SEARCH BAR */}
        {user && (
          <div className="flex items-center flex-1 gap-2 px-4 py-2 mx-3 overflow-hidden text-white rounded-full bg-slate-700 max-w-96 sm:mx-10">
            <FaSearch className="text-slate-300" />
            <input
              type="text"
              className="w-full bg-transparent outline-none placeholder:text-slate-300"
              placeholder="Search"
            />
          </div>
        )}
        {/* PROFILE BUTTON */}
        {user && (
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center justify-center gap-1 px-2 py-2 rounded-full cursor-pointer bg-slate-600 sm:py-1"
          >
            <FaUserCircle />
            <span className="hidden text-slate-200 sm:block">Profile</span>
          </div>
        )}
      </nav>
      {openProfile && (
        <div className="absolute flex justify-center top-[60px] right-4 w-[200px] bg-slate-900 rounded-lg p-3 md:right-[10%]">
          <div className="flex flex-col items-start w-full overflow-hidden truncate">
            <div className="w-full mb-2">
              <h3 className="mb-2 text-lg">{user.name}</h3>
              <h3 className="mb-2 text-sm">{user.email}</h3>
              <hr className="border-slate-400" />
            </div>
            <button onClick={handleUserLogout} className="hover:text-slate-300">
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
