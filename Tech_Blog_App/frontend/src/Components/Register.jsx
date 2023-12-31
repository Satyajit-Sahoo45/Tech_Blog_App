import React, { useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = () => {
    http
      .post("/register", { email: email, password: password, name: name })
      .then((res) => {
        navigate("/login");
      });
  };

  return (
    <div className="h-screen -z-10 flex justify-center items-center">
      <div className="bg-gray-200 pt-8 pb-16 shadow-xl rounded md:max-w-lg">
        <div className="w-4/5 mx-auto">
          <div className="flex items-center bg-white rounded shadow-md mb-4">
            <span className="px-3">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              className="w-full h-12 focus:outline-none"
              type="text"
              name="name"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white rounded shadow-md mb-4">
            <span className="px-3">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              className="w-full h-12 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white rounded shadow-md mb-4">
            <span className="px-3">
              <i className="fa-sharp fa-solid fa-lock"></i>
            </span>
            <input
              className="w-full h-12 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <a href="/login" className="text-sm underline text-blue-600">
              Already have an account?
            </a>
          </div>
          <button
            className="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2"
            type="button"
            onClick={submitForm}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
