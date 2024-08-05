import React from "react";
import { FaCode, FaEye } from "react-icons/fa";

const PreviewSwitch = ({ preview, setPreview }) => {
  return (
    <div className="fixed bottom-[30px] bg-slate-500 rounded-full right-[20px] lg:hidden text-white box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)">
      {preview ? (
        <div
          onClick={() => setPreview(false)}
          className="text-[25px] p-2 rounded-full cursor-pointer"
        >
          <FaCode />
        </div>
      ) : (
        <div
          onClick={() => setPreview(true)}
          className="text-[25px] p-2 rounded-full cursor-pointer"
        >
          <FaEye />
        </div>
      )}
    </div>
  );
};

export default PreviewSwitch;
