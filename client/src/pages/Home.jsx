import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { HomePageHeader } from "../components/HomePageHeader";

export default function Home() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/get?limit=4");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

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
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { y: "100vh", x: "-50%" },
    visible: {
      y: "200px",
      x: "-50%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className=" bg-black">
      {/* top */}
      <HomePageHeader />
      <div className="flex flex-col gap-6 p-2 mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/imagehome.png')] w-full h-screen bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col mt-60 mx-auto">
          <div className=" mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/homemaintext.png')] w-[750px] h-[60px] bg-no-repeat bg-center bg-contain"></div>
          <div className=" mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/homepagetext.png')] w-[400px] h-[80px] bg-no-repeat bg-center bg-contain"></div>
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center w-full mt-32">
          <form
            onSubmit={handleSubmit}
            className="p-2 rounded-xl w-1/2 bg-[url('https://gyde-webapp-reactjs.onrender.com/rectangle.png')] bg-no-repeat"
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
                placeholder="Search for Places, Pincodes, Travel Destinations"
                className="focus:outline-none sm:w-96 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {/*  */}

      {/* listing results for offer, sale and rent */}

      {/* 4 images with text below them */}
      <div className="text-center text-white mb-10 mt-10">
        <h1>The four pillars that define the Gyde experience</h1>
      </div>
      <div className="flex flex-row justify-center m-4 gap-14 text-white">
        <div className="">
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg1.png')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
          <h2 className="mt-4 ml-6">Unmatched Local Insights</h2>
          <p className="mt-2 ml-6 text-sm">
            Dive into the unseen, guided by <br /> those who know it best.
          </p>
        </div>
        <div className="">
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg2.jpeg')] w-64 h-80 bg-contain bg-center bg-no-repeat "></div>
          <h2 className="mt-4 ml-6">Tailored to Your Curiosity</h2>
          <p className="mt-2 text-sm ml-6">
            Making every journey as unique as <br /> you are
          </p>
        </div>
        <div className="">
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg3.jpeg')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
          <h2 className="mt-4 ml-6">Connect Across Cultures</h2>
          <p className="mt-2 ml-6 text-sm">
            Beyond places, its the people you <br /> meet & the culture you
            celebrate
          </p>
        </div>
        <div className="">
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg4.png')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
          <h2 className="mt-4 ml-6">Hassle-Free, Full Support</h2>
          <p className="mt-2 ml-6 text-sm">
            Smooth sailing from search to <br /> memories
          </p>
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationimg2.png')] bg-no-repeat bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Motion component for animated image */}
        <motion.div
          className="absolute w-[500px] h-[100px] top-0 left-1/2 transform -translate-x-1/2 bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationtext2.png')] bg-no-repeat bg-center bg-contain"
          variants={variants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        />
      </div>
      {/* Future of travel section */}
      <div className="bg-[#0C0F17]">
        <h1 className="text-center pt-20 text-4xl ">
          The Future of Travel with{" "}
          <span className="text-[#EDC16A]  text-center mt-10 text-4xl">
            Gyde{" "}
          </span>
          <div className="w-1/2 h-[0px] border border-white mt-5 mx-auto"></div>
        </h1>
        <div className="parent-flex-container flex flex-row justify-between items-center">
          <div className="ml-36">
            <h1 className="mt-10 text-3xl underline m-2">
              Gyde{" "}
              <span className="text-[#EDC16A] underline text-center mt-10 text-3xl">
                Go{" "}
              </span>
            </h1>

            <p className=" text-2xl italic m-2 mr-10">
              #CuratedJourneys&PersonalizedItineraries
            </p>
            <p className=" text-gray-600 text-xl">
              {" "}
              Dive into adventures the moment inspiration strikes. <br />
              Tailored for college trips, school field trips, corporate <br />{" "}
              retreats, and large group adventures, Gyde Go crafts <br />{" "}
              personalized itineraries to meet the unique needs of every <br />{" "}
              traveler.
            </p>
          </div>
          <div className=" image-content mr-32 w-[500px] h-[500px] bg-[url('https://gyde-webapp-reactjs.onrender.com/homepagevector2.png')] bg-contain bg-center bg-no-repeat"></div>
        </div>
        <div className="parent-flex-container flex flex-row justify-between items-center">
          <div className=" ml-36 image-content w-[500px] h-[500px] bg-[url('https://gyde-webapp-reactjs.onrender.com/homepagevector.png')] bg-contain bg-center bg-no-repeat"></div>
          <div className="mr-36">
            <h1 className=" text-3xl underline ">
              Gyde{" "}
              <span className="text-[#EDC16A] underline text-center mt-10 text-3xl">
                XP{" "}
              </span>
            </h1>

            <p className=" text-2xl italic m-2">#ExperienceUncoverDiscover</p>
            <p className=" text-gray-600 text-xl">
              {" "}
              Immerse yourself in unique experiences, workshops, and <br />{" "}
              events curated by local experts. With Gyde XP, delve deep <br />{" "}
              into the culture, traditions, and crafts that give each place{" "}
              <br /> its pulse
            </p>
          </div>
        </div>
        <div className="parent-flex-container flex flex-row justify-between items-center">
          <div className="ml-36">
            <h1 className="text-3xl underline">
              Gyde{" "}
              <span className="text-[#EDC16A] underline text-center mt-10 text-3xl">
                Memories{" "}
              </span>
            </h1>

            <p className=" text-2xl italic m-2">
              #LiveintheMomentReliveYourJourney
            </p>
            <p className=" text-gray-600 text-xl">
              {" "}
              With Gyde Memories, capture the essence of your travels <br />{" "}
              without missing a beat. Professional photography and <br />{" "}
              videography services ensure you keep the memories alive, <br />{" "}
              long after the journey ends.
            </p>
          </div>
          <div className=" image-content mr-36 w-[500px] h-[500px] bg-[url('https://gyde-webapp-reactjs.onrender.com/homepagevector1.png')] bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>

      {/* swiper */}

      <div className="flex flex-col bg-[url('https://gyde-webapp-reactjs.onrender.com/homegydebgimg.png')] w-full h-screen bg-no-repeat bg-center bg-cover">
        <h1 className="ml-36 text-2xl mb-4 ">Meet Our top Gydes</h1>
        <div className="w-1/6 h-[0px] border border-orange-300 mb-20 ml-36"></div>
        <div className="flex">
          <div className="flex flex-col w-1/2 mr-60 ml-24">
            {listings.slice(0, 2).map(
              (
                listing // Assuming you want to display only the first 3 listings
              ) => (
                <div
                  key={listing._id}
                  className="flex mb-4 bg-white rounded-lg text-black" // Added mb-4 here for the bottom margin
                >
                  <Link to="/sign-up" className="flex m-2">
                    <div className="flex h-56 m-1 cursor-pointer w-full">
                      <img
                        src={listing.imageUrls[0]}
                        alt="Listing"
                        className="w-full h-full object-cover" // object-cover will cover the area, object-contain will fit the image without cropping
                      />
                    </div>

                    <div className="flex flex-col m-4">
                      <h3 className="text-lg font-semibold">{listing.name}</h3>
                      <p className="text-sm">{listing.description}</p>
                      <p className="text-sm flex">
                        <FaMapMarkerAlt className="text-green-700 mt-1" />
                        {listing.address}
                      </p>
                      <div className="flex">
                        <ul className="flex w-full">
                          {listing.selectedPlaces.map((place, index) => {
                            const city = place.address.split(",")[0];
                            return (
                              <li
                                key={index}
                                className="flex items-center mr-2"
                              >
                                {" "}
                                {/* Adjust right margin as necessary */}
                                <FaMapMarkerAlt className="text-red-700" />
                                <span className="ml-1">{city}</span>{" "}
                                {/* Add left margin to separate text from icon */}
                              </li>
                            );
                          })}
                        </ul>
                        <button
                          className="flex flex-end
                           mt-10 bg-[#EDC16A] text-black p-2 rounded-2xl h-10 w-32"
                        >
                          Chat Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
          <div
            className=" flex flex-col w-1/4 mt-20 h-fit p-6 rounded-lg mr-16"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <h1 className=" text-2xl m-2">Want to become a Gyde?</h1>
            <div className="w-full h-[0px] border border-orange-300"></div>
            <p className="text-sm mt-4 ml-2">
              Gyde makes it easy for thousands of travel creators to organize &
              monetize their travel knowledge.
            </p>

            <button className="bg-[#EDC16A] text-black p-2 text-sm rounded-2xl w-32 mt-10 mb-3">
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimation.png')] bg-no-repeat bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Motion component for animated image */}
        <motion.div
          className="absolute w-[500px] h-[100px] top-0 left-1/2 transform -translate-x-1/2 bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationtext.png')] bg-no-repeat bg-center bg-contain"
          variants={variants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        />
      </div>
    </div>
  );
}
