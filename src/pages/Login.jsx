import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isVisble, setIsVisible] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
    }, 2000);
    () => clearInterval(timer);
  }, []);
  return !loading ? isVisble ? <LoginForm /> : <Loader /> : <Loader />;
};

export default Login;
