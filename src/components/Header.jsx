import React from "react";
import { NavLink } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaRedditAlien,
} from "react-icons/fa";
import logo from "../assets/logo.png";

// Social Media Links (easily extendable)
const socialLinks = [
  { icon: <FaFacebook />, href: "https://facebook.com" },
  { icon: <FaLinkedin />, href: "https://linkedin.com" },
  { icon: <FaYoutube />, href: "https://youtube.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaRedditAlien />, href: "https://reddit.com" },
];

// Utility function for formatted date
const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

function Header() {
  return (
    <header className="w-full flex flex-col items-center">
      {/* Top Bar */}
      <div className="flex w-full items-center justify-between border-y-2 py-2 border-gray-300">
        {/* Date */}
        <div className="flex items-center gap-1">
          <BiWorld className="mb-[1.5px]" />
          <p className="text-sm font-semibold">{getFormattedDate()}</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3.5 text-gray-600 text-sm">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-700 transition-colors duration-200"
            >
              {social.icon}
            </a>
          ))}
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
