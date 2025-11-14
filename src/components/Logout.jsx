import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdLogOut } from "react-icons/io";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Logout() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.clear();
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={logoutHandler}
        className="text-red-600 flex items-center gap-1.5 ml-2.5 mt-4 w-fit cursor-pointer"
      >
        <IoMdLogOut className="text-xl" />
        {isLoading ? (
          <BarLoader color={"#D10000"} />
        ) : (
          <p className="font-semibold ">Logout</p>
        )}
      </div>
    </>
  );
}

export default Logout;
