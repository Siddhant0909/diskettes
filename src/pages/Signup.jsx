import React from "react";
import { useSelector } from "react-redux";
import SignupForm from "../components/SignupForm";
import Loader from "../components/Loader";

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  return !loading ? <SignupForm /> : <Loader />;
};

export default Signup;
