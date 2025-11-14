import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        navigate("/");
        localStorage.setItem("Token", res.data.token);
        toast.success(res.data.message);
        navigate(0);
      } else {
        toast.error(res.data.message);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute h-full w-full left-0 top-0 p-3 bg-blue-200">
      <img className="w-32 m-4" src={logo} alt="The News logo" />

      <div className="flex items-center w-full h-[90%] justify-center">
        <div className="flex flex-col items-center gap-2 bg-white shadow-2xl shadow-blue-500 w-80 md:w-90 rounded-[12px] p-5">
          <div className="p-2 bg-blue-200 rounded-full w-fit">
            <FaRegUser className="text-blue-700 size-5 md:size-4.5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">Welcome Back</span>
            <small className="text-center text-gray-400">
              Glad to see you again, Log in to your account.
            </small>
          </div>

          <div className="flex flex-col self-start w-full gap-3 mt-3">
            <div className="flex flex-col">
              <label htmlFor="" className="mb-1 text-xs text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="johndoe@gmail.com"
                id="email"
                className="border-2 w-full border-gray-200 p-1.5 text-sm rounded-md outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="mb-1 text-xs text-gray-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? `text` : `password`}
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  placeholder="Enter your password"
                  id="password"
                  className="border-2 w-full border-gray-200 p-1.5 pr-9 text-sm rounded-md outline-none"
                  required
                />

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                >
                  {showPass ? <IoIosEyeOff /> : <IoIosEye />}
                </span>
              </div>
            </div>
            <Link to={"/forgot-password"} className="text-xs text-blue-500">
              Forgot Password?
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 mt-1 text-sm font-semibold text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
            >
              {isLoading ? <PulseLoader size={8} color="white" /> : "Login"}
            </button>
            <span className="self-center text-xs text-gray-500">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-semibold text-blue-400 underline"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
