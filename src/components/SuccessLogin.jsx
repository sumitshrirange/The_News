import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");

      if (!token) {
        return navigate("/login");
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_OAuth_URL}/auth/user`,
          { withCredentials: true }
        );
        navigate("/");
        localStorage.setItem("userToken", JSON.stringify(res.data.token));
        navigate(0);
      } catch (error) {
        console.log("Error fetching user", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold text-gray-700">Logging you in...</p>
    </div>
  );
}

export default SuccessLogin;
