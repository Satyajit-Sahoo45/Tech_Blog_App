import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Blog from "../Components/Blog";
import YourBlog from "../Components/YourBlog";
import FullBlogDetails from "../Components/FullBlogDetails";
import Home from "../Components/Home";
import UpdateItem from "../Components/UpdateItem";

const Auth = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/yourBlogs" element={<YourBlog />} />
        <Route path="/FullBlogDetails/:id" element={<FullBlogDetails />} />
        <Route path="/edit/item/:id" element={<UpdateItem />} />
      </Routes>
    </>
  );
};

export default Auth;
