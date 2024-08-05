import React from "react";
import { COLORS } from "../utils/constants";

const ColorSelector = ({ setColor }) => {
  const colors = Object.entries(COLORS);

  return (
    <div className="flex items-center justify-between w-full">
      {colors.map((color) => (
        <div
          key={color[0]}
          style={{ backgroundColor: color[1] }}
          className="p-3 rounded-full cursor-pointer hover:brightness-110 active:brightness-50"
          onClick={() => setColor(color[1])}
        ></div>
      ))}
    </div>
  );
};

export default ColorSelector;
