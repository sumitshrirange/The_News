import React from "react";
import logo from "../../assets/logo.png";

function VerifyEmail() {
  return (
    <div className="absolute h-full w-full left-0 top-0 p-3 bg-green-200">
      <img className="w-32 m-4" src={logo} alt="The News logo" />

      <div className="flex items-center w-full h-[90%] justify-center">
        <div className="flex flex-col items-center gap-2 bg-white shadow-2xl shadow-green-500 w-80 md:w-90 rounded-[12px] p-5">
          <h2 className="mb-4 text-2xl font-semibold text-green-600">
            ✅ Check Your Email
          </h2>
          <p className="text-sm text-center text-gray-400">
            We've sent you an email to verify your account. Please check your
            inbox and click to the verification link.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
