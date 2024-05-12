import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { HomePageHeader } from "../components/HomePageHeader";

export const Lore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      <HomePageHeader />{" "}
      <div className="flex flex-col gap-6 p-2 mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/loreimg.png')] w-full h-screen bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col mt-32 mx-auto">
          <h1 className="text-white text-5xl lg:text-6xl p-4">
            Explore Gyde Lores <br />
          </h1>
          <div className=" mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/lorepagetext.png')] w-[400px] h-[80px] bg-no-repeat bg-center bg-contain"></div>
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center w-full mt-12 flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="p-2 rounded-xl w-1/2 bg-[url('https://gyde-webapp-reactjs.onrender.com/rectanglelore.png')] bg-no-repeat"
          >
            <div className="flex items-center rounded-xl">
              <button
                className="flex justify-center items-center p-2 rounded-full" // Adjust background color and padding as needed
                style={{ minWidth: "44px", minHeight: "44px" }} // Ensures the button is sufficiently large
              >
                <FaSearch className="text-slate-400 text-2xl" />{" "}
                {/* Adjust the icon color and size */}
              </button>
              <input
                type="text"
                placeholder=""
                className="focus:outline-none sm:w-96 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className="flex items-center m-2 mt-4">
            <Link to="/">
              <span className="text-white m-2">All categories</span>
            </Link>
            <Link to="/">
              <span className="text-white m-2">Animations</span>
            </Link>
            <Link to="/">
              <span className="text-white m-2">Design</span>
            </Link>
            <Link to="/">
              <span className="text-white m-2">Illustraction</span>
            </Link>
            <Link to="/">
              <span className="text-white m-2">Business</span>
            </Link>
            <Link to="/">
              <span className="text-white m-2">Technology</span>
            </Link>
          </div>
        </div>
      </div>
      {/* 1st blog section */}
      <div className="flex flex-col mt-20 sm:flex-row">
        {/* Featured Section */}
        <div className="w-full sm:w-3/5">
          <button className="justify-center items-center text-lg m-4 ml-14 text-[#EDC16A] border border-[#EDC16A] rounded-md w-28 block">
            Featured
          </button>

          <div className="ml-14">
            <Link to="/loreblog">
              <div className="w-full h-96 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg.png')] bg-center bg-no-repeat rounded-xl"></div>
              <div className="mt-4">
                <div className="flex flex-wrap justify-start items-center">
                  <span className="text-[#EDC16A]">Lifestyle</span>
                  <span className="text-[#EDC16A] ml-2">Travel</span>
                  <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
                  <span className="flex ml-auto text-gray-300">
                    <GoClock className="flex m-1" />6 min
                  </span>
                </div>
                <p className="text-xl">
                  The James Webb Telescope: Images of Neptune's Rings
                </p>
                <p className="text-gray-600">
                  Dive into adventures the moment inspiration strikes. Tailored
                  for college trips, school field trips, corporate retreats, and
                  large group adventures, Gyde Go crafts personalized
                  itineraries to meet the unique needs of every traveler.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Most Read Section */}
        <div className="w-full mt-8 sm:w-2/5 sm:mt-0 ml-10">
          <button className="justify-center items-center text-lg mb-2 text-[#EDC16A] border border-[#EDC16A] rounded-md w-36 block">
            Most Read
          </button>

          {/* Articles list */}
          {[...Array(5)].map((_, index) => (
            <div className="flex sm:flex-row justify-start items-center mt-2 mb-2">
              <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl mr-4"></div>
              <div className="flex flex-col flex-grow">
                <p className="text">
                  The James Webb Telescope: Images of Neptune's Rings
                </p>
                <div className="flex justify-start items-center mt-1">
                  <ul className="flex items-center">
                    <li className="text-[#EDC16A]">Lifestyle</li>
                    <li className="text-[#EDC16A] ml-2">Travel</li>
                    <li className="text-[#EDC16A] ml-2">Arabic Nights</li>
                  </ul>
                  <span className="flex ml-2 text-gray-300">
                    <GoClock className="flex m-1" />6 min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 2nd Blog section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-20 mx-16">
        <div className="flex flex-col justify-between items-center w-full md:w-2/5">
          <div className="w-full h-96 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg2.png')] bg-center bg-no-repeat rounded-lg"></div>
          <div>
            <div className="flex items-start mt-4">
              <span className="text-[#EDC16A]">Lifestyle</span>
              <span className="text-[#EDC16A] ml-2">Travel</span>
              <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
              <span className="flex ml-auto text-gray-300">
                <GoClock className="flex m-1" />6 min
              </span>
            </div>

            <p className="text-xl">
              5 Psychology principles for better UX Design
            </p>
            <p className="text-gray-600 mt-4">
              By understanding how different psychology principles influence
              human behavior, we can build solutions that resolve users'
              problems.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center w-full md:w-2/5">
          <div className="w-full h-96 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg2.png')] bg-center bg-no-repeat rounded-lg"></div>
          <div>
            <div className="flex items-start mt-4">
              <span className="text-[#EDC16A]">Lifestyle</span>
              <span className="text-[#EDC16A] ml-2">Travel</span>
              <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
              <span className="flex ml-auto text-gray-300">
                <GoClock className="flex m-1" />6 min
              </span>
            </div>

            <p className="text-xl">
              5 Psychology principles for better UX Design
            </p>
            <p className="text-gray-600 mt-4">
              By understanding how different psychology principles influence
              human behavior, we can build solutions that resolve users'
              problems.
            </p>
          </div>
        </div>
      </div>
      {/* 3rd Blog section */}
      <div className="flex justify-between items-center mt-20 ">
        <div className="flex flex-col justify-between items-center w-2/5">
          <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
          <div className="flex flex-col items-start  ml-14">
            <div className="flex items-start mt-4">
              <span className="text-[#EDC16A]">Lifestyle</span>
              <span className="text-[#EDC16A] ml-2">Travel</span>
              <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
              <span className="flex ml-24 text-gray-300">
                <GoClock className="flex m-1 " />6 min
              </span>
            </div>

            <p className="text-xl">
              Nature is replenshing itself during Covid Lockdown
            </p>
            <p className="text-gray-600 mt-4">
              By understanding how different psychology principles influence
              human behavior, we can build solutions that resolve users'
              problems.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center w-2/5">
          <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
          <div className="flex flex-col items-start  ml-14">
            <div className="flex items-start mt-4">
              <span className="text-[#EDC16A]">Lifestyle</span>
              <span className="text-[#EDC16A] ml-2">Travel</span>
              <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
              <span className="flex ml-24 text-gray-300">
                <GoClock className="flex m-1 " />6 min
              </span>
            </div>

            <p className="text-xl">
              Nature is replenshing itself during Covid Lockdown
            </p>
            <p className="text-gray-600 mt-4">
              By understanding how different psychology principles influence
              human behavior, we can build solutions that resolve users'
              problems.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center w-2/5">
          <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
          <div className="flex flex-col items-start  ml-14">
            <div className="flex items-start mt-4">
              <span className="text-[#EDC16A]">Lifestyle</span>
              <span className="text-[#EDC16A] ml-2">Travel</span>
              <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
              <span className="flex ml-24 text-gray-300">
                <GoClock className="flex m-1 " />6 min
              </span>
            </div>

            <p className="text-xl">
              Nature is replenshing itself during Covid Lockdown
            </p>
            <p className="text-gray-600 mt-4">
              By understanding how different psychology principles influence
              human behavior, we can build solutions that resolve users'
              problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
