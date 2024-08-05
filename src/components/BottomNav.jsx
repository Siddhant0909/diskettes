import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { FaWindowRestore } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

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
      <div className="absolute top-[-58px] bg-slate-500 rounded-full right-[20px] lg:hidden text-white box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12) text-[32px] p-2  cursor-pointer ">
        <Link to="/create">
          <FaPlus />
        </Link>
      </div>
    </footer>
  );
};

export default BottomNav;
