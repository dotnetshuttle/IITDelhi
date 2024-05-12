import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardHeader({
  activeLink,
  setActiveLink,
  onLinkClick,
}) {
  // const [activeLink, setActiveLink] = useState("");

  // Function to determine if a link is active
  const isActive = (linkName) => {
    return activeLink === linkName;
  };
  const handleClick = (linkName) => {
    setActiveLink(linkName);
    if (onLinkClick) {
      onLinkClick(linkName); // Call the passed handler function with the clicked link name
    }
  };
  return (
    <div
      className="fixed top-32 left-8 w-20 h-fit flex flex-col items-center py-4  space-y-8 bg-[url('https://gyde-webapp-reactjs.onrender.com/reactangledashboard.png')] bg-no-repeat bg-center bg-cover rounded-2xl"
      style={{ zIndex: 10 }}
    >
      {/* Logo */}
      <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/logodashboard.svg')] w-9 h-12 bg-cover bg-no-repeat bg-center "></div>
      {/* Icon 1 */}
      <Link className="flex flex-col items-center space-y-2">
        <div
          onClick={() => setActiveLink("Home")}
          className={`${
            isActive("Home")
              ? "bg-[url('https://gyde-webapp-reactjs.onrender.com/homeonclick.png')]"
              : "bg-[url('https://gyde-webapp-reactjs.onrender.com/homedashboard.png')]"
          } w-8 h-8 bg-no-repeat bg-center bg-cover`}
        ></div>
        <span className={`${isActive("Home") ? "text-[#EDC16A]" : "text"}`}>
          Home
        </span>
      </Link>

      {/* Icon 2 */}
      <Link className="flex flex-col items-center space-y-2">
        <div
          onClick={() => handleClick("Lores")}
          className={`${
            isActive("Lores")
              ? "bg-[url('https://gyde-webapp-reactjs.onrender.com/loreslogoonclick.png')]"
              : "bg-[url('https://gyde-webapp-reactjs.onrender.com/loreslogo.png')]"
          } w-6 h-6 bg-no-repeat bg-center bg-cover`}
        ></div>
        <span className={`${isActive("Lores") ? "text-[#EDC16A]" : "text"}`}>
          Lores
        </span>
      </Link>

      {/* Icon 3 */}
      {/* <Link className="flex flex-col items-center space-y-2">
        <div
          onClick={() => handleClick("Trips")}
          className={`${
            isActive("Trips")
              ? "bg-[url('https://gyde-webapp-reactjs.onrender.com/tripsonclick.png')]"
              : "bg-[url('https://gyde-webapp-reactjs.onrender.com/tripsdashboard.png')]"
          } w-6 h-6 bg-no-repeat bg-center bg-cover`}
        ></div>
        <span className={`${isActive("Trips") ? "text-[#EDC16A]" : "text"}`}>
          Trips
        </span>
      </Link> */}

      {/* Icon 4 */}
      <Link className="flex flex-col items-center space-y-2" to="/chat">
        <div
          onClick={() => handleClick("Chats")}
          className={`${
            isActive("Chats")
              ? "bg-[url('https://gyde-webapp-reactjs.onrender.com/chatonclick.png')]"
              : "bg-[url('https://gyde-webapp-reactjs.onrender.com/chatdashboard.png')]"
          } w-6 h-6 bg-no-repeat bg-center bg-cover`}
        ></div>
        <span className={`${isActive("Chats") ? "text-[#EDC16A]" : "text"}`}>
          Chats
        </span>
      </Link>

      {/* Icon 5 */}
      <Link className="flex flex-col items-center space-y-2" to="/profile">
        <div
          onClick={() => handleClick("Profile")}
          className={`${
            isActive("Profile")
              ? "bg-[url('https://gyde-webapp-reactjs.onrender.com/profileonclick.png')]"
              : "bg-[url('https://gyde-webapp-reactjs.onrender.com/profiledashboard.png')]"
          } w-6 h-6 bg-no-repeat bg-center bg-cover`}
        ></div>
        <span className={`${isActive("Profile") ? "text-[#EDC16A]" : "text"}`}>
          Profile
        </span>
      </Link>
    </div>
  );
}
