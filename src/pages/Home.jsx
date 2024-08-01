import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      Home
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Home;
