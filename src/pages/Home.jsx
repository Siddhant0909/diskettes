import React from "react";
import { useDispatch } from "react-redux";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <BottomNav />
    </div>
  );
};

export default Home;
