import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import logo from "../assets/logo.png";
import { AiOutlineLogin } from "react-icons/ai";
import { getUser } from "../context/userContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import Logout from "./Logout";

// Utility function for formatted date
const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

function Header() {
  const { user } = getUser();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <header className="w-full flex flex-col items-center">
      {/* Top Bar */}
      <div className="flex w-full items-center justify-between border-y-2 py-2 border-gray-300">
        {/* Date */}
        <div className="flex items-center gap-1">
          <BiWorld className="mb-[1.5px]" />
          <p className="text-sm font-semibold">{getFormattedDate()}</p>
        </div>

        <div>
          {user ? (
            <div className="relative">
              <div
                onClick={() => setIsShowing(!isShowing)}
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 duration-200 rounded-l-full"
              >
                <span className="size-6 text-center bg-blue-100 text-blue-900 rounded-full">
                  {user.name[0]}
                </span>
                {user.name.split(" ")[0]}
                <IoMdArrowDropdown />
              </div>
              <div
                className={`${
                  isShowing ? "absolute" : "hidden"
                } right-0 shadow-md mt-2.5 p-2 bg-white`}
              >
                <div className="flex items-center gap-2">
                  <span className="size-10 text-2xl pt-1 text-center bg-blue-100 text-blue-900 rounded-full">
                    {user.name[0]}
                  </span>
                  <div className="leading-4.5">
                    <h3 className="uppercase font-semibold tracking-wide">
                      {user.name}
                    </h3>
                    <small className="opacity-50">{user.email}</small>
                  </div>
                </div>
                <Logout />
              </div>
            </div>
          ) : (
            <Link
              to={"/register"}
              className="flex items-center gap-1 text-sm md:text-[16px]"
            >
              <AiOutlineLogin />
              Register
            </Link>
          )}
        </div>
      </div>

      {/* Logo */}
      <NavLink to="/">
        <img className="w-52 my-4" src={logo} alt="The News logo" />
      </NavLink>
    </header>
  );
}

export default Header;
