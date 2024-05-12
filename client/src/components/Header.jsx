import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
        </Link>

        <Link to="/pricing">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Pricing
          </li>
        </Link>
        <Link to="/chat">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Chat Now
          </li>
        </Link>
        {/* <div className="[url('https://merbg-n-estate-uzdz.onrender.com/headerlogo.png')] w-20 h-20  bg-no-repeat"></div> */}

        <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About Us
          </li>
        </Link>
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Testimonial
          </li>
        </Link>
        <Link to="/feedback">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Contact Us
          </li>
        </Link>
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar}
              alt="profile"
            />
          ) : (
            <li className=" text-slate-700 hover:underline"> Sign in</li>
          )}
        </Link>
      </div>
    </header>
  );
}
