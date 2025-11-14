import axios from "axios";
import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdPassword } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

function ChangePassword() {
  const BACKEND_URL = import.meta.env.BACKEND_URL;
  const { email } = useParams();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {

    if (!newPassword || !confirmPassword) {
      toast.info("Please fill the all fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/change-pass/${email}`,
        { newPassword, confirmPassword }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
            <span className="text-xl font-semibold">Change Your Password</span>
            <small className="text-center text-gray-400">
              Set a new password for{" "}
              <span className="font-semibold">{email}</span>
            </small>
          </div>

          <div className="flex flex-col self-start w-full gap-3 mt-3">
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-xs text-gray-500">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? `text` : `password`}
                  name="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
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
            <div className="flex flex-col">
              <label htmlFor="password2" className="mb-1 text-xs text-gray-500">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPass2 ? `text` : `password`}
                  name="password2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Enter your password"
                  id="password2"
                  className="border-2 w-full border-gray-200 p-1.5 pr-9 text-sm rounded-md outline-none"
                  required
                />

                <span
                  onClick={() => setShowPass2(!showPass2)}
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                >
                  {showPass2 ? <IoIosEyeOff /> : <IoIosEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleChangePassword}
              className="py-2 mt-1 text-sm font-semibold text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
            >
              {isLoading ? <PulseLoader size={8} color="white" /> : "Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
