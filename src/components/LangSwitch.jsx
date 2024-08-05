import React from "react";
import { LANGUAGES } from "../utils/constants";

const LangSwitch = ({ setActive, active }) => {
  const handleClick = (lang) => {
    setActive(lang);
  };
  return (
    <div className="flex">
      {LANGUAGES.map((lang) =>
        active === lang ? (
          <button
            key={lang}
            onClick={() => handleClick(lang)}
            className="p-1 text-sm bg-[#011627] hover:bg-slate-600 "
          >
            {lang.toUpperCase()}
          </button>
        ) : (
          <button
            key={lang}
            onClick={() => handleClick(lang)}
            className="p-1 text-sm hover:bg-slate-600 active:bg-slate-800"
          >
            {lang.toUpperCase()}
          </button>
        )
      )}
    </div>
  );
};

export default LangSwitch;
