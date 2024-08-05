import React from "react";
import Navbar from "../components/Navbar";
import AddDiskForm from "../components/AddDiskForm";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Create = () => {
  const { loading } = useSelector((state) => state.disk);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <AddDiskForm />
          </div>
          <BottomNav />
        </>
      )}
    </>
  );
};

export default Create;
