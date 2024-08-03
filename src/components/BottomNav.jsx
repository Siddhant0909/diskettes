import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { FaWindowRestore } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const BottomNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center w-full p-2 text-white h-14 bg-slate-800 sm:hidden">
      <nav className="flex items-center justify-between w-full mx-11">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-slate-400" : "text-white"
            }`
          }
        >
          <i className="fa-solid fa-house"></i>
          <h5 className="text-sm">Home</h5>
        </NavLink>
        <NavLink
          to="/disks"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-slate-400" : "text-white"
            }`
          }
        >
          <FaWindowRestore />
          <h5 className="text-sm"> Disks</h5>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-slate-400" : "text-white"
            }`
          }
        >
          <FaBookmark />
          <h5 className="text-sm">Saved</h5>
        </NavLink>
      </nav>
      <div className="absolute top-[-58px] right-4 text-[50px] text-slate-300 md:hidden">
        <Link to="/create">
          <IoIosAddCircle />
        </Link>
      </div>
    </footer>
  );
};

export default BottomNav;
