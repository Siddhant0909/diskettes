import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomNav from "../components/BottomNav";
import Disk from "../components/Disk";
import Loader from "../components/Loader";
import { fetchAllDisk } from "../redux/features/diskSlice";
import { fetchSavedDisk } from "../redux/features/saveSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, disks } = useSelector((state) => state.disk);
  const [isVisble, setIsVisible] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).$id;
  useEffect(() => {
    dispatch(fetchAllDisk());
  }, []);
  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedDisk(userId));
    }
  }, [userId]);
  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
    }, 500);
    () => clearInterval(timer);
  }, []);
  return loading ? (
    <Loader />
  ) : !isVisble ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-wrap justify-center w-full h-full gap-4 p-3 pt-4 pb-[66px] sm:justify-start sm:px-0">
        {disks?.map((disk) => (
          <div key={disk.$id}>
            <Disk disk={disk} userId={userId} />
          </div>
        ))}
      </div>
      <BottomNav />
    </>
  );
};

export default Home;
