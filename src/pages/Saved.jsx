import React, { useEffect } from "react";
import Disk from "../components/Disk";
import BottomNav from "../components/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchSavedDisk,
  fetchSavedDiskDetails,
} from "../redux/features/saveSlice";
import { fetchAllDisk } from "../redux/features/diskSlice";

const Saved = () => {
  const dispatch = useDispatch();
  const { loading, savedDisks, savedDisksDetails } = useSelector(
    (state) => state.savedDisk
  );
  const userId = JSON.parse(localStorage.getItem("user"))?.$id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedDisk(userId));
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchAllDisk());
  }, []);

  useEffect(() => {
    if (savedDisks.length > 0) {
      const diskIds = savedDisks.map((savedDisk) => savedDisk.diskId);
      dispatch(fetchSavedDiskDetails(diskIds));
    }
  }, [savedDisks, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-wrap justify-center w-full h-full gap-4 p-3 pt-4 pb-[66px] sm:justify-start sm:px-0">
        {savedDisksDetails?.map((disk) => (
          <div key={disk.$id}>
            <Disk disk={disk} userId={userId} />
          </div>
        ))}
      </div>
      <BottomNav />
    </>
  );
};

export default Saved;
