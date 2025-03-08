import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import darkBackground from "../assets/dark-background.jpg";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const notify = () => toast.success("Login Successfull");
  const error = () => toast.error("Incorrect Credential");

  const handleSubmit = () => {
    const payLoad = {
      email: email,
      password: password,
    };
    // console.log(payLoad);

    axios
      .post("https://reqres.in/api/login", payLoad)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        console.log("Login Successful", res);
        Navigate("/dashboard");
        notify();
      })
      .catch((err) => {
        console.log("Something Went Wrong", err);
        error();
      });
  };
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${darkBackground})` }}
    >
      <div className="bg-white text-black w-96 p-10 rounded-2xl shadow-xl h-[500px] flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <div className="space-y-6">
          <label className="block relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full p-4 pl-10 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-4 pl-10 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-sm text-blue-500 text-right cursor-pointer hover:underline">
            Forgot your password?
          </p>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-sky-500 text-white rounded-md font-semibold hover:bg-sky-600 transition duration-200"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm mt-4">Or Sign up using</p>
        <div className="flex justify-center gap-6 mt-3">
          <FaFacebookF className="text-gray-500 text-lg cursor-pointer hover:text-sky-600" />
          <FaTwitter className="text-gray-500 text-lg cursor-pointer hover:text-blue-500" />
          <FaGoogle className="text-gray-500 text-lg cursor-pointer hover:text-red-500" />
        </div>
      </div>
    </section>
  );
};

export default Login;
