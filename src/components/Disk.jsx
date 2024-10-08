import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveDisk, unsaveDisk } from "../redux/features/saveSlice";

const Disk = ({ disk, userId }) => {
  const dispatch = useDispatch();

  const { savedDisks } = useSelector((state) => state.savedDisk);

  const documentId = savedDisks.find(
    (saveDisk) => saveDisk.diskId === disk.$id
  )?.$id;

  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    if (!isSaved) {
      dispatch(
        saveDisk({
          userId: userId,
          diskId: disk.$id,
        })
      );
    } else {
      dispatch(unsaveDisk({ documentId, diskId: disk.$id }));
    }
    setIsSaved(!isSaved);
  };
  useEffect(() => {
    setIsSaved(savedDisks.some((savedDisk) => savedDisk.diskId === disk.$id));
  }, []);

  return (
    <div
      className="w-[300px] h-[310px] rounded-md rounded-br-[60px] px-5 font-caveat relative border-[1px] border-slate-200 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
      style={{ backgroundColor: disk.color }}
    >
      <Link
        to={`/disk/${disk.$id}`}
        className="w-full bg-white h-[70%] rounded-b-md text-black  p-2 flex flex-col"
      >
        <h1 className="text-3xl font-semibold truncate ">{disk.title}</h1>
        <div className="flex-1 w-full px-1 overflow-hidden text-2xl font-medium text-gray-700 break-words ">
          {disk.description}
        </div>
      </Link>
      <div className="flex flex-col relative px-2 py-1 rounded-md mt-2 text-white bg-[#020202a7]  rounded-br-[50px] overflow-hidden">
        <div>
          <h3 className="text-2xl text-ellipsis">{disk.name}</h3>
          <h3 className="text-xl text-ellipsis">{disk.email}</h3>
        </div>
        <div
          onClick={toggleSave}
          className="absolute flex items-center gap-1 transition-all ease-in-out rounded-md top-2 right-3 hover:brightness-50 active:brightness-100"
        >
          {!isSaved ? <FaRegBookmark /> : <FaBookmark />}
        </div>
      </div>
    </div>
  );
};

export default Disk;
