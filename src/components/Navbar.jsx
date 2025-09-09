import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/topnews", label: "Top News" },
  { path: "/worldnews", label: "World News" },
  { path: "/business", label: "Business" },
  { path: "/technology", label: "Technology" },
  { path: "/health", label: "Health" },
  { path: "/sports", label: "Sports" },
  { path: "/science", label: "Science" },
  { path: "/entertainment", label: "Entertainment" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Reusable link styles
  const linkClasses = ({ isActive }) =>
    `px-3 py-1 transition-colors duration-200 ${
      isActive ? "text-red-700" : "text-gray-700 hover:text-red-700"
    }`;

  return (
    <nav className="border-y-2 border-gray-300 py-2">
      <div className="flex items-center justify-between md:justify-center text-sm">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-9">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <p className="text-xs md:hidden">Made by ❤ Sumit Shrirange</p>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden cursor-pointer p-2 rounded-md focus:outline-none"
          aria-label="Toggle navigation"
        >
          {open ? (
            // Close Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg text-sm">
          <div className="flex flex-col items-end space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
