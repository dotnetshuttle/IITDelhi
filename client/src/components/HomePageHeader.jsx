import { NavLink, Link } from "react-router-dom";
import React from "react";

export const HomePageHeader = () => {
  return (
    <header
      className="fixed-header text-white shadow-md bg-[#0C0F17]"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <div
          className="bg-[url('https://gyde-webapp-reactjs.onrender.com/logo.svg')] w-40 h-16 bg-no-repeat font-"
          style={{ marginLeft: "-1rem" }}
        ></div>

        <div className="flex flex-grow justify-center gap-16">
          {/* Use NavLink for "Explore Gydes" */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "hidden sm:inline underline text-[#EDC16A]"
                : "hidden sm:inline underline"
            }
          >
            Explore Gydes
          </NavLink>

          {/* Use NavLink for "Explore Lores" */}
          <NavLink
            to="/lore"
            className={({ isActive }) =>
              isActive
                ? "hidden sm:inline underline text-[#EDC16A]"
                : "hidden sm:inline underline"
            }
          >
            Explore Lores
          </NavLink>

          {/* Use NavLink for "Explore Us" */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "hidden sm:inline underline text-[#EDC16A]"
                : "hidden sm:inline underline"
            }
          >
            Explore Us
          </NavLink>
        </div>

        <Link to="/sign-up">
          <button
            className="bg-[#EDC16A] text-black p-2 rounded-2xl w-40"
            style={{ marginRight: "-1rem" }}
          >
            Sign up
          </button>
        </Link>
      </div>
    </header>
  );
};
