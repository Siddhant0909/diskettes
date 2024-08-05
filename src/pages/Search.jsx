import React, { useEffect, useState } from "react";
import Disk from "../components/Disk";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { fetchAllDisk } from "../redux/features/diskSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [isVisble, setIsVisible] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))?.$id;
  const { disks, loading } = useSelector((state) => state.disk);
  const [searchDisks, setSearchDisks] = useState([]);
  const { diskTitleSlug } = useParams();

  useEffect(() => {
    dispatch(fetchAllDisk());
  }, []);

  useEffect(() => {
    if (disks) {
      setIsVisible(false);
      setSearchDisks(
        disks.filter((disk) =>
          disk.title.toLowerCase().includes(diskTitleSlug.toLowerCase())
        )
      );
    }
  }, [disks, diskTitleSlug]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
    }, 1000);
    () => clearInterval(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : !isVisble ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-wrap justify-center w-full h-full gap-4 p-3 pt-4 pb-[66px] sm:justify-start">
        {searchDisks?.map((disk) => (
          <div key={disk.$id}>
            <Disk disk={disk} userId={userId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
