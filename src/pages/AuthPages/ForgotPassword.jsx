import axios from "axios";
import React, { useState } from "react";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

function ForgotPassword() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, {
        email,
      });

      if (res.data.success) {
        navigate(`/verify-otp/${email}`);
        toast.success(res.data.message);
        setEmail("");
      }
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
            <MdPassword className="text-blue-700 size-5 md:size-4.5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">Reset Your Password</span>
            <small className="text-center text-gray-400">
              Enter your email address to recieve a verification code.
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="johndoe@gmail.com"
                id="email"
                className="border-2 w-full border-gray-200 p-1.5 text-sm rounded-md outline-none"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              onClick={handleSend}
              className="py-2 mt-1 text-sm font-semibold text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
            >
              {isLoading ? <PulseLoader size={8} color="white" /> : "Send"}
            </button>
            <span className="self-center text-xs text-gray-500">
              Remember your Password?{" "}
              <Link
                to={"/login"}
                className="font-semibold text-blue-400 underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
