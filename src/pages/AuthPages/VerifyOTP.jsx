import axios from "axios";
import React, { useRef, useState } from "react";
import { MdPassword } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

function VerifyOTP() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  // Handle typing and paste support
  const handleChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste case
      const digits = value.slice(0, 6).split("");
      const updatedOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) updatedOtp[index + i] = digit;
      });
      setOTP(updatedOtp);
      inputRefs.current[Math.min(index + digits.length, 5)]?.focus();
    } else {
      // Normal single digit input
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOTP(updatedOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle paste event directly
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOTP(digits.concat(Array(6 - digits.length).fill("")));
      inputRefs.current[digits.length - 1]?.focus();
    }
  };

  // Handle Backspace key navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          const updatedOtp = [...otp];
          updatedOtp[index - 1] = "";
          setOTP(updatedOtp);
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOTP(updatedOtp);
      }
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/verify-otp/${email}`,
        { otp: finalOtp }
      );

      toast.success(res.data.message);
      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear OTP
  const clearOTP = () => {
    setOTP(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="absolute h-full w-full left-0 top-0 p-3 bg-blue-200">
      <img className="w-32 m-4" src={logo} alt="The News logo" />

      <div className="flex items-center w-full h-[90%] justify-center">
        <div className="flex flex-col items-center gap-2 bg-white shadow-2xl shadow-blue-500 w-80 md:w-100 rounded-[12px] p-5">
          <div className="p-2 bg-blue-200 rounded-full w-fit">
            <MdPassword className="text-blue-700 size-5 md:size-4.5" />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">
              Enter Verification Code
            </span>
            <small className="text-center text-gray-400">
              Enter the 6-digit code sent to your email
            </small>
          </div>

          <div className="flex flex-col self-start w-full gap-3 mt-3">
            <div
              className="flex items-center justify-between"
              onPaste={handlePaste}
            >
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="h-12 w-12 text-center text-xl border border-blue-400 outline-none focus:border-blue-600 rounded-md"
                  required
                />
              ))}
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleVerify}
              className="py-2 mt-1 text-sm font-semibold text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
            >
              {isLoading ? <PulseLoader size={8} color="white" /> : "Verify"}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={clearOTP}
              className="flex items-center justify-center gap-2 py-2 mt-1 text-sm font-semibold text-blue-600 duration-200 border border-blue-500 rounded-md cursor-pointer bg-blue-100 hover:bg-blue-200"
            >
              <IoMdRefresh size={17} /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
