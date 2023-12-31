import React from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function BlogItem({ blog, userId }) {
  const navigate = useNavigate();
  const { token, http, user } = AuthUser();

  const blogClick = (id) => {
    if (blog.publish_status === "member") {
      if (token) {
        navigate(`/FullBlogDetails/${id}`);
      } else {
        navigate("/login");
      }
    } else if (blog.publish_status === "public") {
      navigate(`/FullBlogDetails/${id}`);
    }
  };

  const navigateSingle = (id) => {
    return () => {
      blogClick(id);
    };
  };

  const updateItem = (updateId) => {
    navigate(`/edit/item/${updateId}`);
  };

  const deleteItem = (deleteId) => {
    http
      .delete(`/deleteBlog/${deleteId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(userId);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl mt-3">
      <div className="md:flex">
        <div>
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            <div className="flex justify-between">
              <h1
                className={`relative -top-6 ${
                  blog.publish_status == "member"
                    ? "bg-red-900"
                    : "bg-slate-600"
                } text-white w-fit`}
              >
                {blog.publish_status}
              </h1>
              

            
              {user ? (
                user.id === userId ? (
                  <div className="md:relative md:-top-6 md:-right-44">
                    <a
                      onClick={() => deleteItem(blog.id)}
                      className="p-2 text-sm"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </a>
                    <a onClick={() => updateItem(blog.id)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <h1>
              <span className="text-red-600">Title: </span> {blog.title}
            </h1>
            <p>
              <span className="text-red-600">Summary: </span> {blog.summary}{" "}
            </p>
            <h1>
              <span className="text-gray-500">Author: </span> {blog.author}{" "}
            </h1>
            <button
              type="button"
              onClick={navigateSingle(blog.id)}
              className="relative -right-56 -bottom-6 text-red-700 hover:cursor-pointer hover:scale-110 hover:transition"
            >
              View More
              <i className="fa-solid fa-arrow-right text-red-700 p-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
