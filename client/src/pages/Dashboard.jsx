import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GoClock } from "react-icons/go";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [currentID, setCurrentID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showExploreContent, setShowExploreContent] = useState(false);

  const handleExploreClick = () => {
    setShowExploreContent(true); // This will switch to showing the second set of content
  };

  const handleLinkClick = (linkName) => {
    if (linkName === "Home") {
      setIsSearchFocused(false);
    }
    // You can add more conditions if you want to handle other links differently
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    setCurrentID(currentUser._id);
    localStorage.setItem("user_id", currentUser._id);
  }, []);

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
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  // Function to return additional content for the Home section
  const renderHomeContent = () => {
    return (
      <div className="flex flex-col h-full absolute top-8 left-5">
        <div className="flex">
          <img
            className="flex rounded-full h-10 w-10 object-cover mr-2"
            src={currentUser.avatar}
            alt="profile"
          />
          <div className="flex flex-col">
            <h2 className="flex text-black">Hello, {currentUser.username}</h2>

            <h2 className="flex text-gray-500 text-xs">Explore the world!!</h2>
          </div>
          <div className="flex">
            <button className="w-36 ml-60 bg-[#EDC16A] rounded-xl">
              Add your Lore +
            </button>
            <img
              className="flex rounded-full h-10 w-10 object-cover ml-6"
              src="notificationhomedashboard.png"
              alt="profile"
            />
          </div>
        </div>

        <div className="flex  w-full mt-20">
          <form
            onSubmit={handleSubmit}
            className=" rounded-xl w-4/5 border border-gray-400"
          >
            <div className="flex p-2 items-center rounded-xl">
              <button
                className="flex justify-center items-center rounded-full" // Adjust background color and padding as needed
                style={{ minWidth: "44px", minHeight: "44px" }} // Ensures the button is sufficiently large
              >
                <FaSearch className="text-black text-2xl" />{" "}
                {/* Adjust the icon color and size */}
              </button>
              <input
                type="text "
                placeholder="Search for Places, Pincodes, Travel Destinations"
                className="focus:outline-none sm:w-96 bg-transparent placeholder-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </form>
        </div>

        <div className="flex">
          <span className=" text-gray-400 mt-44 text-2xl">Featured Gydes </span>
          <div className="flex mt-60 -ml-60">
            {listings.slice(0, 3).map(
              (
                listing // Assuming you want to display only the first 3 listings
              ) => (
                <div
                  key={listing._id}
                  className="flex mb-4  rounded-lg " // Added mb-4 here for the bottom margin
                >
                  <Link to={`/listing/${listing._id}`} className="flex m-6">
                    <div
                      style={{
                        background: `url(${listing.imageUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                      className="flex h-56 w-44 cursor-pointer bg-no-repeat bg-center bg-cover rounded-xl"
                    >
                      <h3 className="text-lg font-semibold mt-40 mx-auto">
                        {listing.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <DashboardHeader
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        onLinkClick={handleLinkClick}
      />
      <div className="w-full h-screen bg-no-repeat bg-center bg-cover bg-[url('https://gyde-webapp-reactjs.onrender.com/dashboardimg.png')] relative">
        {/* Conditional rendering for the white background and content on the right half when Home is active */}
        {activeLink === "Home" && (
          <>
            <div
              className={`absolute top-0 right-0 ${
                isSearchFocused ? "w-0" : "w-1/2"
              } h-full bg-white flex justify-center transition-width duration-300`}
            >
              {!isSearchFocused && renderHomeContent()}
            </div>

            <div
              className={`absolute ${
                isSearchFocused ? "bottom-10 right-10" : "top-20 left-40"
              }  transition-all duration-300`}
              style={{ transitionProperty: "right, bottom" }}
            >
              <div className="flex flex-col">
                <h1 className="flex text-6xl text- font-bold">Bali</h1>
                <h1 className="flex text-6xl">Indonasia</h1>
                <h1 className="flex text-2xl">30+ Journeys Curated </h1>
              </div>
              <div className="flex">
                <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/groupimgdashboard.png')] w-32 h-10 bg-cover bg-no-repeat bg-center flex "></div>
                <p className="flex text text-gray-500 ml-4">+40 Memories</p>
              </div>
            </div>
            <div
              className={`transition-opacity duration-300 absolute ${
                isSearchFocused ? "opacity-100 visible" : "opacity-0 invisible"
              } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-400 flex items-center"
              >
                <div className="flex p-2 items-center rounded-xl bg-white">
                  <button
                    type="submit"
                    className="flex justify-center items-center rounded-full"
                    style={{ minWidth: "44px", minHeight: "44px" }}
                  >
                    <FaSearch className="text-black text-2xl" />
                  </button>
                  <Link to="/search">
                    <input
                      type="text"
                      placeholder="Search for Places, Pincodes, Travel Destinations"
                      className="focus:outline-none bg-white placeholder-black w-96 text-black"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </Link>
                </div>
              </form>
            </div>
          </>
        )}

        {activeLink === "Lores" && (
          <>
            <form
              onSubmit={handleSubmit}
              className="absolute top-0 mt-10 mx-10 right-10 bg-white p-4 rounded-md flex items-center border border-black"
              style={{ right: "400px", left: "200px" }}
            >
              <FaSearch className="text-gray-400 mx-2" />
              <input
                type="text"
                placeholder="Search for Blogs, Lores by place"
                className="w-full bg-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div
              className="absolute top-0 mt-10 bg-white p-2 rounded-md flex items-center border border-black"
              style={{ right: "80px", left: "1050px" }}
            >
              <img
                className="flex rounded-full h-10 w-10 object-cover mr-2"
                src={currentUser.avatar}
                alt="profile"
              />
              <div className="flex flex-col">
                <h2 className="flex text-black">
                  Hello, {currentUser.username}
                </h2>
                <h2 className="flex text-gray-500 text-xs">
                  Explore the world!!
                </h2>
              </div>
              <img
                className="flex rounded-full h-10 w-10 object-cover ml-6"
                src="notificationhomedashboard.png"
                alt="profile"
              />
            </div>
            {!showExploreContent ? (
              <>
                <div className="absolute bottom-10 left-40 ">
                  <div className="flex flex-col">
                    <h1 className="flex text-6xl text- font-bold">Bali</h1>
                    <h1 className="flex text-5xl">Myth Of The Flying Horse</h1>
                    <h1 className="flex text-2xl">30+ Journeys Curated </h1>
                    <div className="w-[1258px] h-[0px] border border-white border-opacity-75"></div>
                    <h1 className="flex text-xl">
                      As in any design team, the tools we use reflect not only
                      our work but, above <br /> all, our process and the way we
                      collabrate, the tools we use reflect not only our <br />{" "}
                      work but...........{" "}
                    </h1>
                  </div>
                </div>
                <div className="absolute bottom-48 right-20">
                  <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/groupimgdashboard.png')] w-32 h-10 bg-cover bg-no-repeat bg-center flex "></div>
                  <p className=" text text-gray-500 ml-4">+40 Memories</p>
                </div>
                <div className="absolute bottom-36 right-20">
                  <button
                    onClick={handleExploreClick}
                    className="border border-[#EDC16A] w-32 rounded-lg text-[#EDC16A]"
                  >
                    Explore
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center mx-44">
                <div className="flex flex-row mt-32 ">
                  {/* Featured Section */}
                  <div className="flex flex-col w-3/5 mr-10">
                    <button className="flex justify-center items-center text-lg m-4 ml-6 text-[#EDC16A] border border-[#EDC16A] rounded-md w-28">
                      Featured
                    </button>

                    <div className="flex flex-col justify-between items-center w-full">
                      <Link to="/loreblog">
                        <div className="w-full h-96 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg.png')] bg-center bg-no-repeat rounded-xl"></div>
                        <div>
                          <div className="flex items-center text-[#EDC16A] gap-2 mt-4">
                            <span>Lifestyle</span>
                            <span>Travel</span>
                            <span>Arabic Nights</span>
                            <span className="flex ml-4 text-gray-300 align-middle">
                              {" "}
                              {/* Added alignment */}
                              <GoClock className="m-1" />6 min
                            </span>
                          </div>

                          <p className="text-xl ">
                            The James Webb Telescope: Images of Neptune's Rings
                          </p>
                          <p className="text-gray-600 mt-4">
                            Dive into adventures the moment inspiration strikes.
                            Tailored for college trips, school <br /> field
                            trips, corporate retreats, and large group
                            adventures, Gyde Go crafts
                            <br />
                            personalized itineraries to meet the unique needs of
                            every traveler.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Most Read Section */}
                  <div className="flex flex-col w-2/5 ml-10">
                    <button className="flex justify-center items-center text-lg mb-2 text-[#EDC16A] border border-[#EDC16A] rounded-md w-36">
                      Most Read
                    </button>

                    <div className="flex flex-row justify-start items-start mt-2 mb-2">
                      <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

                      <div className="flex flex-col justify-between ml-8">
                        <p className="text">
                          The James Webb Telescope: Images of <br /> Neptune's
                          Rings
                        </p>

                        <div className="flex items-center mt-1">
                          <ul className="flex items-center ">
                            <li className="text-[#EDC16A] ">Lifestyle</li>
                            <li className="text-[#EDC16A] ml-2">Travel</li>
                            <li className="text-[#EDC16A] ml-2">
                              Arabic Nights
                            </li>
                          </ul>
                          <span className="flex text-gray-300">
                            <GoClock className="flex m-1" />6 min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-start items-start mt-2 mb-2">
                      <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

                      <div className="flex flex-col justify-between ml-8">
                        <p className="text">
                          The James Webb Telescope: Images of <br /> Neptune's
                          Rings
                        </p>

                        <div className="flex items-center mt-1">
                          <ul className="flex items-center ">
                            <li className="text-[#EDC16A] ">Lifestyle</li>
                            <li className="text-[#EDC16A] ml-2">Travel</li>
                            <li className="text-[#EDC16A] ml-2">
                              Arabic Nights
                            </li>
                          </ul>
                          <span className="flex text-gray-300">
                            <GoClock className="flex m-1" />6 min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-start items-start mt-2 mb-2">
                      <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

                      <div className="flex flex-col justify-between ml-8">
                        <p className="text">
                          The James Webb Telescope: Images of <br /> Neptune's
                          Rings
                        </p>

                        <div className="flex items-center mt-1">
                          <ul className="flex items-center ">
                            <li className="text-[#EDC16A] ">Lifestyle</li>
                            <li className="text-[#EDC16A] ml-2">Travel</li>
                            <li className="text-[#EDC16A] ml-2">
                              Arabic Nights
                            </li>
                          </ul>
                          <span className="flex text-gray-300">
                            <GoClock className="flex m-1" />6 min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-start items-start mt-2 mb-2">
                      <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

                      <div className="flex flex-col justify-between ml-8">
                        <p className="text">
                          The James Webb Telescope: Images of <br /> Neptune's
                          Rings
                        </p>

                        <div className="flex items-center mt-1">
                          <ul className="flex items-center ">
                            <li className="text-[#EDC16A] ">Lifestyle</li>
                            <li className="text-[#EDC16A] ml-2">Travel</li>
                            <li className="text-[#EDC16A] ml-2">
                              Arabic Nights
                            </li>
                          </ul>
                          <span className="flex text-gray-300">
                            <GoClock className="flex m-1" />6 min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-start items-start mt-2 mb-2">
                      <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg1.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

                      <div className="flex flex-col justify-between ml-8">
                        <p className="text">
                          The James Webb Telescope: Images of <br /> Neptune's
                          Rings
                        </p>

                        <div className="flex items-center mt-1">
                          <ul className="flex items-center ">
                            <li className="text-[#EDC16A] ">Lifestyle</li>
                            <li className="text-[#EDC16A] ml-2">Travel</li>
                            <li className="text-[#EDC16A] ml-2">
                              Arabic Nights
                            </li>
                          </ul>
                          <span className="flex text-gray-300">
                            <GoClock className="flex m-1" />6 min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
