import React, { useEffect } from "react";
import Disk from "../components/Disk";
import BottomNav from "../components/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchUserDisk } from "../redux/features/diskSlice";

const MyDisk = () => {
  const { disks, loading } = useSelector((state) => state.disk);
  const userId = JSON.parse(localStorage.getItem("user")).$id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDisk(userId));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-wrap justify-center w-full h-full gap-4 p-3 pt-4 pb-[66px] sm:justify-start">
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

export default MyDisk;
