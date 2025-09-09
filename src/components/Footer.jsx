import React from "react";
import { NavLink } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa6";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaRedditAlien,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const socialLinks = [
  { icon: <FaFacebook />, href: "https://facebook.com" },
  { icon: <FaLinkedin />, href: "https://linkedin.com" },
  { icon: <FaYoutube />, href: "https://youtube.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaRedditAlien />, href: "https://reddit.com" },
];

function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Logo Section */}
      <div className="mb-3 mt-15 pt-4 border-t-3 border-gray-500 flex justify-center">
        <NavLink to="/">
          <img className="w-42" src={logo} alt="The News logo" />
        </NavLink>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row w-full items-center justify-between border-y-2 py-2 border-gray-300 gap-3">
        {/* Copyright */}
        <div className="flex items-center gap-1 text-center md:text-left">
          <FaLaptopCode className="md:mb-[2px]" />
          <p className="md:text-sm text-xs text-gray-500">
            Copyright © {new Date().getFullYear()} The News — All rights
            reserved
          </p>
        </div>

        {/* Social Media */}
        <div className="flex items-center md:gap-3.5 gap-2 text-gray-600 md:text-sm text-xs">
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
    </footer>
  );
}

export default Footer;
