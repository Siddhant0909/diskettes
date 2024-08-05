import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then(() => navigate("/"));
  };

  return (
    <div className="flex items-center justify-center mt-[-56px] w-full h-screen">
      <div className=" w-[350px] bg-slate-900 shadow-sm mt-7 rounded-xl  border-2 border-solid border-slate-900">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-white">Login</h1>
            <p className="mt-2 text-sm text-slate-400 ">
              Don't have an account yet?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-blue-500 decoration-2 hover:underline focus:outline-none focus:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleUserLogin}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-2 border-solid rounded-lg outline-none bg-slate-900 border-slate-700 text-slate-400 placeholder-slate-500"
                      required
                      autoComplete="off"
                      spellCheck="false"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-3 text-sm border-2 border-solid rounded-lg outline-none bg-slate-900 border-slate-700 text-slate-400 placeholder-slate-500"
                      required
                      autoComplete="off"
                      spellCheck="false"
                      placeholder="password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-lg bg-slate-700 gap-x-2 hover:bg-slate-600 focus:outline-none focus:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
