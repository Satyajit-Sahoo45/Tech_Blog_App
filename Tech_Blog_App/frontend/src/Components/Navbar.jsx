import React, { useState } from "react";
import AuthUser from "./AuthUser";

function Navbar() {
  let [open, setOpen] = useState(false);
  const { token, user, logout } = AuthUser();

  const logoutuser = () => {
    if (token != undefined) {
      logout();
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-slate-400 py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-2xl text-indigo-600 p-2">
            <i className="fa-solid fa-bullseye"></i>
          </span>
          TechBlog
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <i className="fa-solid fa-bars" name={open ? "close" : "menu"}></i>
        </div>

        <ul
          className={`md:flex md:items-center uppercase md:pb-0 pb-12 absolute md:static bg-slate-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-14" : "top-[-1000px]"
          }`}
        >
          {user ? (
            <li className="md:ml-8 text-sm md:my-0 my-7">
              <a
                href="/"
                className="text-gray-800 hover:text-red-500 hover:cursor-pointer duration-500"
              >
                Home
              </a>
            </li>
          ) : (
            ""
          )}
          <li className="md:ml-8 text-sm md:my-0 my-7">
            <a
              href="/blogs"
              className="text-gray-800 hover:text-red-500 hover:cursor-pointer duration-500"
            >
              Blogs
            </a>
          </li>
          {token ? (
            <li className="md:ml-8 text-sm md:my-0 my-7">
              <a
                href="/yourBlogs"
                className="text-gray-800 hover:text-red-500 hover:cursor-pointer duration-500"
              >
                Your Blogs
              </a>
            </li>
          ) : (
            ""
          )}
          <div className="w-15 p-3">
            {!token ? (
              <a
                href="/login"
                className="p-3 text-white bg-blue-600 rounded-lg "
              >
                SignIn
              </a>
            ) : (
              <a
                onClick={logoutuser}
                className="p-3 text-white bg-blue-600 rounded-lg "
              >
                Logout
              </a>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
