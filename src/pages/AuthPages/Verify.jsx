import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";

function Verify() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/auth/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setStatus("✅ Email Verified Successfully.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus(`❌ ${res.data.message}`);
        }
      } catch (error) {
        console.log(error);
        setStatus("❌ Verification failed. Please try again");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="absolute h-full w-full left-0 top-0 p-3 bg-blue-200">
      <img className="w-32 m-4" src={logo} alt="The News logo" />

      <div className="flex items-center w-full h-[90%] justify-center">
        <div className="flex flex-col items-center gap-2 bg-white shadow-2xl shadow-blue-500 w-80 md:w-90 rounded-[12px] p-5">
          <p className="text-xl font-semibold text-center text-gray-700">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verify;
