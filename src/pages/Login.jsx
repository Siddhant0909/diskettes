import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return !loading ? <LoginForm /> : <Loader />;
};

export default Login;
