import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ColorSelector from "./ColorSelector";
import { SAMPLE_CODE } from "../utils/constants";
import { createNewDisk } from "../redux/features/diskSlice";

const AddDiskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ef4444");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    name: user.name,
    userId: user.$id,
    email: user.email,
    title,
    description,
    color,
    html: SAMPLE_CODE.html,
    css: SAMPLE_CODE.css,
    javascript: SAMPLE_CODE.javascript,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewDisk(data)).then((res) => {
      navigate(`/disk/${res.payload.$id}`);
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen mt-[-56px] p-2">
      <div className=" w-[350px] bg-slate-900 shadow-sm mt-7 rounded-xl  border-2 border-solid border-slate-900">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-white">Create Disk</h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm text-white"
                  >
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="block w-full px-4 py-3 text-sm border-2 border-solid rounded-lg outline-none bg-slate-900 border-slate-700 text-slate-400 placeholder-slate-500"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoComplete="off"
                      placeholder="Add a title"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm text-white"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      className="block w-full h-[120px] px-4 py-3 text-sm border-2 border-solid rounded-lg outline-none resize-none bg-slate-900 border-slate-700 text-slate-400 placeholder-slate-500"
                      autoComplete="off"
                      spellCheck="false"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a description"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block mb-2 text-sm text-white">
                      Color
                    </label>
                  </div>
                  <div className="relative">
                    <div
                      className="relative flex items-center w-full h-[40px] px-4 py-3 text-sm border-2 border-solid rounded-lg outline-none bg-slate-900 border-slate-700 "
                      style={{ borderColor: color }}
                    >
                      <ColorSelector setColor={setColor} />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-lg bg-slate-700 gap-x-2 hover:bg-slate-600 focus:outline-none focus:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiskForm;
