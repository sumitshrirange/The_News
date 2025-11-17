import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuth() {
  const OAuth_URL = import.meta.env.VITE_OAuth_URL;

  const handleGoogleLogin = () => {
    try {
      const googleLoginUrl = `${OAuth_URL}/auth/google`;
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error("error login with google", error);
    }
  };
  return (
    <>
      <div
        onClick={handleGoogleLogin}
        className="flex items-center border border-blue-500 overflow-hidden mt-2 cursor-pointer"
      >
        <FcGoogle size={22} className="mx-2" />
        <span className="text-sm text-center bg-blue-500 hover:bg-blue-400 hover:text-white duration-150 py-1.5 px-4 text-gray-100">
          Continue with Google
        </span>
      </div>

      <small className="opacity-40 mt-1">OR</small>
    </>
  );
}

export default OAuth;
