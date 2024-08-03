import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/features/authSlice";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="mt-[56px]">
        <Outlet />
      </div>
    </>
  );
};

export default App;
