import React from "react";
import Navbar from "../Components/Navbar";
import Blog from "../Components/Blog";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AuthUser from "../Components/AuthUser";
// import Home from "../Components/Home";
import FullBlogDetails from "../Components/FullBlogDetails";
function Guest() {
  const { http } = AuthUser();


  return (
    <>
      <Navbar />

      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/blogs" element={<Blog/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/FullBlogDetails/:id" element={<FullBlogDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default Guest;
