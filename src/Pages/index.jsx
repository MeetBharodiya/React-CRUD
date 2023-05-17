import React from "react";
import {Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Form from "./Form/Form";
import Dashbaord from "./Dashboard/Dashbaord";
import ViewProfile from "./ViewProfile/ViewProfile";

const index = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashbaord />} />
        <Route path="/view/:id" element={<ViewProfile />} />
      </Routes>
    </>
  );
};

export default index;
