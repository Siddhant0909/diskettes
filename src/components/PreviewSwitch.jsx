import React from "react";
import { FaCode, FaEye } from "react-icons/fa";

const PreviewSwitch = ({ preview, setPreview }) => {
  return (
    <div className="fixed bottom-[30px] right-[20px] lg:hidden text-slate-900">
      {preview ? (
        <div
          onClick={() => setPreview(false)}
          className="text-[25px] bg-slate-300 p-2 rounded-full cursor-pointer"
        >
          <FaCode />
        </div>
      ) : (
        <div
          onClick={() => setPreview(true)}
          className="text-[25px] bg-slate-300 p-2 rounded-full cursor-pointer"
        >
          <FaEye />
        </div>
      )}
    </div>
  );
};

export default PreviewSwitch;
