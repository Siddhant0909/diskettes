import React from "react";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <GridLoader color="white" />
    </div>
  );
};

export default Loader;
